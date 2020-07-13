import React, { useState, useEffect, useContext, useRef, useMemo } from 'react';

import { useRouter } from 'next/router';

import MapGL from '../../MapGL';
import CreateLocationMapStyle from './MapContainerStyle';
import DropMarker from '../DropMarker/DropMarker';
import { Marker } from 'react-map-gl';
import useMapMarker from '../../hooks/useMapMarker';

import { ViewPortContext } from '../../providers/MapProvider';
import { LocationEditorContext } from '../../providers/LocationEditorProvider';
import { ShapeEditorContext } from '../../providers/ShapeEditorProvider';
import { UserContext } from '../../Layout/DashboardLayout';
import useLocalStorage from '../../hooks/useLocalStorage';
import Toolbar from '../Toolbar';
import RightPanel from './RightPanel';
import CityPin from '../../Icons/BaseMarker';
import axios from 'axios';
import { TOKEN } from '../../MapGL';
import { debounce } from 'lodash';
import styled from 'styled-components';
import MaterialIcon from '@material/react-material-icon';
import { IconButtonStyle } from '../Toolbar';
import { Source, Layer } from 'react-map-gl';

import { featureStyle, editHandleStyle } from '../../helpers/shapeStyle';

import { Editor, EditingMode } from 'react-map-gl-draw';

const ToolbarContainer = styled.div`
    display: block;
    position: absolute;
    top: 40px;
    right: 0; 
`;

function MapEditor(props) {
    const [selectedMode, setSelectedMode] = useState(null);
    const [selectedFeatureIndex, setSelectedFeatureIndexes] = useState(null);
    const { viewport, setViewport, mapConfig, flyViewPort } = useContext(ViewPortContext);

    const { loading, projectData: filteredProject } = useContext(UserContext);
    const { form, setForm, initialForm, dropMarker, setDropMarker, setEditLocation, editLocation, setSingleLocation, singleLocation, setSuggestions, hoverLocation } = useContext(LocationEditorContext);

    const { form: shapeForm, setForm: setShapeForm, addShape, setAddShape, selectedShape, singleFeature, setSingleFeature, editShape, setEditShape, shapeUpdateFeature, setShapeUpdateFeature, hoverShape, setHoverShape } = useContext(ShapeEditorContext);
    const [savedLayerOpen, setSavedLayerOpen] = useLocalStorage('layerOpened', true);

    const [layerOpen, setLayerOpen] = useState(null);

    // const [hoverID, setHoverID] = useState('dfdsf');

    const mapRef = useRef(null);
    const editorRef = useRef(null);

   let layerIds = [];

    const {
        marker,
        setMarker,
        addMarker,
        showMarker,
        setShowMarker,
        onMarkerDragStart,
        onMarkerDrag,
        onMarkerDragEnd
    } = useMapMarker({ latitude: 0, longitude: 0 });

    useEffect(() => {
        setLayerOpen(savedLayerOpen);
    }, []);

    useEffect(() => {
        editorRef.current && deleteSquare();
        setShapeUpdateFeature({id: 'sfsd'});
        if (selectedShape) {
            switchMode(selectedShape.mode);
        } else {
            setSelectedMode(null);
        }
    }, [selectedShape, dropMarker])

    useEffect(() => {
        if(singleFeature == null) {
            editorRef.current && deleteSquare();
            setSelectedMode(null);
            setShapeUpdateFeature({id: 'sfsd'});
            setEditShape(false);
        }
    }, [singleFeature]);

    useEffect(() => {
        setForm({
            ...form,
            latitude: marker.latitude,
            longitude: marker.longitude
        });
    }, [marker]);

    function switchMode(_mode) {
        const HandlerClass = _mode;
        const modeHandler = new HandlerClass();
        setSelectedMode(modeHandler);
    }

    // useEffect(() => {
    //     if (!editLocation) return;
    //     setForm({
    //         city: singleLocation.city,
    //         country: singleLocation.country,
    //         description: singleLocation.description,
    //         latitude: marker.latitude,
    //         longitude: marker.longitude,
    //         markerType: singleLocation.markerType.type,
    //         pinColor: singleLocation.markerType.pinColor
    //     });
    // }, [singleLocation, editLocation]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${form.longitude},${form.latitude}.json?types=poi&access_token=${TOKEN}
            `);

            if (result.data.features.length) {
                const place = result.data.features[0].text;
                const address = result.data.features[0].place_name;
                const slicedAddress = address.slice(place.length + 1);
                setSuggestions({
                    place: place,
                    address: slicedAddress
                });
            }
        }

        const debouncedData = debounce(fetchData, 500);

        debouncedData();

        return () => {
            debouncedData.cancel();
        }
    }, [form.latitude]);

    useEffect(() => {
        if (addShape) {
            enableMarker(false);
        }

    }, [addShape]);

    function enableMarker(bool) {
        setDropMarker(bool);

        setLayerOpen(true);
        setEditLocation(false);

        if (bool == false) {
            resetLocation()
        }
    }

    function deleteSquare() {
        editorRef.current.deleteFeatures(0);
    }

    function getCursor() {
        if (mapRef.current) {
            if (mapRef.current.state.isDragging) {
                return 'grabbing';
            }
        }

        if (singleFeature || dropMarker) {
            return 'pointer'
        }

        if (addShape) {
            return 'crosshair';
        }

        return 'grab';
    }
    function resetLocation() {
        setDropMarker(false);
        setShowMarker(false);

        setForm({
            ...initialForm,
            pinColor: mapConfig.markerColor
        });

        setSingleLocation({
            id: 'dsfsdf',
            country: '',
            city: '',
            description: '',
            geoLocation: {
                latitude: 0,
                longitude: 0
            },
            markerType: {
                type: 'Default',
                pinColor: '#333333'
            }
        });

        setSuggestions({
            place: null,
            address: null
        });
    }

    function showLayerPanel() {
        setLayerOpen(!layerOpen);
        setSavedLayerOpen(!layerOpen);
        if (layerOpen == true) {
            resetLocation();
        }
    }

    function updateShape(shape) {

        console.log(shape);
        const geojson = JSON.parse(shape.geojson)
        const shapeStyle = geojson.properties.style;
        setEditShape(true);

        setShapeForm({
            details: geojson.properties.details,
            fillColor: shapeStyle.fill,
            strokeColor: shapeStyle.stroke,
            fillOpacity: shapeStyle.fillOpacity,
            strokeDasharray: shapeStyle.strokeDasharray,
            strokeWidth: shapeStyle.strokeWidth
        });

        console.log(shapeStyle);

        setShapeUpdateFeature(shape);
        editorRef.current.addFeatures(geojson);

        setAddShape(true);

        setTimeout(() => {
            setSingleFeature(geojson);
        }, 0);
        console.log(geojson);
    }

    function updateLocation(location) {
        setShowMarker(false);
        setSingleLocation(location);
        enableMarker(true);
        setEditLocation(true);
        setMarker({
            latitude: location.geoLocation.latitude,
            longitude: location.geoLocation.longitude
        });

        setForm({
            city: location.city,
            country: location.country,
            description: location.description,
            latitude: marker.latitude,
            longitude: marker.longitude,
            markerType: location.markerType.type,
            pinColor: location.markerType.pinColor
        });

        setTimeout(() => {
            setShowMarker(true);
            flyViewPort(location, 12, false);
        }, 0);
    }

    const memoiseFilteredLocations = useMemo(() => filteredProject && filteredProject.locations.filter(loc => loc.id !== singleLocation.id), [filteredProject, singleLocation]);

    function RenderCityMarker() {
        return mapConfig.loadedMap && memoiseFilteredLocations.map(_location => {
            return <Marker
                key={`marker-${_location.id}`}
                longitude={_location.geoLocation.longitude}
                latitude={_location.geoLocation.latitude}>

                <CityPin onClick={addShape ? null : (e) => {
                    e.stopPropagation();
                    updateLocation(_location);
                }} pinColor={_location.markerType.pinColor}
                    markerType={_location.markerType.type}
                    selected={hoverLocation == _location.id}
                />
            </Marker>
        }
        );
    }

    const memoiseFilteredShapes = useMemo(() => filteredProject && filteredProject.shapes.filter(loc => loc.id !== shapeUpdateFeature.id), [filteredProject, shapeUpdateFeature]);

    function RenderGeoJsonShapes() {
        return mapConfig.loadedMap && memoiseFilteredShapes.map(_shape => {
            const geojson = JSON.parse(_shape.geojson);
            const isLineString = geojson.geometry.type == "LineString";

            const dashArray = geojson.properties.style.strokeDasharray;
            const splitDashArray = geojson.properties.style.strokeDasharray.split(" ").map(x => (+x / 5));
            let hasDashArray = dashArray == "none" ? [1] : splitDashArray; 

            const shapeIdLine = !isLineString ? `${_shape.id}2` : _shape.id;
            const obj = {};
            obj["id"] = _shape.id;
            obj["layerId"] = shapeIdLine;
            obj["geojson"] = _shape.geojson;
            layerIds.push(obj);

            const hovering = (hoverShape == _shape.id) && !editShape;
            let fillColor = geojson.properties.style.fill;
            let fillOpac = geojson.properties.style.fillOpacity;
            let lineColor = geojson.properties.style.stroke;
            let lineWidth = geojson.properties.style.strokeWidth;

                if(hovering) {
                    lineColor = "#7AC943";
                    lineWidth = 4;
                    fillColor = "#7AC943"
                }

            if(hovering) {
                if(fillOpac > 0.7) {
                    fillOpac = fillOpac - 0.2;
                } else {
                    fillOpac = fillOpac + 0.2;
                }
            }
            
            return <React.Fragment key={_shape.id}>
                <Source id={_shape.id} type="geojson" data={geojson}>
                    <Layer
                        id={_shape.id}
                        type='line'
                        source={_shape.id}
                        paint={{
                            'line-color': lineColor,
                            'line-width': lineWidth,
                            'line-dasharray': hasDashArray
                        }}
                    />
                   {!isLineString ? <Layer
                        id={`${_shape.id}2`}
                        type='fill'
                        source={_shape.id}
                        paint={{
                            'fill-color': fillColor,
                            'fill-opacity': fillOpac
                        }}
                    /> : <div></div>} 
                </Source>
            </React.Fragment>
        })
    }

    useEffect(() => {
        filteredProject && filteredProject.shapes.map(_shape => {
            const geojson = JSON.parse(_shape.geojson);
            console.log(geojson);
        })
    }, [filteredProject])

    function updateFeature(feature) {

        const _singleFeature = feature.data.length && feature.data[0];

        // if (!_singleFeature) return;
        
        // _singleFeature.properties.style = {
        //     stroke: shapeForm.strokeColor,
        //     fill: shapeForm.fillColor,
        //     strokeWidth: 2,
        //     fillOpacity: shapeForm.fillOpacity,
        //     strokeDasharray: shapeForm.strokeDasharray,
        //     strokeWidth: shapeForm.strokeWidth
        // }

        // _singleFeature.properties.details = shapeForm.details;

        setSingleFeature(_singleFeature);
    }

    return (
        <CreateLocationMapStyle>
            <div className="map_container">
                <MapGL ref={mapRef}
                    getCursor={getCursor}
                    onNativeClick={(e) => {
                        e.stopPropagation();
                        if (!dropMarker) return;
                        addMarker(e);
                    }}
                    onClick={(e) => {
                        if(dropMarker || addShape) return;
                        const hasFeature = e.features.length;

                        if(!hasFeature) return;

                        const feature = e.features[0].layer.id;
                        const matchedId = layerIds.find(x => x.layerId == feature);
                        const hasMatch = Boolean(matchedId);

                        if(hasMatch) {
                            switchMode(EditingMode);
                            updateShape(matchedId);
                        }

                    }}

                    onHover={(e) => {
                        if(dropMarker || addShape) return;
                        if(!mapConfig.loadedMap) return;
                        const hasFeatureProp = e.hasOwnProperty("features");
                        if(!hasFeatureProp) return;
                        const hasFeature = Boolean(e.features);
                        if(!hasFeature) return;
                        
                        if(!e.features.length) return;
                        const feature = e.features[0].layer.id;
                        const matchedId = layerIds.find(x => x.layerId == feature);
                        const hasMatch = Boolean(matchedId);

                        if(hasMatch) {
                            setHoverShape(matchedId.id);
                        } else {
                            setHoverShape('sdfsdsf');
                        }

                    }}
                >
                    <Editor
                        ref={el => editorRef.current = el}
                        clickRadius={4}
                        onSelect={(selected) => {
                            setSelectedFeatureIndexes(selected);
                            if (selected.mapCoords === undefined) {
                                switchMode(EditingMode);
                            }
                        }}

                        featureStyle={featureStyle}
                        editHandleStyle={editHandleStyle}
                        onUpdate={updateFeature}
                        mode={selectedMode}
                    />
                    {RenderCityMarker()}
                    {RenderGeoJsonShapes()}
                    {showMarker && <DropMarker
                        editLocation={editLocation}
                        marker={marker}
                        onMarkerDragStart={onMarkerDragStart}
                        onMarkerDrag={onMarkerDrag}
                        onMarkerDragEnd={onMarkerDragEnd} />}
                </MapGL>

                <ToolbarContainer>
                    <IconButtonStyle onClick={() => {
                        showLayerPanel();
                    }} className="layer-button" selected={layerOpen}>
                        {!layerOpen && <MaterialIcon icon="chevron_left" />}
                        {layerOpen && <MaterialIcon icon="chevron_right" />}
                    </IconButtonStyle>
                    <Toolbar dropMarker={dropMarker} enableMarker={enableMarker} layerOpen={layerOpen} showLayerPanel={showLayerPanel} />
                </ToolbarContainer>
            </div>
            <RightPanel layerOpen={layerOpen} updateLocation={updateLocation} updateShape={updateShape} enableMarker={enableMarker} showMarker={showMarker} />
        </CreateLocationMapStyle>
    );
}

export default MapEditor;
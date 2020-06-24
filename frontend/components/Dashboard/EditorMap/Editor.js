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

const ToolbarContainer = styled.div`
    display: block;
    position: absolute;
    top: 40px;
    right: 0; 
`;

function MapEditor(props) {
    const { viewport, setViewport, mapConfig } = useContext(ViewPortContext);

    const { loading, projectData: filteredProject } = useContext(UserContext);
    const { form, setForm, dropMarker, setDropMarker, setEditLocation, editLocation, setSingleLocation, singleLocation, setSuggestions } = useContext(LocationEditorContext);

    const {addShape, setAddShape, setSelectedShape} = useContext(ShapeEditorContext);
    const [savedLayerOpen, setSavedLayerOpen] = useLocalStorage('layerOpened', true);

    const [layerOpen, setLayerOpen] = useState(null);

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
    }, [])

    useEffect(() => {
        setForm({
            ...form,
            latitude: marker.latitude,
            longitude: marker.longitude
        });
    }, [marker]);

    useEffect(() => {
        if (!singleLocation) return;
        setForm({
            city: singleLocation.city,
            country: singleLocation.country,
            description: singleLocation.description,
            latitude: marker.latitude,
            longitude: marker.longitude,
            markerType: singleLocation.markerType.type,
            pinColor: singleLocation.markerType.pinColor
        });
    }, [singleLocation]);

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

    const mapRef = useRef(null);

    function enableMarker(bool) {
        setDropMarker(bool);

        setLayerOpen(true);
        setEditLocation(false);
        setAddShape(false);

        if (bool == false) {
            resetLocation()
        } 
    }

    function resetLocation() {
        setDropMarker(false);
        setAddShape(false);
        setShowMarker(false);
        setSelectedShape(null);

        setForm({
            ...form,
            latitude: 0
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

    function updateLocation(location) {
        setShowMarker(false);
        setSingleLocation(location);
        enableMarker(true);
        setEditLocation(true);
        setMarker({
            latitude: location.geoLocation.latitude,
            longitude: location.geoLocation.longitude
        });

        setTimeout(() => {
            setShowMarker(true);
        }, 0);
    }

    const memoiseFilteredProject = useMemo(() => filteredProject && filteredProject.locations.filter(loc => loc.id !== singleLocation.id), [filteredProject, singleLocation]);

    function RenderCityMarker() {

        return mapConfig.loadedMap && memoiseFilteredProject.map(_location => {
            return <Marker
                key={`marker-${_location.id}`}
                longitude={_location.geoLocation.longitude}
                latitude={_location.geoLocation.latitude}>

                <CityPin onClick={(e) => {
                    e.stopPropagation();
                    updateLocation(_location);
                }} pinColor={_location.markerType.pinColor}
                    markerType={_location.markerType.type}
                />
            </Marker>
        }
        )
    }

    return (
        <CreateLocationMapStyle>
            <div className="map_container">
                <MapGL ref={mapRef}
                    onNativeClick={(e) => {
                        e.stopPropagation();
                        if (!dropMarker) return;
                        addMarker(e);
                    }}
                >
                    {RenderCityMarker()}
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
            <RightPanel layerOpen={layerOpen} updateLocation={updateLocation} enableMarker={enableMarker} />
        </CreateLocationMapStyle>
    );
}

export default MapEditor;
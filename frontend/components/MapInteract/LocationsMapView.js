import React, {useState, useEffect, useContext, useRef, useMemo} from 'react';
import {Marker, FlyToInterpolator, Source, Layer} from 'react-map-gl';
import gql from 'graphql-tag';
import CityPin from '../Icons/BaseMarker';
import Location from './LocationMapViewItem';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import MaterialIcon from '@material/react-material-icon';
import MapGL, {TOKEN} from '../MapGL';
import {UserContext} from '../Layout/DashboardLayout';
import {useQuery} from 'react-apollo-hooks';
import {useRouter} from 'next/router'
import {ViewPortContext} from '../providers/MapProvider';
import { easeCubic } from 'd3-ease';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';

import Title from '../Dashboard/MainContentTitle';
import Search from '../Dashboard/Searchbar/Searchbar';

let Geocoder;

if (typeof window !== 'undefined') { 
  Geocoder = require('react-map-gl-geocoder').default; 
}


const SINGLE_LOCATION_QUERY = gql `
    query SINGLE_LOCATION_QUERY($locationID: ID!) {
        location(where: { id: $locationID }) {
            id
            country
            city
            geoLocation {
                latitude
                longitude
            }
            description
        }
    }
`;

const IconButtonStyle = styled(IconButton)`
    && {
        background-color: ${props => props.theme.white};
        border: 1px solid ${props => props.theme.grey};
        color: ${props => props.theme.black};
        padding:8px;
        margin-left: 16px;
        width: 50px;

        &:hover {
            background-color: ${props => props.theme.lightgrey};
        }
    }
`;


const ShapeHoverInfo = styled.div`
    position: fixed;
    background: #ffffff;
    padding: 16px;;
    color: #333333;
    opacity: 0.9;
    border-radius: 10px;
    min-width: 200px;
    font-family: ${props => props.theme.boldFont};
    font-size: 18px;

    p {
        font-family: ${props => props.theme.fontFamily};
        font-size: 16px;
    }
`;

function AllLocations(props) {
    const router = useRouter();
    const {user: data, loading: projectLoading} = useContext(UserContext);
    const {viewport, flyViewPort, onViewportChange, mapConfig} = useContext(ViewPortContext);

    const mapRef = useRef();

       let layerIds = [];

    const [locationDetail,
        setLocationDetail] = useState(null);
    const [singleLocation,
        setSingleLocation] = useState(null);
        const {locationID} = props;
    const [paramProps,
        setParamProps] = useState(null);
    const [isOpened,
        setIsOpened] = useState(null);
    
     const [hoverShape, setHoverShape] = useState('');

    const [hoverGeoJsonData, setHoverGeoJsonData] = useState(null);

     const {data: singleLocationData, loading, refetch} = useQuery(SINGLE_LOCATION_QUERY, {
            variables: {
                locationID: locationID || 0
            }
     });

     const filteredProject = data && data.projects.find(el => {
        return el.id === router.query.id
      });

      


    function reCenter() {
        onViewportChange({
            latitude: mapConfig.originalLat,
            longitude: mapConfig.originalLng,
            zoom: mapConfig.minZoom,
            transitionInterpolator: new FlyToInterpolator(),
            transitionDuration: 500,
            transitionEasing: easeCubic
        });

        console.log(mapConfig.minZoom);
    }

    function closeLocationDetail() {
        setIsOpened(false);
        setParamProps(null);

        setTimeout(() => {
            setLocationDetail(null)
            setSingleLocation(null);

        }, 200)

    }

    function _toggleLocationDetail(location) {
        let locationDetailBool = locationDetail || singleLocation;
        if (locationDetailBool) {
            closeLocationDetail()
        } 

        if(locationDetailBool && locationDetail.id !== location.id) {
            closeLocationDetail()
            setTimeout(() => {
                setLocationDetail(location);
                setIsOpened(true);
                flyViewPort(location, 12);
            }, 300)

        }

        if(!locationDetailBool) {
            setLocationDetail(location);
            setIsOpened(true)
            flyViewPort(location, 12);

        }
    }

    function RenderCityMarker() {
        return data && filteredProject.locations.map(location => (
            <Marker
                key={`marker-${location.id}`}
                longitude={location.geoLocation.longitude}
                latitude={location.geoLocation.latitude}>
                
                    <CityPin onClick={() => _toggleLocationDetail(location)}
                    pinColor={location.markerType.pinColor}
                           markerType={location.markerType.type}
                    />
            </Marker>
        ))
    }

    function RenderGeoJSONHover() {
            return hoverGeoJsonData && <ShapeHoverInfo style={
                {
                    left: hoverGeoJsonData.x,
                    top: hoverGeoJsonData.y - 40
                }
            }>
                            {hoverGeoJsonData.title}

                     { hoverGeoJsonData.area !== 0 && <p>Land Area: {(parseFloat(hoverGeoJsonData.area) / 1000000).toFixed(2)} Sq Km</p>}
            </ShapeHoverInfo>
    }

    function RenderGeoJsonShapes() {
        return mapConfig.loadedMap && filteredProject.shapes.map(_shape => {
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

            const hovering = (hoverShape == _shape.id);
            let fillColor = geojson.properties.style.fill;
            let fillOpac = geojson.properties.style.fillOpacity;
            let lineColor = geojson.properties.style.stroke;
            let lineWidth = geojson.properties.style.strokeWidth;


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


    function RenderLocationDetail() {
        let locationDetailBool = locationDetail || singleLocation;

        return locationDetailBool && (<Location
            location={locationDetailBool}
            key={locationDetailBool.id}
            closeLocation={closeLocationDetail}
            isOpened={isOpened}
            editButton={props.editButton}/>)
    }

    return (<>
         
        <div className="map-container">
            
            <div className="search_container">
            <Title title={data && filteredProject.title} titleColor={mapConfig.markerColor}/>
                <div className="flex-search">
                    <Search /> 
                    <IconButtonStyle onClick={reCenter}><MaterialIcon icon="home"/></IconButtonStyle>
                </div>
            </div>
            <MapGL ref={mapRef}

                  onHover={(e) => {
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

                            const matchedGeoJson = JSON.parse(matchedId.geojson);
                            const propertyDetail = matchedGeoJson.properties.details;
                            const landArea = matchedGeoJson.properties.area;
                            const isLine = matchedGeoJson.geometry.type !== "LineString";

                            setHoverShape(matchedId.id);
                            setHoverGeoJsonData({
                                x: e.offsetCenter.x,
                                y: e.offsetCenter.y,
                                title: propertyDetail,
                                area: isLine ? landArea : 0
                            });

                        } else {
                            setHoverShape('sdfsdsf');
                               setHoverGeoJsonData(null);
                        }


                    }}
                >
                {RenderCityMarker()}
                 {RenderGeoJsonShapes()}
                 
                <Geocoder
          mapRef={mapRef}
          onViewportChange={onViewportChange}
          mapboxApiAccessToken={TOKEN}
          position="top-right"
        />
            </MapGL>
        </div>
         {RenderLocationDetail()}
         {RenderGeoJSONHover()}
        </>
    )
}

export default AllLocations;
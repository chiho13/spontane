import React, {useState, useEffect, useContext, useRef} from 'react';
import {Marker, FlyToInterpolator} from 'react-map-gl';
import gql from 'graphql-tag';
import CityPin from './Icons/CityMarker';
import Location from './LocationMapViewItem';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import MaterialIcon from '@material/react-material-icon';
import MapGL, {TOKEN} from './MapGL';
import {UserContext} from './Layout/DashboardLayout';
import {useQuery} from 'react-apollo-hooks';
import {useRouter} from 'next/router'
import {ViewPortContext} from './providers/MapProvider';
import { easeCubic } from 'd3-ease';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
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
        position: absolute;
        bottom: 8px;
        right: 8px; 

        &:hover {
            background-color: ${props => props.theme.lightgrey};
        }
    }
`;

function AllLocations(props) {
    const router = useRouter();
    const {user: data} = useContext(UserContext);
    const {viewport, flyViewPort, onViewportChange, mapConfig} = useContext(ViewPortContext);

    console.log(mapConfig.minZoom);

    // const {viewport, setViewport, onViewportChange} = useViewPort({
    //     latitude: 55,
    //     longitude: 2,
    //     zoom: 2
    // });
    const mapRef = useRef();

    const [locationDetail,
        setLocationDetail] = useState(null);
    const [singleLocation,
        setSingleLocation] = useState(null);
        const {locationID} = props;
    const [paramProps,
        setParamProps] = useState(null);
    const [isOpened,
        setIsOpened] = useState(null);
    

     const {data: singleLocationData, loading, refetch} = useQuery(SINGLE_LOCATION_QUERY, {
            variables: {
                locationID: locationID || 0
            }
     });

     const filteredProject = data && data.projects.find(el => {
        return el.id === router.query.id
      });

      
    
      useEffect(() => {
        if(loading) {
            return
        }

        const {location} = singleLocationData

        if(locationID) {
         setLocationDetail(location);
        setIsOpened(true)
        flyViewPort(location, parseFloat(props.minZoom) + 2);
        }

      }, [singleLocationData]);


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

        const href = `/admin/project/locations/map/[id]`;
            
        const newPath = `/admin/project/locations/map/${router.query.id}`;
        
        router.push(href, newPath, {shallow: true});

        setIsOpened(false);
        setParamProps(null);
        
        // flyViewPort({
        //     geoLocation: {
        //       latitude: 1.34,
        //     longitude: 103,
        //     } 
        // }, mapConfig.minZoom, false);

        setTimeout(() => {
            setLocationDetail(null)
            setSingleLocation(null);
        }, 200);
    }

    console.log(viewport);
    function _toggleLocationDetail(location) {
        let locationDetailBool = locationDetail || singleLocation;
        if (locationDetailBool) {
            closeLocationDetail()
        } 

        if(locationDetailBool && locationDetail.id !== location.id) {
            closeLocationDetail()
            setTimeout(() => {
                setLocationDetail(location);
                setIsOpened(true)
                flyViewPort(location, mapConfig.minZoom);
            }, 300)

            _openLocationPath(location);
        }

        if(!locationDetailBool) {
            setLocationDetail(location);
            setIsOpened(true)
            flyViewPort(location, mapConfig.minZoom + 2);

            console.log(location);

            _openLocationPath(location);
        }
    }

    function _openLocationPath(location) {
        const href = `/admin/project/locations/map/[id]`;
            
        const newPath = `/admin/project/locations/map/${router.query.id}` + `?locationID=${location.id}` + `&minZoom=${mapConfig.minZoom}`;
        
        router.push(href, newPath, {shallow: true});
    }

    function RenderCityMarker() {
        return data && filteredProject.locations.map(location => (
            <Marker
                key={`marker-${location.id}`}
                longitude={location.geoLocation.longitude}
                latitude={location.geoLocation.latitude}>
                
                    <CityPin size={20} onClick={() => _toggleLocationDetail(location)}/>
            </Marker>
        ))
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

    return (
        <div className="map-container">
            <MapGL ref={mapRef}
                >
                {RenderCityMarker()}
                <IconButtonStyle onClick={reCenter}><MaterialIcon icon="home"/></IconButtonStyle>
                <Geocoder
          mapRef={mapRef}
          onViewportChange={onViewportChange}
          mapboxApiAccessToken={TOKEN}
          position="top-right"
        />
            </MapGL>
            {RenderLocationDetail()}
        </div>
    )
}

export default AllLocations;
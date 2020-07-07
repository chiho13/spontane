import React, {useState, useEffect, useContext, useRef} from 'react';
import {Marker, FlyToInterpolator} from 'react-map-gl';
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
        position: absolute;
        bottom: 16px;
        right: 16px; 

        &:hover {
            background-color: ${props => props.theme.lightgrey};
        }
    }
`;

function AllLocations(props) {
    const router = useRouter();
    const {user: data, loading: projectLoading} = useContext(UserContext);
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
                <Search />
            </div>
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
        </div>
         {RenderLocationDetail()}
        </>
    )
}

export default AllLocations;
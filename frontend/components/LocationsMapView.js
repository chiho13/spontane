import React, {useState, useEffect, useContext} from 'react';
import {Marker, FlyToInterpolator} from 'react-map-gl';
import gql from 'graphql-tag';
import CityPin from './Icons/CityMarker';
import Location from './LocationMapViewItem';
import Link from 'next/link';
import getCoordinates from './helpers/offsetLocation';
import MapGL from 'react-map-gl';
import {TOKEN} from './MapGL';
import {UserContext} from './Layout/DashboardLayout';
import useViewPort from './hooks/useViewPort';
import {useQuery} from 'react-apollo-hooks';
import Router from 'next/router'
import {ViewPortContext} from './providers/MapProvider';

const SINGLE_LOCATION_QUERY = gql `
    query SINGLE_LOCATION_QUERY($id: ID) {
        location(where: { id: $id }) {
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

function AllLocations(props) {
    const {user: data} = useContext(UserContext);
    const {viewport, flyViewPort, onViewportChange} = useContext(ViewPortContext);

    const [locationDetail,
        setLocationDetail] = useState(null);
    const [singleLocation,
        setSingleLocation] = useState(null);
    const [paramProps,
        setParamProps] = useState(null);
    const [isOpened,
        setIsOpened] = useState(null);

    
     const {data: singleLocationData, loading} = useQuery(SINGLE_LOCATION_QUERY, {
            variables: {
                id: props.id || 0
            }
     });
    

    useEffect(() => {

        if (loading) {
            return
        }
        const {location} = singleLocationData;
        if (paramProps) {
            location && setSingleLocation(location);
            setIsOpened(true);
            location && flyViewPort(location);
        }


    }, [paramProps]);

    function offsetMarker() {
        const offset = getCoordinates().getCoords(window.innerWidth * 0.625, window.innerHeight * (0.5 - (30 / window.innerHeight)), props.lat, viewport.zoom);
        const offsetLon = window.innerWidth > 1000
            ? parseFloat(offset.lon)
            : 0;
        const offsetLat = window.innerWidth > 1000
            ? 0
            : parseFloat(offset.lat);

        onViewportChange({
            latitude: parseFloat(props.lat) + offsetLat,
            longitude: parseFloat(props.lon) + offsetLon,
        })
    }

    function closeLocationDetail() {
        setIsOpened(false);
        setParamProps(null)
        setTimeout(() => {
            setLocationDetail(null)
            setSingleLocation(null);
        }, 200);
    }

    function _toggleLocationDetail(location) {
        let locationDetailBool = (locationDetail || singleLocation) && location.id === props.id;
        if (locationDetailBool) {
            closeLocationDetail()
        } else {
            setLocationDetail(location);
            setIsOpened(true)
            flyViewPort(location);
        }
    }

    function _locationPathName(location) {
        let locationDetailBool = (locationDetail || singleLocation) && location.id === props.id;
        let pathNameLocation = {
            pathname: props.pathname || 'map',
            query: {
                view: 'Map',
                id: location.id,
                lat: location.geoLocation.latitude,
                lon: location.geoLocation.longitude
            }
        };

        let pathNameRoot = {
            pathname: props.pathname || 'map',
            query: {
                view: 'Map'
            }
        };
        let locationPathName = locationDetailBool
            ? pathNameRoot
            : pathNameLocation;

        return locationPathName;
    }

    function RenderCityMarker() {
        return data && data.locations.map(location => (
            <Marker
                key={`marker-${location.id}`}
                longitude={location.geoLocation.longitude}
                latitude={location.geoLocation.latitude}>
                <Link href={_locationPathName(location)}>
                    <CityPin size={20} onClick={() => _toggleLocationDetail(location)}/>
                </Link>
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
            pathname={props.pathname || 'map'}
            editButton={props.editButton}/>)
    }

    useEffect(() => {
        if (props.id) {
            setParamProps(props.id);
            offsetMarker()
        }
    },[singleLocationData]);

    return (
        <div className="map-container">
            <MapGL
             mapStyle="mapbox://styles/anthonyhodesu/ck0y2dle1013q1cpk194xrvtu"
                { ...viewport }
                width="100%"
                height="100%"
                mapboxApiAccessToken={TOKEN}
                onViewportChange={onViewportChange}
                >
              
                {RenderCityMarker()}
            </MapGL>
            {RenderLocationDetail()}
        </div>
    )
}

export default AllLocations;
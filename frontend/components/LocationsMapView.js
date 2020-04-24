import React, {useState, useEffect, useContext} from 'react';
import {Marker, FlyToInterpolator} from 'react-map-gl';
import gql from 'graphql-tag';
import CityPin from './Icons/CityMarker';
import Location from './LocationMapViewItem';
import Link from 'next/link';
import getCoordinates from './helpers/offsetLocation';

import MapGL from './MapGL';
import {UserContext} from './Layout/DashboardLayout';
import useViewPort from './hooks/useViewPort';
import {useQuery} from 'react-apollo-hooks';
import {useRouter} from 'next/router'
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
    const router = useRouter();
    const {user: data} = useContext(UserContext);
    const {viewport, flyViewPort, onViewportChange} = useContext(ViewPortContext);

    const initialViewport = {
        latitude: 55,
        longitude: 0,
        zoom: 2
    }
    // const {viewport, setViewport, onViewportChange} = useViewPort({
    //     latitude: 55,
    //     longitude: 2,
    //     zoom: 2
    // });

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

     const filteredProject = data && data.projects.find(el => {
        return el.id === router.query.id
      });
    

    // useEffect(() => {

    //     if (loading) {
    //         return
    //     }
    //     const {location} = singleLocationData;
    //     if (paramProps) {
    //         location && setSingleLocation(location);
    //         setIsOpened(true);
    //         location && flyViewPort(location);
    //     }


    // }, [paramProps]);

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

        const href = `/admin/project/locations/map/[id]`;
            
        const newPath = `/admin/project/locations/map/${router.query.id}`;
        
        router.push(href, newPath, {shallow: true});

        setIsOpened(false);
        setParamProps(null);
        
        flyViewPort({
            geoLocation: {
              latitude: 55,
            longitude: 0,
            } 
        }, 2, false);

        setTimeout(() => {
            setLocationDetail(null)
            setSingleLocation(null);
        }, 200);
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
                setIsOpened(true)
                flyViewPort(location, 7);
            }, 300)

            _openLocationPath(location);
        }

        if(!locationDetailBool) {
            setLocationDetail(location);
            setIsOpened(true)
            flyViewPort(location, 7);

            console.log(location);

            _openLocationPath(location);
        }
    }

    function _openLocationPath(location) {
        const href = `/admin/project/locations/map/[id]`;
            
        const newPath = `/admin/project/locations/map/${router.query.id}` + `?id=${location.id}?lat=${location.geoLocation.latitude}?lon=${location.geoLocation.longitude}`;
        
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
            <MapGL
                >
              
                {RenderCityMarker()}
            </MapGL>
            {RenderLocationDetail()}
        </div>
    )
}

export default AllLocations;
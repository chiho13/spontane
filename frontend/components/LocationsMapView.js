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

function AllLocations(props) {
    const router = useRouter();
    const {user: data} = useContext(UserContext);
    const {viewport, flyViewPort, onViewportChange, mapConfig} = useContext(ViewPortContext);


    // const {viewport, setViewport, onViewportChange} = useViewPort({
    //     latitude: 55,
    //     longitude: 2,
    //     zoom: 2
    // });

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
            <MapGL
                >
              
                {RenderCityMarker()}
            </MapGL>
            {RenderLocationDetail()}
        </div>
    )
}

export default AllLocations;
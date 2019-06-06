import React, {useState, useEffect, useContext} from 'react';
import {Marker, FlyToInterpolator} from 'react-map-gl';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import CityPin from './Icons/CityMarker';
import Location from './LocationMapViewItem';
import Link from 'next/link';
import getCoordinates from './helpers/offsetLocation';
import MapGL from 'react-map-gl';
import {TOKEN} from './MapGL';
import {ALL_LOCATIONS_QUERY} from './Dashboard/LocationsListView';
import {UserContext} from './Layout/DashboardLayout';
import useViewPort from './hooks/useViewPort';

const SINGLE_LOCATION_QUERY = gql `
    query SINGLE_LOCATION_QUERY($id: ID!) {
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

function AllLocations(props){
    const userId = useContext(UserContext);
   const {viewport, setViewport, onViewportChange} = useViewPort({
        latitude: 53.9777,
        longitude: -1.6376,
        zoom: props.id
        ? 9
        : 6
   })

   const [locationDetail, setLocationDetail] = useState(null);
   const [singleLocation, setSingleLocation] = useState(null);
   const [paramProps, setParamProps] = useState(null);
   const [isOpened, setIsOpened] = useState(null);

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
            longitude: parseFloat(props.lon) + offsetLon
        })
    }

    function closeLocationDetail() {
        setIsOpened(false);
        setParamProps(null)
        setTimeout(() => {
            setLocationDetail(null)
            setSingleLocation(null);
        }, 500);
    }

   function _toggleLocationDetail(location) {
        let locationDetailBool = (locationDetail || singleLocation) && location.id === props.id;
        if (locationDetailBool) {
                closeLocationDetail()
        } else {
            setLocationDetail(location);
            setIsOpened(true)
            _goToViewport(location);
        }
    }

    function _locationPathName(location) {
        let locationDetailBool = (locationDetail || singleLocation) && location.id === props.id;
        let pathNameLocation = {
            pathname: props.pathname,
            query: {
                view: 'Map',
                id: location.id,
                lat: location.geoLocation.latitude,
                lon: location.geoLocation.longitude
            }
        };

        let pathNameRoot = {
            pathname: props.pathname,
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
        return ( <Query
                    query={ALL_LOCATIONS_QUERY}
                    variables={{
                    userId: userId.id
                }}>
                    {({data, error, loading}) => {
                        if (loading) 
                            return <p>Loading...</p>;
                        if (error) 
                            return <p>Error: {error.message}</p>;
                        return (data.locations.map(location => (
                            <Marker
                                key={`marker-${location.id}`}
                                longitude={location.geoLocation.longitude}
                                latitude={location.geoLocation.latitude}>
                                <Link href={_locationPathName(location)}>
                                    <CityPin size={20} onClick={() => _toggleLocationDetail(location)}/>
                                </Link>
                            </Marker>
                        )))
                    }}
                </Query>
        );
    }

    function RenderLocationDetail() {
        let locationDetailBool = locationDetail || singleLocation;

        return locationDetailBool && (<Location
            location={locationDetailBool}
            key={locationDetailBool.id}
            closeLocation={closeLocationDetail}
            isOpened={isOpened}
            pathname={props.pathname}
            editButton={props.editButton}/>)
    }

    function _singleLocation() {
        const checkForProps = paramProps;
        return checkForProps && <Query
            query={SINGLE_LOCATION_QUERY}
            variables={{
            id: props.id
        }}
            onCompleted={data => {
            const {location} = data;

            setSingleLocation(location);
            setIsOpened(true);
        }}>
            {({error, loading, data}) => {
                if (error) 
                    console.log("error")
                if (loading) 
                    console.log("loading")
                return null;
            }}
        </Query>
    }

    function _goToViewport({
        geoLocation: {
            longitude,
            latitude
        }
    }) {
        const offset = getCoordinates().getCoords(window.innerWidth * 0.625, window.innerHeight * (0.5 - (30 / window.innerHeight)), latitude, 9);
        const offsetLon = window.innerWidth > 1000
            ? parseFloat(offset.lon)
            : 0;
        const offsetLat = window.innerWidth > 1000
            ? 0
            : parseFloat(offset.lat);

        onViewportChange({
            longitude: longitude + offsetLon,
            latitude: latitude + offsetLat,
            zoom: 9,
            transitionInterpolator: new FlyToInterpolator(),
            transitionDuration: 1000
        });
    };

    useEffect(() => {
        setParamProps(props.id)
        props.id && offsetMarker();
    }, [])

        return (
            <div className="map-container">
                <MapGL
                    { ...viewport }
                    width="100%"
                    height="100%"
                    mapboxApiAccessToken={TOKEN}
                    onViewportChange={onViewportChange}>

                   <RenderCityMarker />
                    {_singleLocation()}
                </MapGL>
                {RenderLocationDetail()}
            </div>
        )
}

export default AllLocations;
export {ALL_LOCATIONS_QUERY};
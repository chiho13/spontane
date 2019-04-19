import React, {useState, useEffect} from 'react';
import {Mutation, Query} from 'react-apollo';
import CreateLocationForm from './LocationForm';
import gql from 'graphql-tag';
import Router from 'next/router';

import UpdateLocationForm from './LocationForm';
import MapGL from './MapGL';
import CreateLocationMapStyle from './styles/MapContainerStyle';
import {ALL_LOCATIONS_QUERY} from './LocationsMapView';
import DropMarker from './DropMarker';

import useLocation from './hooks/useLocationForm';
import useMapMarker from './hooks/useMapMarker';

const SINGLE_LOCATION_QUERY = gql `
    query SINGLE_LOCATION_QUERY($id: ID!) {
        location(where: {id: $id}) {
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

const UPDATE_LOCATION_MUTATION = gql `
    mutation UPDATE_LOCATION_MUTATION(
        $id: ID!
        $country: String
        $city: String
        $latitude: Float
        $longitude: Float
        $description: String
    ) {
        updateLocation(
            id: $id
            country: $country
            city: $city
            geoLocation: {
                update: {
                    latitude: $latitude
                    longitude: $longitude
                }
            }
            description: $description
        ) {
            id
            country
            city
        }
    }
`;

function UpdateLocation(props) {
    const [viewport,
        setViewport] = useState({height: '100vh', width: '100vw', latitude: 52.85, longitude: 34.9, zoom: 3});

    const [form,
        setForm,
        handleChange] = useLocation();

    const {
        marker,
        setMarker,
        addMarker,
        onMarkerDragStart,
        onMarkerDrag,
        onMarkerDragEnd
    } = useMapMarker();

    useEffect(() => {
        setMarker({
            latitude: props.latitude,
            longitude: props.longitude,
        })
        
        setForm({
            ...form,
            latitude: marker.latitude,
            longitude: marker.longitude
        });
    }, []);

    async function updateForm(e, updateLocationMutation) {
        e.preventDefault();

        const res = await updateLocationMutation({
            variables: {
                id: props.id,
                ...form
            }
        });
    }

    return (
        <CreateLocationMapStyle>
            <Query
                query={SINGLE_LOCATION_QUERY}
                variables={{
                id: props.id
            }}>

                {({data, loading}) => {
                    if (loading) 

                        return <p>Loading...</p>;
                    if (!data.location) 
                        return <p>No Item Found</p>
                    return (
                        <>
                            <MapGL
                                viewport={{
                                ...viewport
                            }}
                                onClick={addMarker}>
                                {data.location && <DropMarker
                                    marker={marker}
                                    defaultMarker={data.location}
                                    onMarkerDragStart={onMarkerDragStart}
                                    onMarkerDrag={onMarkerDrag}
                                    onMarkerDragEnd={onMarkerDragEnd}/>}
                            </MapGL>

                            <div>hello</div>
                            <Mutation mutation={UPDATE_LOCATION_MUTATION} variables={form}>
                                {(updateLocation, {loading, error}) => (<UpdateLocationForm
                                    form={form}
                                    defaultValue={data.location}
                                    mode="EDIT"
                                    marker={data.location.geoLocation}
                                    handleChange={handleChange}
                                    loading={loading}
                                    onSubmit={e => updateForm(e, updateLocation)}
                                    error={error}/>)}
                            </Mutation>
                        </>
                    )
                }}
            </Query>
        </CreateLocationMapStyle>
    );
}

export default UpdateLocation;
export {UPDATE_LOCATION_MUTATION};
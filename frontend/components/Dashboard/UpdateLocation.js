import React, {useState, useEffect} from 'react';
import {Mutation, Query} from 'react-apollo';
import CreateLocationForm from '../LocationForm';
import gql from 'graphql-tag';
import Router from 'next/router';

import UpdateLocationForm from '../LocationForm';
import MapGL from '../MapGL';
import CreateLocationMapStyle from '../styles/MapContainerStyle';
import {ALL_LOCATIONS_QUERY} from '../LocationsMapView';
import DropMarker from './DropMarker/DropMarker';

import useForm from '../hooks/useForm';
import useMapMarker from '../hooks/useMapMarker';
import useViewport from '../hooks/useViewPort';

import {useQuery} from 'react-apollo-hooks';

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
    const {longitude, latitude } = props;
    
    const {data, loading} = useQuery(SINGLE_LOCATION_QUERY, {variables: {
        id: props.id
    }})

    const initialData = data.location ? {
        country: data.location.country,
        city: data.location.city,
        description: data.location.description,
        latitude: data.location.geoLocation.latitude,
        longitude: data.location.geoLocation.longitude
    } : null;

    const {viewport,
        setViewport} = useViewport({height: '100vh', width: '100vw', latitude: parseFloat(latitude), longitude: parseFloat(longitude) + 24, zoom: 3});

    const [form,
        setForm,
        handleChange] = useForm({});

    const {
        marker,
        setMarker,
        showMarker,
        setShowMarker,
        addMarker,
        onMarkerDragStart,
        onMarkerDrag,
        onMarkerDragEnd
    } = useMapMarker({
        latitude: props.latitude,
        longitude: props.longitude
    });

    useEffect(() => {
        setForm({
            ...form,
            latitude: marker.latitude,
            longitude: marker.longitude
        });
    });

    async function updateForm(e, updateLocationMutation) {
        e.preventDefault();

        const res = await updateLocationMutation({
            variables: {
                id: props.id,
                ...form
            }
        });

        if(res) {
            console.log(res);
        }
    }

    if(loading) {
        return <div></div>
    }

    return (
        <CreateLocationMapStyle>
                        <>
                            <MapGL
                                viewport={{
                                ...viewport
                            }}
                                onClick={addMarker}>
                                <DropMarker
                                    marker={marker}
                                    defaultMarker={data.location}
                                    onMarkerDragStart={onMarkerDragStart}
                                    onMarkerDrag={onMarkerDrag}
                                    onMarkerDragEnd={onMarkerDragEnd}/>
                            </MapGL>

                            <Mutation mutation={UPDATE_LOCATION_MUTATION} variables={form} 
                              refetchQueries={[
                                {query: ALL_LOCATIONS_QUERY}
                            ]}
                            >
                                {(updateLocation, {loading, error}) => (<UpdateLocationForm
                                    defaultValue={data.location}
                                    marker={marker} 
                                    handleChange={handleChange}
                                    loading={loading}
                                    onSubmit={e => updateForm(e, updateLocation)}
                                    error={error}/>)}
                            </Mutation>
                        </>
        </CreateLocationMapStyle>
    );
}

export default UpdateLocation;
export {UPDATE_LOCATION_MUTATION};
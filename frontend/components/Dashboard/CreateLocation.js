import React, {useState, useEffect, useRef} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import CreateLocationForm from '../LocationForm';

import MapGL from '../MapGL';
import CreateLocationMapStyle from '../styles/MapContainerStyle';
import {ALL_LOCATIONS_QUERY} from './LocationsListView';
import DropMarker from './DropMarker/DropMarker';

import useForm from '../hooks/useForm';
import useMapMarker from '../hooks/useMapMarker';

const CREATE_LOCATION_MUTATION = gql `
    mutation CREATE_LOCATION_MUTATION(
        $country: String!
        $city: String!
        $latitude: Float!
        $longitude: Float!
        $description: String
    ) {
        createLocation(
            country: $country
            city: $city
            geoLocation: {
                create: {
                    latitude: $latitude
                    longitude: $longitude
                }
            }
            description: $description
        ) {
            id
        }
    }
`;

function CreateLocation() {
    const [viewport,
        setViewport] = useState({height: '100vh', width: '100vw', latitude: 52.85, longitude: 34.9, zoom: 3});

    const [form,
        setForm,
        handleChange] = useForm({
            country: '',
            city: '',
            description:'',
            latitude: 0,
            longitude: 0
        });

    const {
        marker,
        addMarker,
        showMarker,
        onMarkerDragStart,
        onMarkerDrag,
        onMarkerDragEnd
    } = useMapMarker({latitude: 0, longitude: 0});

    useEffect(() => {
        setForm({
            ...form,
            latitude: marker.latitude,
            longitude: marker.longitude
        });
    });

    function update(cache, {data: {
            createLocation
        }}) {
        try {

            const data = cache.readQuery({query: ALL_LOCATIONS_QUERY});
            console.log(data);
            data
                .locations
                .push(createLocation);
                cache.writeQuery({query: ALL_LOCATIONS_QUERY, data});
        } catch (error) {
            console.error(error);
        }
    }

    async function onSubmit(e, createLocation) {
        e.preventDefault();
        const res = await createLocation();
        Router.push({
            pathname: '/admin/locations',
            query: {
                view: 'Map',
                id: res.data.createLocation.id,
                lat: form.latitude,
                lon: form.longitude
            }
        });
    }

    return (
        <CreateLocationMapStyle>
            <MapGL
                viewport={{
                ...viewport
            }}
                onClick={addMarker}>
                {showMarker && <DropMarker
                    marker={marker}
                    onMarkerDragStart={onMarkerDragStart}
                    onMarkerDrag={onMarkerDrag}
                    onMarkerDragEnd={onMarkerDragEnd}/>}
            </MapGL>
            <Mutation mutation={CREATE_LOCATION_MUTATION} variables={form} update={update}>
                {(createLocation, {loading, error}) => (<CreateLocationForm
                    form={form}
                    defaultValue={form}
                    mode="CREATE"
                    marker={marker}
                    handleChange={handleChange}
                    loading={loading}
                    onSubmit={e => onSubmit(e, createLocation)}
                    error={error}/>)}
            </Mutation>
        </CreateLocationMapStyle>
    );
}

export default CreateLocation;
export {CREATE_LOCATION_MUTATION};
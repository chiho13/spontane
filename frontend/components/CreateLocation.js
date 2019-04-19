import React, {useState, useEffect} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';

import CreateLocationForm from './CreateLocationForm';

import MapGL from './MapGL';
import CreateLocationMapStyle from './styles/MapContainerStyle';
import {ALL_LOCATIONS_QUERY} from './LocationsMapView';
import DropMarker from './DropMarker';

import useLocation from './hooks/useLocationForm';
import useMapMarker from './hooks/useMapMarker';

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
        handleChange] = useLocation();

    const [marker,
        addMarker,
        onMarkerDragStart,
        onMarkerDrag,
        onMarkerDragEnd] = useMapMarker();
    const markerHasLocation = marker.latitude && marker.longitude;

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
            if (cache.data.data.ROOT_QUERY) {
                const data = cache.readQuery({query: ALL_LOCATIONS_QUERY});
                console.log(data);
                data
                    .locations
                    .push(createLocation);
                cache.writeQuery({query: ALL_LOCATIONS_QUERY, data});
            }
        } catch (error) {
            console.error(error);
        }
    }

    function MutateForm() {
        return
    }

    return (
        <CreateLocationMapStyle>
            <MapGL
                viewport={{
                ...viewport
            }}
                onClick={addMarker}>
                {markerHasLocation && <DropMarker
                    marker={marker}
                    onMarkerDragStart={onMarkerDragStart}
                    onMarkerDrag={onMarkerDrag}
                    onMarkerDragEnd={onMarkerDragEnd}/>}
            </MapGL>
            <Mutation mutation={CREATE_LOCATION_MUTATION} variables={form} update={update}>
                {(createLocation, {loading, error}) => (<CreateLocationForm
                    form={form}
                    marker={marker}
                    handleChange={handleChange}
                    createLocation={createLocation}
                    loading={loading}
                    error={error}/>)}
            </Mutation>;
        </CreateLocationMapStyle>
    );
}

export default CreateLocation;
export {CREATE_LOCATION_MUTATION};
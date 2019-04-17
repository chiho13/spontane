import React, {useState, useEffect} from 'react';
import {Mutation} from 'react-apollo';
import {Marker} from 'react-map-gl';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';
import CityPin from './Icons/CityMarker';
import MapGL from './MapGL';
import ShowMarker from './styles/ShowMarker';
import CreateLocationMapStyle from './styles/MapContainerStyle';
import {ALL_LOCATIONS_QUERY} from './LocationsMapView';

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
    const [viewport, setViewport] = useState({
        height: '100vh',
        width: '100vw',
        latitude: 52.85,
        longitude: 34.9,
        zoom: 3
    });

    const [form, setForm] = useState({
        country: '',
        city: '',
        description:'',
        latitude: 0,
        longitude: 0
    });
   
    const [marker, setMarker] = useState({
        latitude: '',
        longitude: ''
    });
    const [events, setEvents] = useState({});

    useEffect(() => {
        setForm({
            ...form,
            latitude: marker.latitude,
            longitude: marker.longitude
        });
    });

    function logDragEvent(name, event) {
        setEvents({
                ...events,
                [name]: event.lngLat
        });
    }

    function onMarkerDragStart(event) {
        logDragEvent('onDragStart', event);
    }

    function onMarkerDrag(event) {
        const {lngLat} = event;
        logDragEvent('onDrag', event);
        updateLocation(lngLat);
    }

    function onMarkerDragEnd(event) {
        logDragEvent('onDragEnd', event);
    }

     function handleChange(e) {
        const {name, type, value} = e.target;
        const val = type === 'number'
            ? parseFloat(value)
            : value;
        console.log({name, type, value})
        setForm({...form, [name]: val});
        console.log(e.target.value)
        console.log(form);
    }

    function showMarker(_marker) {
        const markerHasLocation = marker.latitude && marker.longitude;
        return markerHasLocation && <ShowMarker>
            <Marker
                longitude={_marker.longitude}
                latitude={_marker.latitude}
                draggable
                onDragStart={onMarkerDragStart}
                onDrag={onMarkerDrag}
                onDragEnd={onMarkerDragEnd}>
                <CityPin size={20}/>
            </Marker>
        </ShowMarker>
    }

    function update(cache, { data: { createLocation } }) {
        try {
            const data = cache.readQuery({query: ALL_LOCATIONS_QUERY});
            console.log(data);
            data.locations.push(createLocation);
            cache.writeQuery({query: ALL_LOCATIONS_QUERY, data});
        } catch (error) {
            console.error(error);
        }
    }

    function mutateForm() {
        return <Mutation
            mutation={CREATE_LOCATION_MUTATION}
            variables={form}
            update={update}>
            {(createLocation, {loading, error}) => (
                <Form
                    onSubmit={async e => {
                    e.preventDefault();
                    const res = await createLocation();
                    console.log(res);
                    Router.push({
                        pathname: '/admin/locations',
                        query: {
                            view: 'Map',
                            id: res.data.createLocation.id,
                            lat: form.latitude,
                            lon: form.longitude
                        }
                    })
                }}>
                    <Error error={error}/>
                    <fieldset disabled={loading} hasgrid={"true"} aria-busy={loading}>
                        <div className="fieldset_wrapper">
                            <div className="wrapper">
                                <label htmlFor="city">
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="City"
                                    required
                                    value={form.city}
                                    onChange={handleChange}/>
                            </div>
                            <div className="wrapper">
                                <label htmlFor="country">
                                    Country</label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    placeholder="Country"
                                    required
                                    value={form.country}
                                    onChange={handleChange}/>
                            </div>
                           
                            <div className="wrapper">
                                <label htmlFor="latitude">
                                    Latitude:
                                </label>
                                <input
                                    type="text"
                                    id="latitude"
                                    name="latitude"
                                    placeholder="0"
                                    disabled
                                    value={marker.latitude && parseFloat(marker.latitude).toFixed(4)}
                                    />

                            </div>
                            <div className="wrapper">
                                <label htmlFor="longitude">
                                    Longitude:
                                </label>

                                <input
                                    type="text"
                                    id="longitude"
                                    name="longitude"
                                    placeholder="0"
                                    disabled
                                    value={marker.longitude && parseFloat(marker.longitude).toFixed(4)}
                                    />
                            </div>
                            <div className="wrapper">
                                <label htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    type="number"
                                    id="description"
                                    name="description"
                                    placeholder="Enter a description"
                                    required
                                    value={form.description}
                                    onChange={handleChange}/>
                            </div>
                        </div>
                        <button type="submit">Submit</button>
                    </fieldset>
                </Form>
            )}
        </Mutation>;
    }

    function updateLocation(lngLat) {
        setMarker({
                latitude: lngLat[1],
                longitude: lngLat[0]
        });
    }

    function addMarker(e) {
        const {lngLat} = e;
        setMarker({
                latitude: '',
                longitude: ''
        });
        updateLocation(lngLat);
    }
    
    return (
    <CreateLocationMapStyle>
                <MapGL
                    viewport={{
                    ...viewport
                }}
                    onClick={addMarker}>
                    {showMarker(marker)}
                </MapGL>
                {mutateForm()}
    </CreateLocationMapStyle>);
}

export default CreateLocation;
export {CREATE_LOCATION_MUTATION};
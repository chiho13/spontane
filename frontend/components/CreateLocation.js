import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import {Marker} from 'react-map-gl';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';
import CityPin from './Icons/CityMarker';
import MapGL from './MapGL';
import ShowMarker from './styles/ShowMarker';

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
            latitude: $latitude
            longitude: $longitude
            description: $description
        ) {
            id
        }
    }
`;

class CreateLocation extends Component {
    state = {
        viewport: {
            height: '100vh',
            width: '100vw',
            latitude: 52.85,
            longitude: 34.9,
            zoom: 3
        },
        country: '',
        city: '',
        latitude: 0,
        longitude: 0,
        description: '',
        marker: {
            latitude: '',
            longitude: ''
        },
        events: {}
    }

    _onViewportChange = viewport => this.setState({
        viewport: {
            ...this.state.viewport,
            ...viewport
        }
    });

    _logDragEvent(name, event) {
        this.setState({
            events: {
                ...this.state.events,
                [name]: event.lngLat
            }
        })
    }

    _onMarkerDragStart = (event) => {
        this._logDragEvent('onDragStart', event);
    };

    _onMarkerDrag = (event) => {
        this._logDragEvent('onDrag', event);
        this.setState({
            marker: {
                longitude: event.lngLat[0],
                latitude: event.lngLat[1]
            }
        });
    };

    _onMarkerDragEnd = (event) => {
        this._logDragEvent('onDragEnd', event);
    };

    handleChange = (e) => {
        const {name, type, value} = e.target;
        const val = type === 'number'
            ? parseFloat(value)
            : value;
        console.log({name, type, value})
        this.setState({[name]: val})
        console.log(e.target.value)
    }

    showMarker = (marker) => {
        const markerHasLocation = this.state.marker.latitude && this.state.marker.longitude;
        return markerHasLocation && <ShowMarker><Marker
                longitude={marker.longitude}
                latitude={marker.latitude}
                draggable
                onDragStart={this._onMarkerDragStart}
                onDrag={this._onMarkerDrag}
                onDragEnd={this._onMarkerDragEnd}>
                <CityPin size={20}/>
             </Marker>
        </ShowMarker>
    }

    mutateForm = () => (
        <Mutation mutation={CREATE_LOCATION_MUTATION} variables={this.state}>
            {(createLocation, {loading, error}) => (
                <Form
                    onSubmit={async e => {
                    e.preventDefault();
                    const res = await createLocation();
                    console.log(res);
                    Router.push({
                        pathname: '/locations',
                        query: {
                            id: res.data.createLocation.id,
                            lat: this.state.latitude,
                            lon: this.state.longitude
                        }
                    })
                }}>
                    <Error error={error}/>
                    <fieldset disabled={loading} aria-busy={loading}>
                        <label htmlFor="country">
                            Country</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                placeholder="Country"
                                required
                                value={this.state.country}
                                onChange={this.handleChange}/>
                        
                        <label htmlFor="city">
                            City </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                placeholder="City"
                                required
                                value={this.state.city}
                                onChange={this.handleChange}/>
                       
                        <label htmlFor="latitude">
                            Latitude </label>
                            <input
                                type="number"
                                id="latitude"
                                name="latitude"
                                placeholder="Latitude"
                                required
                                value={this.state.marker.latitude}
                                onChange={this.handleChange}/>
                        <label htmlFor="longitude">
                            Longitude </label>
                            <input
                                type="number"
                                id="longitude"
                                name="longitude"
                                placeholder="Longitude"
                                required
                                value={this.state.marker.longitude}
                                onChange={this.handleChange}/>

                        <label htmlFor="description">
                            Description </label>
                            <textarea
                                type="number"
                                id="description"
                                name="description"
                                placeholder="Enter a description"
                                required
                                value={this.state.description}
                                onChange={this.handleChange}/>
                        <button type="submit">Submit</button>
                    </fieldset>
                </Form>
            )}
        </Mutation>
    )
    
    addMarker = (event) => {
        const { lngLat } = event;
        this.setState({
            marker: {latitude: '', longitude: ''}
        });
        this.setState({
            marker: {latitude: lngLat[1], longitude: lngLat[0]}
        });
    }

    render() {
        const {viewport, marker} = this.state;
        console.log(marker.latitude, marker.longitude);
        return (
            <div>
            <MapGL
                viewport={{
                ...viewport
            }}
                ref="changeViewport" onClick={this.addMarker}>
                {this.showMarker(marker)}
            </MapGL>
            {this.mutateForm()}
            </div>
        );
    }
}

export default CreateLocation;
export {CREATE_LOCATION_MUTATION};
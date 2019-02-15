import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import {Marker} from 'react-map-gl';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';
import CityPin from './Icons/CityMarker';
import MapGL from './MapGL';

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
            latitude: 54.9777,
            longitude: -1.6376,
            zoom: 2
        },
        country: '',
        city: '',
        latitude: 0,
        longitude: 0,
        description: '',
        marker: {
            latitude: 54.9777,
            longitude: -1.6376,
          },
          events: {}
    }

    _onViewportChange = viewport => this.setState({
        viewport: {...this.state.viewport, ...viewport}
    });

    _logDragEvent(name, event) {
        this.setState({
          events: {
            ...this.state.events,
            [name]: event.lngLat,
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
              latitude: event.lngLat[1],
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
                                Country
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    placeholder="Country"
                                    required
                                    value={this.state.country}
                                    onChange={this.handleChange}/>
                            </label>
                            <label htmlFor="city">
                                City
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="City"
                                    required
                                    value={this.state.city}
                                    onChange={this.handleChange}/>
                            </label>
                            <label htmlFor="latitude">
                                Latitude
                                <input
                                    type="number"
                                    id="latitude"
                                    name="latitude"
                                    placeholder="Latitude"
                                    required
                                    value={this.state.marker.latitude}
                                    onChange={this.handleChange}/>
                            </label>
                            <label htmlFor="longitude">
                                Longitude
                                <input
                                    type="number"
                                    id="longitude"
                                    name="longitude"
                                    placeholder="Longitude"
                                    required
                                    value={this.state.marker.longitude}
                                    onChange={this.handleChange}/>
                            </label>
                            <label htmlFor="description">
                                Description
                                <textarea
                                    type="number"
                                    id="description"
                                    name="description"
                                    placeholder="Enter a description"
                                    required
                                    value={this.state.description}
                                    onChange={this.handleChange}/>
                            </label>
                            <button type="submit">Submit</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
    )


    render() {
        const {viewport, marker} = this.state;
        console.log(marker.latitude, marker.longitude);
        return (
            <MapGL
            viewport={{...viewport}} ref="changeViewport">
            {this.mutateForm()}
            <Marker 
                longitude={marker.longitude}
                latitude={marker.latitude}
                draggable
                onDragStart={this._onMarkerDragStart}
                onDrag={this._onMarkerDrag}
                onDragEnd={this._onMarkerDragEnd} >
          <CityPin size={20} />
        </Marker>
        </MapGL>
        );
    }
}

export default CreateLocation;
export { CREATE_LOCATION_MUTATION };
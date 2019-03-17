import React, {Component} from 'react';
import {Mutation, Query} from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

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

class UpdateLocation extends Component {
    state = {}

    handleChange = (e) => {
        const {name, type, value} = e.target;
        const val = type === 'number'
            ? parseFloat(value)
            : value;
        console.log({name, type, value})
        this.setState({[name]: val})
        console.log(e.target.value)
    }

    updateLocation = async(e, updateLocationMutation) => {
        e.preventDefault();
        console.log('Updating item');
        console.log(this.state);

        const res = await updateLocationMutation({
            variables: {
                id: this.props.id,
                ...this.state
            }
        });

        console.log('Updated')
    }

    render() {
        return (
            <Query
                query={SINGLE_LOCATION_QUERY}
                variables={{
                id: this.props.id
            }}>
                {({data, loading}) => {
                    if (loading) 
                        return <p>Loading...</p>;
                    if (!data.location) 
                        return <p>No Item Found</p>
                    return (
                        <Mutation mutation={UPDATE_LOCATION_MUTATION} variables={this.state}>
                            {(updateLocation, {loading, error}) => (
                                <Form onSubmit={e => this.updateLocation(e, updateLocation)}>
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
                                                defaultValue={data.location.country}
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
                                                defaultValue={data.location.city}
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
                                                step="any"
                                                defaultValue={data.location.geoLocation.latitude}
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
                                                step="any"
                                                defaultValue={data.location.geoLocation.longitude}
                                                onChange={this.handleChange}/>
                                        </label>
                                        <label htmlFor="description">
                                            Description
                                            <textarea
                                                type="number"
                                                id="description"
                                                name="description"
                                                placeholder="Enter a description"
                                                defaultValue={data.location.description}
                                                onChange={this.handleChange}/>
                                        </label>
                                        <button type="submit">Sav{loading
                                                ? 'ing '
                                                : 'e '}
                                            Changes</button>
                                    </fieldset>
                                </Form>
                            )}
                        </Mutation>
                    )
                }}
            </Query>
        );
    }
}

export default UpdateLocation;
export {UPDATE_LOCATION_MUTATION};
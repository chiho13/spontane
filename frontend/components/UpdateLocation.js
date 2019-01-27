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
            latitude
            longitude
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
    ) {
        updateLocation(
            id: $id
            country: $country
            city: $city
            latitude: $latitude
            longitude: $longitude
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

    updateItem = async (e, updateLocationMutation) => {
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
                    if (loading) return <p>Loading...</p>;
                    if (!data.item) return <p>No Item Found</p>
                    return (
                        <Mutation mutation={UPDATE_LOCATION_MUTATION} variables={this.state}>
                            {(updateItem, {loading, error}) => (
                                <Form onSubmit={e => this.updateLocation(e, updateLocation)}>
                                    <Error error={error}/>
                                    <fieldset disabled={loading} aria-busy={loading}>
                                        <label htmlFor="title">
                                            Title
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                placeholder="Title"
                                                required
                                                defaultValue={data.location.title}
                                                onChange={this.handleChange}/>
                                        </label>
                                        <label htmlFor="price">
                                            Price
                                            <input
                                                type="number"
                                                id="price"
                                                name="price"
                                                placeholder="Price"
                                                required
                                                defaultValue={data.location.price}
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
                                                defaultValue={data.location.description}
                                                onChange={this.handleChange}/>
                                        </label>
                                        <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
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
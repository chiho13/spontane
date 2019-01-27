import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';

const CREATE_LOCATION_MUTATION = gql `
    mutation CREATE_LOCATION_MUTATION(
        $country: String!
        $city: String!
        $latitude: Float!
        $longitude: Float!
    ) {
        createLocation(
            country: $country
            city: $city
            latitude: $latitude
            longitude: $longitude
        ) {
            id
        }
    }
`;

class CreateLocation extends Component {
    state = {
        country: '',
        city: '',
        latitude: 0,
        longitude: 0
    }

    handleChange = (e) => {
        const {name, type, value} = e.target;
        const val = type === 'number'
            ? parseFloat(value)
            : value;
        console.log({name, type, value})
        this.setState({[name]: val})
        console.log(e.target.value)
    }

    render() {
        return (
            <Mutation mutation={CREATE_LOCATION_MUTATION} variables={this.state}>
                {(createLocation, {loading, error}) => (
                    <Form
                        onSubmit={async e => {
                        e.preventDefault();
                        const res = await createLocation();
                        console.log(res);
                        Router.push({
                            pathname: '/location',
                            query: {
                                id: res.data.createLocation.id
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

        );
    }
}

export default CreateLocation;
export { CREATE_LOCATION_MUTATION };
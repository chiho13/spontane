import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import styled from 'styled-components'

const CreateTourForm = styled(Form)`
    right: 0;
    left: 0;

    h2 {
        padding: 0;
    }
`;

const CreateTourStyle = styled.div `
    width: 100%;
`;

const CREATE_TOUR_MUTATION = gql `
    mutation CREATE_TOUR_MUTATION(
        $title: String!
    ) {
        createTour(
            title: $title
        ) {
            id
        }
    }
`;

class CreateTour extends Component {
    state = {
        title: ''
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
            <CreateTourStyle>
                <Mutation mutation={CREATE_TOUR_MUTATION} variables={this.state}>
                    {(createTour, {loading, error}) => (
                        <CreateTourForm
                            onSubmit={async e => {
                            e.preventDefault();
                            const res = await createTour();
                            console.log(res);
                            // Router.push({
                            //     pathname: '/myTour/collection',
                            //     query: {
                            //         id: res.data.createTour.id
                            //     }
                            // })
                        }}>
                            <Error error={error}/>
                            <h2>
                                Create a Tour</h2>
                            <fieldset disabled={loading} hasgrid={"true"} aria-busy={loading}>
                                <div className="fieldset_wrapper">
                                    <div className="wrapper">
                                        <label htmlFor="country">
                                            Tour title</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            placeholder="title"
                                            required
                                            value={this.state.title}
                                            onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <button type="submit">Submit</button>
                            </fieldset>
                        </CreateTourForm>
                    )}
                </Mutation>
            </CreateTourStyle>
        );
    }
}

export default CreateTour;
export {CREATE_TOUR_MUTATION};
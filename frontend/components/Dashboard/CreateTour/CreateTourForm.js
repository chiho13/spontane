import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../../styles/Form';
import Error from '../../ErrorMessage';
import styled, {ThemeProvider} from 'styled-components'
import Button from '../../UIKIT/iButton';
import useForm from '../../hooks/useForm';

import {invertTheme} from '../../Login';


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

function CreateTourForm() {
    const [form,
        handleChange] = useForm({title: ''});

    return <CreateTourStyle>
            <Mutation mutation={CREATE_TOUR_MUTATION} variables={form}>
                {(createTour, {loading, error}) => (
                    <Form top="0" right="0" width="100%" style={{height: '100%'}}
                        onSubmit={async e => {
                        e.preventDefault();
                        const res = await createTour();
                        console.log(res); 
                        // Router.push({ // pathname: '/myTour/collection', // query: { // id: res.data.createTour.id // } // }) 
                    }}>
                        <Error error={error}/>
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
                                        value={form.title}
                                        onChange={handleChange}/>
                                </div>
                            </div>
                            <ThemeProvider theme={invertTheme}>
                                <Button type="submit" width="auto">Submit</Button>
                            </ThemeProvider>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        </CreateTourStyle>

}

export default CreateTourForm;
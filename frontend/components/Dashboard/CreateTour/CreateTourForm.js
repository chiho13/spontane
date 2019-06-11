import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../../styles/Form';
import Error from '../../ErrorMessage';
import styled, {ThemeProvider} from 'styled-components'
import Button from '../../UIKIT/iButton';
import useForm from '../../hooks/useForm';

import {invertTheme} from '../../Login';

import  LocationColumnSelect from './LocationColumnSelect';


const CreateTourStyle = styled.div `
    width: 100%;
`;


const TourForm = styled(Form)`
    margin: 0;
    box-shadow: none;
    background-color: transparent;
    padding: 0;

    fieldset {
        margin: 0;
    }

    h2 {
        font-size: 1.1rem;
        font-family: 'Roboto';
        padding: 0;
        margin: 0;
        line-height: 2;
        text-align: left;
    }
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

function CreateTourForm(props) {
    const [form,
        handleChange] = useForm({title: ''});

    return <CreateTourStyle>
            <Mutation mutation={CREATE_TOUR_MUTATION} variables={form}>
                {(createTour, {loading, error}) => (
                    <TourForm top="0" right="0" width="100%" style={{height: '100%'}}
                        onSubmit={async e => {
                        e.preventDefault();
                        const res = await createTour();
                        console.log(res); 
                        // Router.push({ // pathname: '/myTour/collection', // query: { // id: res.data.createTour.id // } // }) 
                    }}>
                        <Error error={error}/>
                        <fieldset disabled={loading} hasgrid={"true"} aria-busy={loading}>

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
                                <div>
                                 <label>Drop your locations here</label>
                                    <LocationColumnSelect title="" listItems={props.listItems} column={props.column} />
                                </div>
                            <ThemeProvider theme={invertTheme}>
                                <Button type="submit" width="auto">Submit</Button>
                            </ThemeProvider>
                        </fieldset>
                    </TourForm>
                )}
            </Mutation>
        </CreateTourStyle>

}

export default CreateTourForm;
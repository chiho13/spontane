import React, { useState, useEffect, useContext, useRef } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import CreateLocationForm from './LocationForm';

import { CURRENT_USER_QUERY } from '../../hooks/useUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import { LocationEditorContext } from '../../providers/LocationEditorProvider';
import { UserContext } from '../../Layout/DashboardLayout';

toast.configure();

const CREATE_LOCATION_MUTATION = gql`
    mutation CREATE_LOCATION_MUTATION(
        $id: ID!
        $country: String!
        $city: String!
        $latitude: Float!
        $longitude: Float!
        $markerType: String!
        $pinColor: String!
        $description: String
        $user: String
    ) {
        updateProject(
            id: $id
            locations: {
                create: [{
                country: $country
            city: $city
            geoLocation: {
                create: {
                    latitude: $latitude
                    longitude: $longitude
                }
            }
            markerType: {
                create: {
                    type: $markerType
                    pinColor: $pinColor
                }
            }
            description: $description
            user: $user
            }]
            }
        ) {
            id
        }
    }
`;


function AddLocation(props) {
    const router = useRouter();
    const { user, refetch } = useContext(UserContext);

    const { form, handleChange} = useContext(LocationEditorContext);

    const { enableMarker } = props;

    const notify = () => toast.success("Location created!", {
        position: toast.POSITION.BOTTOM_CENTER,
        closeButton: false,
        className: css({ fontFamily: "nunito, sans-serif" })
    });

    const notifyError = (error) => toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        closeButton: false,
        className: css({ fontFamily: "nunito, sans-serif" })
    });

    async function onSubmit(e, updateProject) {
        e.preventDefault();
        const res = await updateProject({
            variables: {
                id: router.query.id,
                user: user.id,
                ...form
            }
        });

        if(res) {
            notify();
            refetch();
            enableMarker(false);
        }
    }

    return <Mutation mutation={CREATE_LOCATION_MUTATION} variables={form}>
        {(createLocation, { loading, error }) => (<CreateLocationForm
            form={form}
            notifyError={notifyError}
            defaultValue={form}
            mode="CREATE"
            handleChange={handleChange}
            loading={loading}
            onSubmit={e => onSubmit(e, createLocation)}
            error={error} />)}
    </Mutation>
}

export default AddLocation;
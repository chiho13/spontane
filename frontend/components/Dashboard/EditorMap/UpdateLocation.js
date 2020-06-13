import React, { useState, useEffect, useContext, useRef } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import UpdateLocationForm from './LocationForm';

import { CURRENT_USER_QUERY } from '../../hooks/useUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import { MapEditorContext } from '../../providers/MapEditorProvider';
import { UserContext } from '../../Layout/DashboardLayout';

toast.configure();

const UPDATE_LOCATION_MUTATION = gql `
    mutation UPDATE_LOCATION_MUTATION(
        $id: ID!
        $country: String
        $city: String
        $latitude: Float
        $longitude: Float
        $description: String
        $markerType: String
        $pinColor: String
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
            markerType: {
                update: {
                    type: $markerType
                    pinColor:  $pinColor
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


function UpdateLocation(props) {
    const router = useRouter();
    const { loading, refetch } = useContext(UserContext);

    const { form, setForm, handleChange, dropMarker, singleLocation, editLocation} = useContext(MapEditorContext);

    const { enableMarker } = props;

    const notify = () => toast.info("Location updated successfully!", {
        position: toast.POSITION.BOTTOM_CENTER,
        closeButton: false,
        className: css({ fontFamily: "nunito, sans-serif" })
    });


    async function updateForm(e, updateLocationMutation) {
        e.preventDefault();
        const res = await updateLocationMutation({
            variables: {
                id: singleLocation.id,
                ...form
            }
        });

        if(res) {
            refetch();
            notify();
            
            setTimeout(() => {
                enableMarker(false);
            }, 1000);

        }
    }

    return   <Mutation mutation={UPDATE_LOCATION_MUTATION} variables={form}>
    {(updateLocation, {loading, error}) => (<><UpdateLocationForm
        defaultValue={form}
        handleChange={handleChange}
        loading={loading}
        onSubmit={e => updateForm(e, updateLocation)}
        error={error}/>
        </>)}
</Mutation>
}

export default UpdateLocation;
import React, {useState, useEffect, useContext} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import CreateLocationForm from '../../LocationForm';
import {useQuery} from 'react-apollo-hooks';
import MapGL from '../../MapGL';
import CreateLocationMapStyle from './MapContainerStyle';
import DropMarker from '../DropMarker/DropMarker';

import useForm from '../../hooks/useForm';
import useMapMarker from '../../hooks/useMapMarker';
import {CURRENT_USER_QUERY} from '../../hooks/useUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';

import {UserContext} from '../../Layout/DashboardLayout';

toast.configure();


const SINGLE_PROJECT_QUERY = gql `
    query SINGLE_PROJECT_QUERY($projectID: ID!) {
        project(where: { id: $projectID }) {
            mapBounds
        }
    }
`;

const CREATE_LOCATION_MUTATION = gql `
    mutation CREATE_LOCATION_MUTATION(
        $id: ID!
        $country: String!
        $city: String!
        $latitude: Float!
        $longitude: Float!
        $description: String
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
            description: $description
            }]
            }
        ) {
            id
        }
    }
`;

function CreateLocation(props) {
    const router = useRouter();
    const [viewport,
        setViewport] = useState({height: '100vh', width: '100vw', latitude: 55.85, longitude: 20, zoom: 2});
    
    const {user} = useContext(UserContext);
    const [form,
        setForm,
        handleChange] = useForm({
            country: '',
            city: '',
            description:'',
            latitude: 0,
            longitude: 0
        });


    const {
        marker,
        addMarker,
        showMarker,
        onMarkerDragStart,
        onMarkerDrag,
        onMarkerDragEnd
    } = useMapMarker({latitude: 0, longitude: 0});


    const {data: singleProjectData, loading: projectLoading} = useQuery(SINGLE_PROJECT_QUERY, {
            variables: {
                projectID: router.query.id
            }
     });


     useEffect(() => {
        const {mapBounds} = singleProjectData;


            console.log(singleProjectData)

      }, [singleProjectData]);



    useEffect(() => {
        setForm({
            ...form,
            latitude: marker.latitude,
            longitude: marker.longitude
        });
    }, [marker]);

    const notify = () => toast.success("Location created!", {
        position: toast.POSITION.BOTTOM_CENTER,
        closeButton: false,
        className: css({ fontFamily: "nunito, sans-serif" })
    });

    async function onSubmit(e, updateProject) {
        e.preventDefault();
        const res = await updateProject({
            variables: {
                id: router.query.id,
                ...form
            }
        });

        notify();
    }

    return (
        <CreateLocationMapStyle>
            
            <MapGL
                viewport={{
                ...viewport
            }}
                onClick={addMarker}>
                {showMarker && <DropMarker
                    marker={marker}
                    onMarkerDragStart={onMarkerDragStart}
                    onMarkerDrag={onMarkerDrag}
                    onMarkerDragEnd={onMarkerDragEnd}/>}
            </MapGL>
            <h3>Click on map to drop a pin</h3>
            <Mutation mutation={CREATE_LOCATION_MUTATION} variables={form} refetchQueries={[{ query: CURRENT_USER_QUERY}]}>
                {(createLocation, {loading, error}) => (<CreateLocationForm
                    form={form}
                    defaultValue={form}
                    mode="CREATE"
                    marker={marker}
                    handleChange={handleChange}
                    loading={loading}
                    onSubmit={e => onSubmit(e, createLocation)}
                    error={error}/>)}
            </Mutation>
        </CreateLocationMapStyle>
    );
}

export default CreateLocation;
export {CREATE_LOCATION_MUTATION};
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import CreateLocationForm from '../../LocationForm';
import MapGL from '../../MapGL';
import CreateLocationMapStyle from './MapContainerStyle';
import DropMarker from '../DropMarker/DropMarker';
import { WebMercatorViewport } from 'react-map-gl';
import useForm from '../../hooks/useForm';
import useMapMarker from '../../hooks/useMapMarker';
import { CURRENT_USER_QUERY } from '../../hooks/useUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import { ViewPortContext } from '../../providers/MapProvider';
import useDimensions from 'react-use-dimensions';

import { UserContext } from '../../Layout/DashboardLayout';
import Toolbar from '../Toolbar';
import Layers from '../Layers';

toast.configure();

const CREATE_LOCATION_MUTATION = gql`
    mutation CREATE_LOCATION_MUTATION(
        $id: ID!
        $country: String!
        $city: String!
        $latitude: Float!
        $longitude: Float!
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
            description: $description
            user: $user
            }]
            }
        ) {
            id
        }
    }
`;

function CreateLocation(props) {
    const router = useRouter();
    const { viewport, setViewport, mapConfig } = useContext(ViewPortContext);
    const [maxBounds, setMaxBounds] = useState(null)
    const { user } = useContext(UserContext);

    const [dropMarker, setDropMarker] = useState(false);
    const [layerOpen, setLayerOpen] = useState(false);
    const [form,
        setForm,
        handleChange] = useForm({
            country: '',
            city: '',
            description: '',
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
    } = useMapMarker({ latitude: 0, longitude: 0 });

    useEffect(() => {
        setForm({
            ...form,
            latitude: marker.latitude,
            longitude: marker.longitude
        });
    }, [marker]);

    const mapRef = useRef(null);

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
                user: user.id,
                ...form
            }
        });

        notify();
    }

    function enableMarker(bool) {
        setDropMarker(bool);

        setLayerOpen(true);
    }

    function showLayerPanel() {
        setLayerOpen(!layerOpen);

        if(layerOpen == true) {
            setDropMarker(false);
        }
    }

    return (
        <CreateLocationMapStyle>
            
            <div className="map_container">
                <MapGL ref={mapRef}
                    onClick={dropMarker ? addMarker : null}
                >
                    {showMarker && <DropMarker
                        marker={marker}
                        onMarkerDragStart={onMarkerDragStart}
                        onMarkerDrag={onMarkerDrag}
                        onMarkerDragEnd={onMarkerDragEnd} />}
                </MapGL>
                <Toolbar dropMarker={dropMarker} enableMarker={enableMarker} layerOpen={layerOpen} showLayerPanel={showLayerPanel}/>
                {/* <h3>Click on map to drop a pin</h3> */}
            </div>
            <Layers layerOpen={layerOpen}>
            <Mutation mutation={CREATE_LOCATION_MUTATION} variables={form} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
                {(createLocation, { loading, error }) => (<CreateLocationForm
                    form={form}
                    defaultValue={form}
                    mode="CREATE"
                    marker={marker}
                    dropMarker={dropMarker}
                    handleChange={handleChange}
                    loading={loading}
                    onSubmit={e => onSubmit(e, createLocation)}
                    error={error} />)}
            </Mutation>
            </Layers>
        </CreateLocationMapStyle>
    );
}

export default CreateLocation;
export { CREATE_LOCATION_MUTATION };
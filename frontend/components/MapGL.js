import MapGL, {FlyToInterpolator} from 'react-map-gl';
import React, {useEffect, useContext} from 'react';
import useViewPort from './hooks/useViewPort';
import {ViewPortContext} from './providers/MapProvider';
import IconButton from '@material-ui/core/IconButton';
import MaterialIcon from '@material/react-material-icon';
import styled from 'styled-components';
import { easeCubic } from 'd3-ease';

export const TOKEN = 'pk.eyJ1IjoiYW50aG9ueWhvZGVzdSIsImEiOiJjanI2aWdmMmYxNXB2NDN0ZzJnd3FsMHg3In0.SejE2ZJApZ0Rg5UTsK7kPw';

const IconButtonStyle = styled(IconButton)`
    && {
        background-color: ${props => props.theme.white};
        border: 1px solid ${props => props.theme.grey};
        color: ${props => props.theme.black};
        padding:8px;
        position: absolute;
        bottom: 8px;
        right: 8px; 

        &:hover {
            background-color: ${props => props.theme.lightgrey};
        }
    }
`;

function Maps(props) {
    const {viewport, onViewportChange, mapConfig} = useContext(ViewPortContext);

        function reCenter() {
            onViewportChange({
                latitude: mapConfig.originalLat,
                longitude: mapConfig.originalLng,
                zoom: mapConfig.minZoom,
                transitionInterpolator: new FlyToInterpolator(),
                transitionDuration: 500,
                transitionEasing: easeCubic
            });
        }

        return (
            <MapGL {...props} {...viewport} minZoom={mapConfig.minZoom} id="mapGL" width="100%" height="100%" mapStyle={mapConfig.mapStyle} mapboxApiAccessToken={TOKEN} onViewportChange={onViewportChange} 
            attributionControl={false}
            >
            {props.children}
            <IconButtonStyle onClick={reCenter}><MaterialIcon icon="home"/></IconButtonStyle>
        </MapGL>
        );
}

export default Maps
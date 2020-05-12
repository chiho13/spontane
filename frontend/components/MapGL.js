import MapGL from 'react-map-gl';
import React, {useEffect, useContext} from 'react';
import useViewPort from './hooks/useViewPort';
import {ViewPortContext} from './providers/MapProvider';

export const TOKEN = 'pk.eyJ1IjoiYW50aG9ueWhvZGVzdSIsImEiOiJjanI2aWdmMmYxNXB2NDN0ZzJnd3FsMHg3In0.SejE2ZJApZ0Rg5UTsK7kPw';

function Maps(props) {
    const {viewport, onViewportChange, mapConfig} = useContext(ViewPortContext);

        return (
            <MapGL {...props} {...viewport} minZoom={mapConfig.minZoom} id="mapGL" width="100%" height="100%" mapStyle={mapConfig.mapStyle} mapboxApiAccessToken={TOKEN} onViewportChange={onViewportChange} 
            attributionControl={false}
            >
            {props.children}
        </MapGL>
        );
}

export default Maps
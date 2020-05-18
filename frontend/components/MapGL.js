import MapGL from 'react-map-gl';
import React, {useContext} from 'react';
import dynamic from 'next/dynamic';
import {ViewPortContext} from './providers/MapProvider';

export const TOKEN = 'pk.eyJ1IjoiYW50aG9ueWhvZGVzdSIsImEiOiJjanI2aWdmMmYxNXB2NDN0ZzJnd3FsMHg3In0.SejE2ZJApZ0Rg5UTsK7kPw';

const Maps = React.forwardRef((props, ref) => {
    const {viewport, onViewportChange, mapConfig} = useContext(ViewPortContext);
        return (
            <MapGL ref={ref} {...props} {...viewport} minZoom={mapConfig.minZoom} id="mapGL" width="100%" height="100%" mapStyle={mapConfig.mapStyle} mapboxApiAccessToken={TOKEN} onViewportChange={onViewportChange} 
            attributionControl={false}
            >
            {props.children}
          
        </MapGL>
        );
});

export default Maps;
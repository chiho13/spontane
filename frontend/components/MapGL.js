import MapGL from 'react-map-gl';
import React, {useEffect, useContext} from 'react';
import useViewPort from './hooks/useViewPort';
import {ViewPortContext} from './providers/MapProvider';

export const TOKEN = 'pk.eyJ1IjoiYW50aG9ueWhvZGVzdSIsImEiOiJjanI2aWdmMmYxNXB2NDN0ZzJnd3FsMHg3In0.SejE2' +
        'ZJApZ0Rg5UTsK7kPw';

function Maps(props) {
    const {viewport, onViewportChange} = useContext(ViewPortContext);

        return (
            <MapGL  {...props} {...viewport} width="100%" height="100%" mapStyle="mapbox://styles/anthonyhodesu/ck0y2dle1013q1cpk194xrvtu" mapboxApiAccessToken={TOKEN} onViewportChange={onViewportChange} 
           
            >
            {props.children}
        </MapGL>
        );
}

export default Maps
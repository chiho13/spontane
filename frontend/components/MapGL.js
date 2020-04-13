import MapGL from 'react-map-gl';
import React, {useEffect} from 'react';
import useViewPort from './hooks/useViewPort';

export const TOKEN = 'pk.eyJ1IjoiYW50aG9ueWhvZGVzdSIsImEiOiJjanI2aWdmMmYxNXB2NDN0ZzJnd3FsMHg3In0.SejE2' +
        'ZJApZ0Rg5UTsK7kPw';

function Maps(props) {
    const {viewport, onViewportChange } = useViewPort(props.viewport);

        return (
            <MapGL mapStyle="mapbox://styles/anthonyhodesu/ck0y2dle1013q1cpk194xrvtu"  {...props} {...viewport} width="100%" height="100%" mapboxApiAccessToken={TOKEN} onViewportChange={onViewportChange} 
           
            >
            {props.children}
        </MapGL>
        );
}

export default Maps
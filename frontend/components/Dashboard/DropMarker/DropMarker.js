import React from 'react';
import ShowMarker from './ShowMarker';
import CityPin from '../../Icons/CityMarker';
import {Marker} from 'react-map-gl';

function DropMarker(props) {
    const {marker: {
        latitude, longitude
    }, onMarkerDragStart, onMarkerDrag, onMarkerDragEnd} = props;
    return <ShowMarker>
        <Marker
            longitude={parseFloat(longitude)}
            latitude={parseFloat(latitude)}
            draggable
            onDragStart={onMarkerDragStart}
            onDrag={onMarkerDrag}
            onDragEnd={onMarkerDragEnd}>
            <CityPin size={20}/>
        </Marker>
    </ShowMarker>
}


export default DropMarker;
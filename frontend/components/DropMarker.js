import React, {useState, useEffect} from 'react';
import ShowMarker from './styles/ShowMarker';
import CityPin from './Icons/CityMarker';
import useMapMarker from './hooks/useMapMarker';

function DropMarker(props) {
    const {marker: {
        latitude, longitude
    }} = props;
    const markerHasLocation = latitude && longitude;
    return markerHasLocation && <ShowMarker>
        <Marker
            longitude={longitude}
            latitude={latitude}
            draggable
            onDragStart={onMarkerDragStart}
            onDrag={onMarkerDrag}
            onDragEnd={onMarkerDragEnd}>
            <CityPin size={20}/>
        </Marker>
    </ShowMarker>
}


export default DropMarker;
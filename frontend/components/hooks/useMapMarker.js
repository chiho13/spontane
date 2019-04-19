import React, {useState} from 'react';
import useMarker from './useMarker';
import ShowMarker from '../styles/ShowMarker';
import CityPin from '../Icons/CityMarker';
import {Marker} from 'react-map-gl';

function useDropMarker() {
    const [marker, setMarker] = useMarker();
    const [events, setEvents] = useState({});

    function updateLocation(lngLat) {
        setMarker({
                latitude: lngLat[1],
                longitude: lngLat[0]
        });
    }

    function logDragEvent(name, event) {
        setEvents({
                ...events,
                [name]: event.lngLat
        });
    }

    function onMarkerDragStart(event) {
        logDragEvent('onDragStart', event);
    }

    function onMarkerDrag(event) {
        const {lngLat} = event;
        logDragEvent('onDrag', event);
        updateLocation(lngLat);
    }

    function onMarkerDragEnd(event) {
        logDragEvent('onDragEnd', event);
    }

    function addMarker(e) {
        const {lngLat} = e;
        setMarker({
                latitude: '',
                longitude: ''
        });
        
        updateLocation(lngLat);
    }

    function showMarker(_marker) {
        const markerHasLocation = marker.latitude && marker.longitude;
        return markerHasLocation && <ShowMarker>
            <Marker
                longitude={_marker.longitude}
                latitude={_marker.latitude}
                draggable
                onDragStart={onMarkerDragStart}
                onDrag={onMarkerDrag}
                onDragEnd={onMarkerDragEnd}>
                <CityPin size={20}/>
            </Marker>
        </ShowMarker>
    }

    return [marker, addMarker, showMarker]

}

export default useDropMarker;
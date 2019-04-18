import React, {useState} from 'react';
import useMarker from './userMarker';

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

    return [marker, addMarker, onMarkerDragStart, onMarkerDrag, onMarkerDragEnd]

}

export default useDropMarker;
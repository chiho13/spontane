import React, {useState} from 'react';
import useMarker from './useMarker';

function useDropMarker(initialMarkerState) {
    const [marker, setMarker, updateLocation, addMarker, showMarker, setShowMarker] = useMarker(initialMarkerState);
    const [events, setEvents] = useState({});

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

    return {marker, setMarker, showMarker, setShowMarker, addMarker, onMarkerDragStart, onMarkerDrag, onMarkerDragEnd};

}

export default useDropMarker;
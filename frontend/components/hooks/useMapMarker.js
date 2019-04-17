import React, {useState} from 'react';
import useLocationForm from './useLocationForm';

function useDropMarker() {
    const [marker, setMarker] = useState({
        latitude: '',
        longitude: ''
    });
    const [events, setEvents] = useState({});
    const [form, setForm] = useLocationForm();

    function updateLocation(lngLat) {
        setMarker({
                latitude: lngLat[1],
                longitude: lngLat[0]
        });
        setForm({
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

    return [marker, addMarker, onMarkerDragStart, onMarkerDrag, onMarkerDragEnd,form]

}

export default useDropMarker;
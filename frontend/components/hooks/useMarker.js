import React, {useState} from 'react';

function useMarker() {
    const [marker, setMarker] = useState({
        latitude: '',
        longitude: ''
    });

    function updateLocation(lngLat) {
        setMarker({
                latitude: lngLat[1],
                longitude: lngLat[0]
        });
    }

    function addMarker(e) {
        const {lngLat} = e;
        setMarker({
                latitude: '',
                longitude: ''
        });
        
        updateLocation(lngLat);
    }

    return [marker, setMarker, updateLocation, addMarker];
}

export default useMarker;
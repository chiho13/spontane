import React, {useState} from 'react';

function useMarker() {
    const [marker, setMarker] = useState({
        latitude: 0,
        longitude: 0
    });

    const [showMarker, setShowMarker] = useState(false);

    function updateLocation(lngLat) {
        setMarker({
                latitude: lngLat[1],
                longitude: lngLat[0]
        });

        setShowMarker(true);
    }

    function addMarker(e) {
        const {lngLat} = e;
        setMarker({
                latitude: '',
                longitude: ''
        });

        setShowMarker(false);
        
        updateLocation(lngLat);
    }

    return [marker, setMarker, updateLocation, addMarker, showMarker];
}

export default useMarker;
import React, {useState} from 'react';

function useMarker(initialMarkerState) {
    const [marker, setMarker] = useState(initialMarkerState);

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
        
        updateLocation(lngLat);
    }

    return [marker, setMarker, updateLocation, addMarker, showMarker, setShowMarker];
}

export default useMarker;
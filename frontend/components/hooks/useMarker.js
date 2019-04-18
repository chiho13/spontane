import React, {useState} from 'react';

function useMarker() {
    const [marker, setMarker] = useState({
        latitude: '',
        longitude: ''
    });

    return [marker, setMarker];
}

export default useMarker;
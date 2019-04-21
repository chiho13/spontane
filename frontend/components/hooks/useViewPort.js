import React, {useState} from 'react';

function useViewPort(initialViewPortState) {
    const [viewport, setViewPort] = useState(initialViewPortState);

    return [viewport, setMarker]
}

export default useViewPort;
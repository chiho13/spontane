import React, {useState} from 'react';

function useViewPort(initialViewPortState) {
    const [viewport, setViewport] = useState(initialViewPortState);


    function onViewportChange(_viewport) {
        setViewport({
            ...viewport, ..._viewport
        })
    }


    return {viewport, setViewport, onViewportChange};
}

export default useViewPort;
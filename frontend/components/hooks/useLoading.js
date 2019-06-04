import React, {useState, useEffect} from 'react';

function useLoading(loading, error, initialState) {
    const [showLoading, setShowLoading] = useState(initialState);

    useEffect(() => {
        if(loading) {
            setShowLoading(true);
        }

        if(error) {
            setShowLoading(false);
        }
    });

    return [showLoading, setShowLoading];
}

export default useLoading;
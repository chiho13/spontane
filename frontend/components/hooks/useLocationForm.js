import React, {useState} from 'react';

function useLocationForm() {
    const [form, setForm] = useState({
        country: '',
        city: '',
        description:'',
        latitude: 0,
        longitude: 0
    });


    return [form, setForm];
}

export default useLocationForm;
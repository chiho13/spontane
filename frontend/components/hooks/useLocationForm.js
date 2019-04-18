import React, {useState} from 'react';

function useLocationForm() {
    const [form, setForm] = useState({
        country: '',
        city: '',
        description:'',
        latitude: 0,
        longitude: 0
    });

    function handleChange(e) {
        const {name, type, value} = e.target;
        const val = type === 'number'
            ? parseFloat(value)
            : value;
        setForm({...form, [name]: val});
        console.log(form);
    }


    return [form, setForm, handleChange];
}

export default useLocationForm;
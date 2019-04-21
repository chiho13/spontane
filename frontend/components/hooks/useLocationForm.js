import React, {useState} from 'react';

function useLocationForm(initialFormState) {
    const [form, setForm] = useState(initialFormState);

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
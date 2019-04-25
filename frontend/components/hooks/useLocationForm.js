import React, {useState, useEffect} from 'react';

function useLocationForm(initialFormState) {
    const [form, setForm] = useState(initialFormState);

    useEffect(() => {
        setForm({...form});
    });

    function handleChange(e) {
        const {name, type, value} = e.target;
        const val = type === 'number'
            ? parseFloat(value)
            : value;
        setForm({...form, [name]: val});
    }

    return [form, setForm, handleChange];
}

export default useLocationForm;
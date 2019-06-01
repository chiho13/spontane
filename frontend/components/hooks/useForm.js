import React, {useState, useEffect} from 'react';

function useForm(initialFormState) {
    const [form, setForm] = useState(initialFormState);

    useEffect(() => {
        setForm({...form});
    });

    function handleChange(e) {
        e.persist();
        const {name, type, value} = e.target;
        const val = type === 'number'
            ? parseFloat(value)
            : value;
        setForm(form => ({...form, [name]: val}));
    }

    return [form, setForm, handleChange];
}

export default useForm;
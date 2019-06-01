import {useState, useEffect} from 'react';

const useFormValidate = (callback, validate, values) => {
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [valid, setValid] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors]);

    const handleSubmit = (event, cb) => {
         event.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true)
    };

    return {handleSubmit, errors}
}

export default useFormValidate;
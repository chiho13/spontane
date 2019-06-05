import {useState, useEffect} from 'react';

function useFormValidate(callback, validate, values) {
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors]);

    const handleSubmit = (event) => {
         event.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    return {handleSubmit, errors}
}

export default useFormValidate;
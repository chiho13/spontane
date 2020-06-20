import {useState, useEffect} from 'react';

function useFormValidate(callback, validate, values) {
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callbackFunction() 
        }
    }, [errors]);

    async function callbackFunction() {
        const res = await callback();

        if(res) {
            setSuccess(true);
        }
    }

    const handleSubmit = (event) => {
         event.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    return {handleSubmit, errors, success}
}

export default useFormValidate;
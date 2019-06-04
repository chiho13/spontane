export default function validate(values) {
    let errors = {};
    if (!values.email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 3) {
        errors.password = 'Password must be 3 or more characters';
    }

    if(values.confirmPassword !== undefined && !values.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password'
    } else if( values.confirmPassword !== undefined && values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    if(values.name !== undefined && !values.name) {
        errors.name = 'Name is required';
    }

    return errors;
  };
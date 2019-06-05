export default function validate(values) {
    let errors = {};
   
    if ( values.email !== undefined && !values.email) {
      errors.email = 'Email address is required';
    } else if ( values.email !== undefined && !/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    if (values.password !== undefined && !values.password) {
        errors.password = 'Password is required';
    } else if (values.password !== undefined && values.password.length < 6) {
        errors.password = 'Password must be 6 or more characters';
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
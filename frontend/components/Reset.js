import React, {useEffect} from 'react';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Success from './SuccessMessage';
import Form from './styles/Form';
import Button from './UIKIT/iButton';
import styled, {ThemeProvider} from 'styled-components';
import PropTypes from 'prop-types';
import Router from 'next/router';

import validate from './helpers/AuthFormValidationsRules';
import useFormValidation from './hooks/useFormValidation';
import {useMutation} from './hooks/useMutation';
import useForm from './hooks/useForm';
import Head from 'next/head';
import Link from 'next/link';
import {invertTheme} from './Login';
import {CURRENT_USER_QUERY} from './hooks/useUser';
import useUser from './hooks/useUser';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      id
      email
      name
    }
  }
`;

const RequestResetStyles = styled.div `
    position: relative;
    top: 100px;
    max-width: 430px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 10px;

    h2 { 
        padding-top: 40px;
        padding-left: 0;
        text-align: center;
    }

    form {
        background: none;
        box-shadow: none;
        padding-top: 20px;
        padding-bottom: 40px;
        width: 90%;

        .form-group {
            margin-bottom: 20px;
        }
    }

    .panel_footer {
        display: block;
        font-size: 17px;
        color: #878797;
        padding: 20px;
        text-align: center;
        font-family: 'Roboto';
        background-color: #fff;
        border-top: 1px solid #ddd;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;

        span {
            text-decoration: underline;
            color: ${props => props.theme.brandColor}
        }
    }
`;

function Reset(props) {  

    const [form,
        setForm,
        handleChange] = useForm({password: '', confirmPassword: ''});

    const [reset, {loading, error, called}] = useMutation(RESET_MUTATION, { variables: {
        resetToken: props.resetToken,
        password: form.password,
        confirmPassword: form.password
    },
    refetchQueries: [
        {
            query: CURRENT_USER_QUERY
        }
    ]
});

    const {handleSubmit, errors} = useFormValidation(reset, validate, form);
    const {data: {
        me
    }} = useUser();

    useEffect(() => {
        if (me) {
            Router.push({pathname: '/admin'})
        }
    });

    useEffect(() => {
        if (called) {
            setForm({password: '', confirmPassword: ''});
        }
    });

    return (
        <RequestResetStyles>
            <Head>
                <title>Reset Password | Spontane</title>
            </Head>
            <h2>Reset your password</h2>
            <Form top="0" right="0" method="post" onSubmit={handleSubmit} noValidate>
                <fieldset>  
                    <Error error={error}/>
                    {!error && !loading && called && <Success message="Password is reset"/>}
                    <div className="form-group">
                    <label htmlFor="password">
                        Enter new password
                    </label>
                        <input
                            id="password"
                            className="form-input"
                            type="password"
                            name="password"
                            placeholder="password"
                            value={form.password}
                            className={errors.password && 'is-danger'}
                            onChange={handleChange}
                            required/> {errors.password && (
                            <p className="help is-danger">{errors.password}</p>
                        )}
                    </div>
                    <div className="form-group">
                    <label htmlFor="password">
                        Confirm new password
                    </label>
                        <input
                            id="confirmPassword"
                            className="form-input"
                            type="password"
                            name="confirmPassword"
                            placeholder="confirm password"
                            value={form.confirmPassword}
                            className={errors.confirmPassword && 'is-danger'}
                            onChange={handleChange}
                            required/> {errors.confirmPassword && (
                            <p className="help is-danger">{errors.confirmPassword}</p>
                        )}
                    </div>
                    <ThemeProvider theme={invertTheme}>
                        <Button type="submit" disableRipple>Reset Password</Button>
                    </ThemeProvider>
                </fieldset>
            </Form>
            <Link href="/login">
                <a className="panel_footer">
                    <span>Return to login</span>
                </a>
            </Link>
        </RequestResetStyles>
    )
}

export default Reset;

Reset.propTypes = {
    resetToken: PropTypes.string.isRequired
}
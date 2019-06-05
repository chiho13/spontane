import React, {useState, useEffect} from 'react';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Form from './styles/Form';
import Button from './UIKIT/iButton';
import styled, {ThemeProvider} from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import {CURRENT_USER_QUERY} from './hooks/useUser';
import useUser from './hooks/useUser';
import validate from './helpers/AuthFormValidationsRules';
import Head from 'next/head';
import Loading from './LoadingSpinner';

//custom hooks
import useForm from './hooks/useForm';
import useFormValidation from './hooks/useFormValidation';
import {useMutation} from './hooks/useMutation';
import useLoading from './hooks/useLoading';

//proptype

import Proptype from 'prop-types';

export const invertTheme = ({white, black}) => ({black: white, white: black, hoverColor: '#111'});

const brandTheme = ({white, black}) => ({black: white, white: 'linear-gradient(45deg,rgba(0,123,255,1) 0%,rgba(66,151,255,1) 100%)',
 hoverColor: 'linear-gradient(45deg, rgba(66,151,255,1) 0%, rgba(0,123,255,1) 100%)'});

const LOGIN_MUTATION = gql `
    mutation LOGIN_MUTATION($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            email
        }
    }
`;

export const loadingBrandTheme = ({white}) => ({brandColor: white});

const LoginStyles = styled.div `
    position: relative;
    top: 100px;
    max-width: 430px;
    margin: 0 auto;

    .container {
        background-color: #fff;
        border-radius: 10px;
    }

    h2 { 
        padding-top: 40px;
        padding-left: 0;
        text-align: center;
    }

    form {
        background: none;
        box-shadow: none;
        padding-top: 40px;
        padding-bottom: 40px;
        width: 90%;

        .form-group {
            margin-bottom: 20px;
        }
    }

    .resetpassword {
        display: block;
        text-align: center;
        font-family: 'Roboto';
        font-size: 0.9rem;
        margin-top: 0.5rem;
        color: rgba(255,255,255,0.8);
        text-decoration: underline;
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

function Login(props) {
    const [form,
        setForm,
        handleChange] = useForm({email: '', password: ''});

    const [enableButton, setEnableButton] = useState(true);

    const [login, {
            loading, error
        }
    ] = useMutation(LOGIN_MUTATION, {
        variables: {
            ...form
        },
        refetchQueries: [
            {
                query: CURRENT_USER_QUERY
            }
        ]
    });

    const {handleSubmit, errors} = useFormValidation(login, validate, form);
    const {data: {
            me
        }} = useUser();

    const [showLoading, setShowLoading] = useLoading(loading, error, false);

    useEffect(() => {
        if (!error && me && props.continue) {
            setShowLoading(true);
            Router.push({pathname: '/admin/locations'})
        }
    });

    useEffect(() => {
        if(form.email.length && form.password.length) {
            setEnableButton(false)
        }   else {
            setEnableButton(true)
        }
    });

    return (showLoading ? <Loading theme={loadingBrandTheme} /> : <LoginStyles>
          <Head>
             <title>Login | Spontane</title>
            </Head>
        <div className="container">
            <h2>{props.title}</h2>
            <Form top="0" right="0" method="post" onSubmit={handleSubmit} noValidate>
                <fieldset>
                    <Error error={error}/>
                    <div className="form-group">
                        <input
                            id="email"
                            type="text"
                            name="email"
                            placeholder="email"
                            value={form.email}
                            className={errors.email && 'is-danger'}
                            onChange={handleChange}
                            required/> {errors.email && (
                            <p className="help is-danger">{errors.email}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="password"
                            value={form.password}
                            onChange={handleChange}
                            className={errors.password && 'is-danger'}
                            required/> {errors.password && (   
                                <p className="help is-danger">{errors.password}</p>
                            )}
                    </div>
                    <ThemeProvider theme={brandTheme}>
                        <Button type="submit" disableRipple disabled={enableButton}>Log in</Button>
                    </ThemeProvider>
                </fieldset>
            </Form>

            <Link href="/signup">
                <a className="panel_footer">Don't have an account? &nbsp;
                    <span>Sign Up</span>
                </a>
            </Link>
        </div>
        <Link href="/resetpassword">
                <a className="resetpassword">Forgot your password?
                </a>
        </Link>
    </LoginStyles>)
}

export default Login;

Login.defaultProps = {
    title: "Log in to your account",
    continue: true
};

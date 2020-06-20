import React, {useEffect, useState} from 'react';

import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Form from './styles/Form';
import useForm from './hooks/useForm';
import Button from './UIKIT/iButton';
import styled, {ThemeProvider} from 'styled-components';
import Link from 'next/link';
import {CURRENT_USER_QUERY} from './hooks/useUser';
import validate from './helpers/AuthFormValidationsRules';

import {invertTheme} from './Login';
import Head from 'next/head';

import Router from 'next/router';
import Loading from './LoadingSpinner';
import {loadingBrandTheme} from './Login';

//custom hooks
import useUser from './hooks/useUser';
import useFormValidation from './hooks/useFormValidation';
import {useMutation} from './hooks/useMutation';
import useLoading from './hooks/useLoading';

const SIGNUP_MUTATION = gql `
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!, $confirmPassword: String!) {
        signup(email: $email, name: $name, password: $password, confirmPassword: $confirmPassword) {
            id
            email
            name
        }
    }
`;

const SignupStyles = styled.div `
    position: relative;
    margin-top: 80px;
    
    form {
        background-color: #fff;
    }

    .loginLink {
        font-family: 'nunito';
        text-align:center;
        margin-bottom: 20px;
        color: rgba(255,255,255,0.8);

        a {
            color: ${props => props.theme.black};
            padding: 0.5rem;
            margin-left: 1rem;
            background-color: rgba(255, 255, 255, 0.8);
            transition: background 0.2s ease;
            border-radius: 0.5rem;
            &:hover {
                background-color: rgba(255, 255, 255, 0.6);
            }
        }
    }
`;

function Signup() {
    const [form,
        setForm,
        handleChange] = useForm({email: '', name: '', password: '', confirmPassword: ''});

    const [enableButton,
        setEnableButton] = useState(true);

    const [signup, {
            loading, error
        }
    ] = useMutation(SIGNUP_MUTATION, {
        variables: {
            ...form
        },
        refetchQueries: [
            {
                query: CURRENT_USER_QUERY
            }
        ]
    });

    const [showLoading, setShowLoading] = useLoading(loading, error, false);

    const {handleSubmit, errors} = useFormValidation(signup, validate, form);
    const {data: {
            me
        }} = useUser();

    useEffect(() => {
        if (!error && me) {
            setShowLoading(true)
            Router.push({pathname: '/admin'});
        }
    });

    useEffect(() => {
        if (form.email.length && form.name.length && form.password.length && form.confirmPassword.length) {
            setEnableButton(false);
        } else {
            setEnableButton(true);
        }
    });

    return (
        showLoading ? <Loading theme={loadingBrandTheme}/> : <SignupStyles>
            <Head>
                <title>Sign Up | Spontane</title>
            </Head>
            <div className="loginLink">
                Already have an account?
                <Link href="/login">
                    <a>Log in</a>
                </Link>
            </div>

            <Form
                width="360px"
                top="0"
                right="0"
                method="post"
                onSubmit={handleSubmit}
                noValidate>
                <fieldset>
                    <h2>Sign up for an account</h2>
                    <Error error={error}/>
                    <label htmlFor="email">
                        Email address
                    </label>
                    <input
                        id="email"
                        className="form-input"
                        type="text"
                        name="email"
                        placeholder="email"
                        value={form.email}
                        onChange={handleChange}
                        className={errors.email ? 'form-input is-danger': 'form-input'}
                        required/> {errors.email && (
                        <p className="help is-danger">{errors.email}</p>
                    )}
                    <label htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        className="form-input"
                        type="text"
                        name="name"
                        placeholder="name"
                        value={form.name}
                        onChange={handleChange}
                        className={errors.name ? 'form-input is-danger' : 'form-input'}
                        required/> {errors.name && (
                        <p className="help is-danger">{errors.name}</p>
                    )}
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        className="form-input"
                        type="password"
                        name="password"
                        placeholder="password"
                        value={form.password}
                        onChange={handleChange}
                        minLength="6"
                        className={errors.password ? 'form-input is-danger' : 'form-input'}
                        required/> {errors.password && (
                        <p className="help is-danger">{errors.password}</p>
                    )}
                    <label htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        className="form-input"
                        type="password"
                        name="confirmPassword"
                        placeholder="confirm password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className={errors.confirmPassword ? 'form-input is-danger' : 'form-input'}
                        minLength="6"
                        required/> {errors.confirmPassword && (
                        <p className="help is-danger">{errors.confirmPassword}</p>
                    )}
                    <ThemeProvider theme={invertTheme}>
                        <Button type="submit" disableRipple disabled={enableButton}>Sign Up</Button>
                    </ThemeProvider>
                </fieldset>
            </Form>
        </SignupStyles>
    )
}

export default Signup;
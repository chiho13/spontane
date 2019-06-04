import React, {useState, useEffect} from 'react';
import {Mutation} from 'react-apollo';
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
import useFormValidation from './hooks/useFormValidation';
import {useMutation} from './hooks/useMutation';
import useForm from './hooks/useForm';

export const invertTheme = ({white, black}) => ({black: white, white: black, hoverColor: '#111'});

const LOGIN_MUTATION = gql `
    mutation LOGIN_MUTATION($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            email
        }
    }
`;

const LoginStyles = styled.div `
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
        padding-top: 40px;
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

function Login() {
    const [form,
        setForm,
        handleChange] = useForm({email: '', password: ''});

    const [login, {error}] = useMutation(LOGIN_MUTATION, {variables: {
            ...form
        }, refetchQueries: [{ query: CURRENT_USER_QUERY}]});
    const {handleSubmit, errors} = useFormValidation(login, validate, form);

    const {data: {
            me
        }, loading} = useUser();

    useEffect(() => {
        if (me) {
            Router.push({pathname: '/admin/locations'})
        }
        console.log(errors)
    });

    function handleChange(e) {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        });
    }
    
    return (!me && <LoginStyles>
        <h2>Log in to your account</h2>
        <Form
                    top="0"
                    right="0"
                    method="post"
                    onSubmit={handleSubmit} noValidate>
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
                                required/>
                        </div>
                        <ThemeProvider theme={invertTheme}>
                            <Button type="submit" disableRipple>Log in</Button>
                        </ThemeProvider>
                    </fieldset>
                </Form>

        <Link href="/signup">
            <a className="panel_footer">Don't have an account? &nbsp;
                <span>Sign Up</span>
            </a>
        </Link>
    </LoginStyles>)
}

export default Login;
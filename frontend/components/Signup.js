import React from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Form from './styles/Form';
import useForm from './hooks/useForm';
import Button from './UIKIT/iButton';
import styled, {ThemeProvider} from 'styled-components';
import Link from 'next/link';
import {CURRENT_USER_QUERY} from './hooks/useUser';
import validate from './helpers/AuthFormValidationsRules';
import useFormValidation from './hooks/useFormValidation';
import {useMutation} from './hooks/useMutation';
import {invertTheme} from './Login';

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
    margin-top: 40px;

    .loginLink {
        font-family: 'Roboto';
        text-align:center;
        margin-bottom: 20px;

        a {
            color: ${props => props.theme.brandColor};
            padding: 8px;
            margin-left: 5px;
            background-color: rgba(255, 255, 255, 0.6);
            transition: background 0.2s ease;
            border-radius: 8px;
            &:hover {
                background-color: rgba(255, 255, 255, 0.4);
            }
        }
    }
`;

function Signup() {
    const [form,
        setForm,
        handleChange] = useForm({email: '', name: '', password: '', confirmPassword: ''});

    const [signup, {error}] = useMutation(SIGNUP_MUTATION, {variables: {
            ...form
        }});
    const {handleSubmit, errors} = useFormValidation(signup, validate, form);
    
    return (
        <SignupStyles>
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
                        type="text"
                        name="email"
                        placeholder="email"
                        value={form.email}
                        onChange={handleChange}
                        className={errors.email && 'is-danger'}
                        required/> {errors.email && (
                        <p className="help is-danger">{errors.email}</p>
                    )}
                    <label htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="name"
                        value={form.name}
                        onChange={handleChange}
                        className={errors.name && 'is-danger'}
                        required/> {errors.name && (
                        <p className="help is-danger">{errors.name}</p>
                    )}
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="password"
                        value={form.password}
                        onChange={handleChange}
                        minLength="8"
                        className={errors.password && 'is-danger'}
                        required/> {errors.password && (
                        <p className="help is-danger">{errors.password}</p>
                    )}
                    <label htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        placeholder="confirm password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className={errors.confirmPassword && 'is-danger'}
                        minLength="8"
                        required/> {errors.confirmPassword && (
                            <p className="help is-danger">{errors.confirmPassword}</p>
                        )}
                    <ThemeProvider theme={invertTheme}>
                        <Button type="submit" disableRipple>Sign Up</Button>
                    </ThemeProvider>
                </fieldset>
            </Form>
        </SignupStyles>
    )
}

export default Signup;
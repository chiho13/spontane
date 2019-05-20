import React, {useState, useEffect} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Form from './styles/Form';
import Button from './UIKIT/iButton';
import styled, {ThemeProvider} from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import { CURRENT_USER_QUERY } from './hooks/useUser';
import useUser from './hooks/useUser';

const invertTheme = ({white, black}) => ({black: white, white: black, hoverColor: '#111'});

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

function Login() {
    const [form,
        setForm] = useState({email: '', password: ''});

  const {data: {me}} = useUser();
    
    useEffect(() => {
        if(me) {
            Router.push({
                pathname: '/admin/locations'
            })
        }
    });

    function handleChange(e) {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    }
    return (
        <LoginStyles>
            <div className="loginLink">
                Already have an account?
                <Link href="/login">
                    <a>Log in</a>
                </Link>
            </div>

            <Mutation 
            mutation={LOGIN_MUTATION} 
            variables={form}
            refetchQueries={[
                {query: CURRENT_USER_QUERY}
            ]}
            >
                {(login, {error, loading}) => {
                    return <Form width="360px" top="0" right="0" method="post" onSubmit={e => {
                        e.preventDefault();
                        login();
                    }}>
                        <fieldset disabled={loading}>
                            <h2>Log in to your account</h2>
                            <Error error={error}/>
                            <label htmlFor="email">
                                Email<sup className="required" title="required">*</sup>
                            </label>
                            <input
                                id="email"
                                type="text"
                                name="email"
                                placeholder="email"
                                value={form.email}
                                onChange={handleChange}
                                required/>

                            <label htmlFor="password">
                                Password<sup className="required" title="required">*</sup>
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="password"
                                value={form.password}
                                onChange={handleChange}
                                required/>
                            <ThemeProvider theme={invertTheme}>
                                <Button type="submit" disableRipple>Log in</Button>
                            </ThemeProvider>
                        </fieldset>
                    </Form>
                }}
            </Mutation>
        </LoginStyles>
    )
}

export default Login;
import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Error from '../ErrorMessage';
import Form from '../styles/Form';
import useForm from '../hooks/useForm';
import Button from '../UIKIT/iButton';
import styled, {ThemeProvider} from 'styled-components';
import Link from 'next/link';

const invertTheme = ({white, brandColor}) => ({black: white, white: brandColor, hoverColor: '#006fe6'});

const SignupStyles = styled.div`
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

function Signup() {
    const [form,
        handleChange] = useForm({email: '', name: '', password: ''});

    return (
    <SignupStyles>
        <div className="loginLink">
            Already have an account? <Link href="/login"><a>Log in</a></Link>
        </div>
        <Form width="360px" top="0" right="0">
            <fieldset>
                <h2>Sign up for an account</h2>
                <div></div>
                <label htmlFor="email">
                    Email<sup className="required" title="required">*</sup>
                </label>
                <input
                    id="email"
                    type="text"
                    name="email"
                    placeholder="email"
                    value={form.email}
                    onChange={handleChange} required/>

                <label htmlFor="name">
                    Name<sup className="required" title="required">*</sup></label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="name"
                    value={form.name}
                    onChange={handleChange} required/>

                <label htmlFor="password">
                    Password<sup className="required" title="required">*</sup>
                </label>
                <input
                    id="password"
                    type="text"
                    name="password"
                    placeholder="password"
                    value={form.password}
                    onChange={handleChange} required/>
                <ThemeProvider theme={invertTheme}>
                    <Button type="submit" disableRipple>Sign Up</Button>
                </ThemeProvider>
            </fieldset>
        </Form>
        </SignupStyles>
    )
}

export default Signup;
import React, {useEffect} from 'react';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Success from './SuccessMessage';
import Form from './styles/Form';
import Button from './UIKIT/iButton';
import styled, {ThemeProvider} from 'styled-components';

import validate from './helpers/AuthFormValidationsRules';
import useFormValidation from './hooks/useFormValidation';
import {useMutation} from './hooks/useMutation';
import useForm from './hooks/useForm';

import Link from 'next/link';
import {invertTheme} from './Login';

const REQUEST_RESET_MUTATION = gql `
    mutation REQUEST_RESET_MUTATION($email: String!) {
        requestReset(email: $email) {
            message
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

function RequestReset() {
    const [form,
        setForm,
        handleChange] = useForm({email: ''});

    const [reset, {
            loading,
            error,
            called
        }
    ] = useMutation(REQUEST_RESET_MUTATION, {
        variables: {
            ...form
        }
    });
    const {handleSubmit, errors} = useFormValidation(reset, validate, form);

    useEffect(() => {
        if (called) {
            setForm({email: ''});
        }
    })

    function handleChange(e) {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        });
    }

    return (
        <RequestResetStyles>
            <h2>Forgotten your password?</h2>
            <Form top="0" right="0" method="post" onSubmit={handleSubmit} noValidate>
                <fieldset>
                    <Error error={error}/> {!error && !loading && called && <Success message="Check your email for a reset"/>}
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
                    <ThemeProvider theme={invertTheme}>
                        <Button type="submit" disableRipple>Request Reset</Button>
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

export default RequestReset;
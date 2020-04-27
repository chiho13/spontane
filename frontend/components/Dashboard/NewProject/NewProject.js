import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import styled from 'styled-components';
import useForm from '../../hooks/useForm';
import Form from '../../styles/Form';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import Button from '../../UIKIT/iButton';
import {ThemeProvider} from 'styled-components';
import Router from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';

toast.configure();

const invertTheme = ({white, brandColor}) => ({black: white, white: brandColor, hoverColor: '#1a88ff'});

const NewProjectStyle = styled(Dialog)`
    && {
        h2 {
            font-family: ${props => props.theme.boldFont};
            padding: 0;
            text-align: center;

        }

    }
`;

const ProjectForm = styled(Form)`
    && {
        width: 300px;
        top: 0;
        left: 0;
        box-shadow: none;
        margin: 0;
        padding-top: 0;
    }
`;

const CREATE_PROJECT_MUTATION = gql`
    mutation CREATE_PROJECT_MUTATION(
        $title: String!
    ) {
        createProject(
            title: $title
        ) {
            id
        }
    }
`;

function NewProject(props) {
    const { onClose, open } = props;
    const [form,
        setForm,
        handleChange] = useForm({
            title: ''
        });

    const handleClose = () => {
        onClose();
    };

    const notify = () => toast.success("New Project created!", {
        position: toast.POSITION.BOTTOM_CENTER,
        closeButton: false,
        className: css({ fontFamily: "nunito, sans-serif" })
    });

    async function submitProject(e, createProject) {
        e.preventDefault();
        
        const res = await createProject();
        
        notify();
        Router.push({
            pathname: `/admin/project/${res.data.createProject.id}`,
        });
    }

    return (
        <NewProjectStyle onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">New Project</DialogTitle>
            <Mutation mutation={CREATE_PROJECT_MUTATION} variables={form}>
                {(createProject, { loading, error }) => (<ProjectForm onSubmit={e => submitProject(e, createProject)}>
                    <fieldset>
                        <div className="fieldset_wrapper">
                            <div className="wrapper">
                                <label htmlFor="title">
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder=""
                                    required
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <ThemeProvider theme={invertTheme}>
                            <Button width="auto" disableRipple type="submit">Create</Button>
                        </ThemeProvider>
                    </fieldset>
                </ProjectForm>)}
            </Mutation>
        </NewProjectStyle>
    );
}

NewProject.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default NewProject;
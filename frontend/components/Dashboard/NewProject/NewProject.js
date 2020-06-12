import React, {useState, useEffect, useContext, useRef} from 'react';
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
import StepWizard from 'react-step-wizard';
import MapSetBounds from '../MapSetBounds';
import SetMapStyle from '../MapStyles';
import useLocalStorage from '../../hooks/useLocalStorage';
import {ViewPortContext} from '../../providers/MapProvider';
import MaterialIcon from '@material/react-material-icon';

toast.configure();

const invertWhite = ({white, black}) => ({black: white, white: black, hoverColor: '#1a88ff'});

const NewProjectStyle = styled(Dialog)`
    && {
    
        h2, h3 {
            font-family: ${props => props.theme.boldFont};
            padding: 0;
            text-align: center;
        }

        h3 {
            padding-top: 32px;
        }

        .step3_text {
            margin-top: 24px;
        }

        .navButtons {
            display: flex;
            width: 100%;
            justify-content: space-between;

            button {
                margin-top: 0;
                width: auto;
            }
        }

        .close_button {
            position: fixed;
            top: 12px;
            right: 12px;
            font-size: 36px;
            color: #aaaaaa;
            transition: color 0.3s ease;
            cursor: pointer;

            &:hover {
                color: ${props => props.theme.black};
            }
        }

        button {
            font-family: ${props => props.theme.fontFamily};
        }
    }
`;

const ProjectForm = styled(Form)`
    && {
        width: 100%;

        top: 0;
        left: 0;
        box-shadow: none;
        margin: 0 auto;
        padding-top: 0;
        max-width: 1000px;

        .next_button {
            width: auto;
        }
        
        .fieldset_wrapper .wrapper {
            grid-column: auto;
            max-width: 350px;
        }

        .button_wrapper {
            display: flex;
            align-items: center;
            margin-top: 16px;
        }

        .cancel-create {
            background: none;
            border: 0;
            font-family: ${props => props.theme.fontFamily};
            font-size: 16px;
            margin-left: 32px;
            cursor: pointer;

            &:focus {
                outline: none;
            }

            &:hover {
                text-decoration: underline;
            }
        }
    }
`;


const Content = styled.div`
    && {
        overflow: hidden;
    }
`;

const CREATE_PROJECT_MUTATION = gql`
    mutation CREATE_PROJECT_MUTATION(
        $title: String!
        $mapBounds: String
        $mapStyle: String
        $markerColor: String
    ) {
        createProject(
            title: $title
            mapBounds: $mapBounds
            mapStyle: $mapStyle
            markerColor: $markerColor
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
    
    const worldBoundary = '{"type":"Feature","properties":{"shape":"Rectangle"},"geometry":{"type":"Polygon","coordinates":[[[-184,84],[184,84],[184,-84],[-184,-84],[-184,84]]]}}'
    const [projectID, setProjectID] = useLocalStorage('projectID', null);
    const [instanceWiz, setInstance] = useState();
    const [feature, setFeature] = useState(worldBoundary);

    const {mapConfig} = useContext(ViewPortContext)

    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        console.log(mapConfig);
        setForm({...form, mapBounds: feature, mapStyle: mapConfig.mapStyle, markerColor: mapConfig.markerColor});
    }, [mapConfig, feature]);

    const notify = () => toast.success("New Project created!", {
        position: toast.POSITION.BOTTOM_CENTER,
        closeButton: false,
        className: css({ fontFamily: "nunito, sans-serif" })
    });

    async function submitProject(e, createProject) {
        e.preventDefault();
        
        const res = await createProject();
        
        notify();
        setProjectID(res.data.createProject.id);
        Router.push({
            pathname: `/admin/project/map/editor/${res.data.createProject.id}`,
        });
    }

    const initInstance = SW => setInstance({
        SW
    });
    

    return (
        <NewProjectStyle onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} scroll='body' fullScreen={true}>
            <MaterialIcon icon="close" className="close_button" onClick={handleClose}/>
            <Mutation mutation={CREATE_PROJECT_MUTATION} variables={form}>
                {(createProject, { loading, error }) => (<ProjectForm >

                    <Content>

                    <StepWizard
                    isHashEnabled
                    instance={initInstance}
                    onKeyDown={(e)=>{e.target.keyCode === 13 && e.preventDefault();}}
                    >

                    <StepOne handleChange={handleChange} form={form} onClose={handleClose}/>
                    <SetMapStyle />
                    <MapSetBounds setFeature={setFeature} defaultBoundary={worldBoundary} submitForm={e => {
                        submitProject(e, createProject)
                    }}/>
                    </StepWizard>
                    </Content>
                </ProjectForm>)}
            </Mutation>
        </NewProjectStyle>
                   
    );
}


function StepOne(props) {
    return <div>
         <DialogTitle id="simple-dialog-title">New Project</DialogTitle>
    <fieldset>
    <div className="fieldset_wrapper">
        <div className="wrapper">
            <label htmlFor="title">
                Project Name
            </label>
            <input
                 className="form-input"
                type="text"
                id="title"
                name="title"
                placeholder=""
                required
                onChange={props.handleChange} 
                />
        </div>
    </div>
    <div className="button_wrapper">

    <ThemeProvider theme={invertWhite}>
        <Button  type="button" disabled={!props.form.title.length} className="next_button" onClick={props.nextStep}>Next</Button>
    </ThemeProvider>
    <button type="button" className="cancel-create" onClick={props.onClose}>Cancel</button>
    </div>
</fieldset>
                </div> 
}

NewProject.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};


// const NewProject = () => {
//     return  <MapSetBounds />
// }

export default NewProject;
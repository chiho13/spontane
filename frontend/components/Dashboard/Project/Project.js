import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import MaterialIcon from '@material/react-material-icon';
import Button from '../../UIKIT/iButton';
import NewProject from '../NewProject/NewProject';
import { UserContext } from '../../Layout/DashboardLayout';
import LoadingSpinner from '../../LoadingSpinner';
import Router from "next/router";
import useLocalStorage from '../../hooks/useLocalStorage';
import Title from '../MainContentTitle';
import { useEffect } from 'react';

const ProjectStyle = styled.div`

    display: block;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;

    .flex-container {
        padding-left: 32px;
        display: flex;
   
        flex-wrap: wrap;
    }
    h4 {
        font-family: ${props => props.theme.fontFamily};
    }
`;

const AddProject = styled(Button)`
    && {
        width: auto;
        height:140px;
        min-width:140px;
        padding: 32px;
        margin-right: 32px;
        margin-top: 32px;
       
        
        .add_new_wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;

            .material-icons {
                font-size: 40px;
                color: ${props => props.theme.brandColor};
            }
        }
    p {
        margin-top: 8px;
        font-family: ${props => props.theme.boldFont};
    }

    &:hover {
        color: ${props => props.theme.brandColor};
        background-color: ${props => props.theme.white};
        transform: translate3d(0px, -4px, 0px);
    }
    }
`;

const ProjectButtons = styled(AddProject)`
    && {
        width: auto;
        padding: 32px;
        margin-top: 32px;
        background-color: ${props => props.theme.white};
        color: ${props => props.theme.black};

        &:hover {
            color: ${props => props.theme.black};
            box-shadow: 0 8px 6px rgba(0,0,0,0.1);
        }
    }
`;

const Project = () => {
    const [open, setOpen] = useState(false);
    const { user: projectData, loading, refetch } = useContext(UserContext);

    const [projectID, setProjectID] = useLocalStorage('projectID', null);


    console.log(projectID);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const goToProject = (projectId) => {

        setProjectID(projectId);

        Router.push({
            pathname: `/admin/project/map/editor/${projectId}`,
        });
    }


    if (loading) {
        return <LoadingSpinner />
    }

    return <ProjectStyle>
        <Title title="My Maps" />
        <div className="flex-container">


            <AddProject onClick={handleClickOpen}>
                <div className="add_new_wrapper">
                    <MaterialIcon icon="add_circle_outline" />
                    <p>New Project</p>
                </div>
            </AddProject>
            {projectData && projectData.projects.map((project, i) => {
                return <ProjectButtons key={i} onClick={() => goToProject(project.id)}>
                    <p>{project.title}</p>
                </ProjectButtons>
            }
            )}
            <NewProject open={open} onClose={handleClose} />
        </div>
    </ProjectStyle>
}


export default Project;
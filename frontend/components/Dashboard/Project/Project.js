import React,{useState, useContext} from 'react';
import styled from 'styled-components';
import MaterialIcon from '@material/react-material-icon';
import Button from '../../UIKIT/iButton';
import NewProject from '../NewProject/NewProject';
import {UserContext} from '../../Layout/ProjectsLayout';
import LoadingSpinner from '../../LoadingSpinner';
import Router from "next/router";

const ProjectStyle = styled.div`

    padding-left: 32px;
    display: flex;
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
        margin-top: 32px;
    }
`;

const ProjectButtons = styled(AddProject)`
    && {
        width: auto;
        height: auto;
        padding: 32px;
        margin-top: 32px;
        margin-left: 32px;
        background-color: ${props => props.theme.lightgrey};
    }
`;

const Project = () => {
    const [open, setOpen] = useState(false);
    const {user: projectData, loading, refetch} = useContext(UserContext);
    

    console.log(projectData);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const goToProject = (projectId) => {
        Router.push({
            pathname: `/admin/project/${projectId}`,
        });
      }

      if(loading) {
          return <LoadingSpinner />
      }

    return <ProjectStyle>
            <AddProject disableRipple onClick={handleClickOpen}>
                <MaterialIcon icon="add" />
                <p>Create Project</p>
            </AddProject>
            {projectData && projectData.projects.map(project => {
                return <ProjectButtons onClick={() => goToProject(project.id)}>
                          <p>{project.title}</p>
                </ProjectButtons>
            }
            )}
            <NewProject open={open} onClose={handleClose} />
    </ProjectStyle>
}


export default Project;
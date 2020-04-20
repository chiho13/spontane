import React,{useState, useContext} from 'react';
import styled from 'styled-components';
import MaterialIcon from '@material/react-material-icon';
import Button from '../../UIKIT/iButton';
import NewProject from '../NewProject/NewProject';
import {UserContext} from '../../Layout/DashboardLayout';
import LoadingSpinner from '../../LoadingSpinner';

const ProjectStyle = styled.div`

    padding-left: 32px;
    h4 {
        font-family: ${props => props.theme.fontFamily};
    }
`;


const AddProject = styled(Button)`
    && {
        width: auto;
        height: auto;
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

      if(loading) {
          return <LoadingSpinner />
      }

    return <ProjectStyle>
            <AddProject disableRipple onClick={handleClickOpen}>
                <MaterialIcon icon="add" />
                <p>Add Project</p>
            </AddProject>
            {projectData && projectData.projects.map(project => {
                return <ProjectButtons>
                          <p>{project.title}</p>
                </ProjectButtons>
            }
            )}
            <NewProject open={open} onClose={handleClose} />
    </ProjectStyle>
}


export default Project;
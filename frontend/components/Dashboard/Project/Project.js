import React from 'react';
import styled from 'styled-components';
import MaterialIcon from '@material/react-material-icon';
import Button from '../../UIKIT/iButton';

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

const Project = () => {
    return <ProjectStyle>
            <AddProject disableRipple>
                <MaterialIcon icon="add" />
                <p>Add Project</p>
            </AddProject>
    </ProjectStyle>
}


export default Project;
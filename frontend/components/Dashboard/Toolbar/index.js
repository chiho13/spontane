import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MaterialIcon from '@material/react-material-icon';
import styled from 'styled-components';

const ToolbarContainer = styled.div`
    display: block;
    padding:8px;
    position: absolute;
    top: 8px;
    left: 8px; 
`;


const IconButtonStyle = styled(IconButton)`
    && {
        background-color: ${props => props.theme.white};
        border: 1px solid ${props => props.theme.grey};
        color: ${props => props.theme.black};
       
        border-radius: 12px;

        &:hover {
            background-color: ${props => props.theme.lightgrey};
        }
    }
`;



function Toolbar() {
    return <ToolbarContainer>
        <IconButtonStyle>
            <MaterialIcon icon="add_location"/>
        </IconButtonStyle>
    </ToolbarContainer>
}

export default Toolbar;
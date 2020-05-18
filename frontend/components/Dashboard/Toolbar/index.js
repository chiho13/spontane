import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MaterialIcon from '@material/react-material-icon';
import styled, {keyframes} from 'styled-components';
import { fadeInRight, fadeOutRight} from 'react-animations';

const fadeInRightAnimation = keyframes`${fadeInRight}`;
const fadeOutRightAnimation = keyframes`${fadeOutRight}`;

const ToolbarContainer = styled.div`
    display: block;
    padding:8px;
    position: absolute;
    top: 8px;
    left: 8px; 
`;

const IconButtonContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    .cancel-button {
        display: flex;
        align-items: center;
        width: auto;
        height: auto;
        padding: 4px;
        background: rgba(0, 0, 0, 0.5);
        color: ${props => props.theme.white};
        font-size: 14px;
        font-family: ${props => props.theme.fontFamily};
        margin-left: -40px;
        transition: all 0.3s ease;
        visibility: hidden;
        cursor: pointer;

        &:focus {
            outline: none;
        }

        &:hover {
            background: rgba(0, 0, 0, 0.6);
        }
        &.selected {
            margin-left: 0;
            visibility: visible;
        }
    }
`;

const IconButtonStyle = styled(IconButton)`
    && {
        background-color: ${props => props.theme.white};
        border: 1px solid ${props => props.theme.grey};
        color: ${props => props.theme.brandColor};
       
        border-radius: 12px;

        &:hover {
            background-color: ${props => props.theme.lightgrey};
        }
    }
`;

function Toolbar(props) {
    const {enableMarker, dropMarker} = props;
    return <ToolbarContainer>
        <IconButtonContainer>
            <IconButtonStyle onClick={() => {
                enableMarker(true);
            }}>
                <MaterialIcon icon="add_location" />
            </IconButtonStyle>
            <button className={dropMarker ? 'cancel-button selected' : 'cancel-button'} onClick={() => {
                enableMarker(false);
            }}>Cancel</button>
        </IconButtonContainer>
    </ToolbarContainer>
}

export default Toolbar;
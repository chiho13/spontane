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
    right: 8px; 
`;

const IconButtonContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .cancel-button {
        position: absolute;
        display: flex;
        align-items: center;
        width: auto;
        height: auto;
        padding: 4px;
        background: rgba(0, 0, 0, 0.5);
        color: ${props => props.theme.white};
        font-size: 14px;
        font-family: ${props => props.theme.fontFamily};
        right: 0;
        transition: right 0.5s ease, opacity 0.3s ease;
        visibility: hidden;
        cursor: pointer;

        &:focus {
            outline: none;
        }

        &:hover {
            background: rgba(0, 0, 0, 0.6);
        }
        &.selected {
            right: 100%;
            visibility: visible;
        }

    }
`;

const IconButtonStyle = styled(IconButton)`
    && {
        background-color: ${props => props.theme.white};
        border: 1px solid ${props => props.theme.grey};
        color: ${props => props.theme.brandColor};
        padding: 10px;
        border-radius: 10px;

        &:hover {
            background-color: ${props => props.theme.lightgrey};
        }

        &.layer-button {
            color: ${props => props.selected ? props.theme.brandColor : props.theme.black};
        }
    }
`;

function Toolbar(props) {
    const {enableMarker, dropMarker, layerOpen, showLayerPanel} = props;
    return <ToolbarContainer>

        <IconButtonContainer>
            <IconButtonStyle onClick={() => {
                showLayerPanel();
            }} className="layer-button" selected={layerOpen}>
                  {!layerOpen && <MaterialIcon icon="chevron_left" />}
                <MaterialIcon icon="layers" />
                {layerOpen && <MaterialIcon icon="chevron_right" />}
            </IconButtonStyle>
        </IconButtonContainer>
        <IconButtonContainer>
            <button className={dropMarker ? 'cancel-button selected' : 'cancel-button'} onClick={() => {
                enableMarker(false);
            }}>Cancel</button>
            <IconButtonStyle onClick={() => {
                enableMarker(true);
            }}>
                <MaterialIcon icon="add_location" />
            </IconButtonStyle>
        </IconButtonContainer>
    </ToolbarContainer>
}

export default Toolbar;
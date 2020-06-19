import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MaterialIcon from '@material/react-material-icon';
import styled, {keyframes} from 'styled-components';
import { fadeInRight, fadeOutRight} from 'react-animations';
import AddLocationIcon from './addLocationIcon';

const fadeInRightAnimation = keyframes`${fadeInRight}`;
const fadeOutRightAnimation = keyframes`${fadeOutRight}`;

const ToolbarContainer = styled.div`
    display: block;
    position: absolute;
    top: 32px;
    right: 0; 
`;

const IconButtonContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    justify-content: flex-end;

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
        right: 50%;
        transition: right 0.5s ease, opacity 0.3s ease, background 0.3s ease;
        visibility: hidden;
        cursor: pointer;

        &:focus {
            outline: none;
        }

        &:hover {
            background: rgba(0, 0, 0, 0.5);
        }
        &.selected {
            right: 100%;
            visibility: visible;
        }

    }
`;

const InsertContainer = styled.div`
    margin-right: 12px;
    margin-top: 64px;
`;

const IconButtonStyle = styled(IconButton)`
    && {
        background-color: ${props => props.theme.white};
        border: 1px solid ${props => props.theme.grey};
        color: ${props => props.theme.black};
        padding: 8px;
        height: 50px;
        border-radius: 10px;

        &:hover {
            background-color: #f1f1f1;
        }

        &.layer-button {
            color: ${props => props.selected ? props.theme.brandColor : props.theme.black};
            width: 30px;
            border-radius: 0;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            z-index: 10;
            
            .material-icons {
                font-size: 32px;
            }
        }

        &.add-button {
            svg {
                fill: ${props => props.selected ? props.theme.brandColor : props.theme.black};
            }
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
                {layerOpen && <MaterialIcon icon="chevron_right" />}
            </IconButtonStyle>
        </IconButtonContainer>

        <InsertContainer>
            <IconButtonContainer>
                <button className={dropMarker ? 'cancel-button selected' : 'cancel-button'} onClick={() => {
                    enableMarker(false);
                }}>Cancel</button>
                <IconButtonStyle onClick={() => {
                    enableMarker(true);
                }} className="add-button" selected={layerOpen && dropMarker}>
                    {/* <MaterialIcon icon="add_location" /> */}

                    <AddLocationIcon />
                </IconButtonStyle>
            </IconButtonContainer>
        </InsertContainer>
    </ToolbarContainer>
}

export default Toolbar;
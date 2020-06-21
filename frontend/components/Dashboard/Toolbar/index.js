import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MaterialIcon from '@material/react-material-icon';
import styled, {keyframes} from 'styled-components';
import { fadeInRight, fadeOutRight} from 'react-animations';
import AddLocationIcon from './addLocationIcon';
import SquareIcon from './squareIcon';
import PolygonIcon from './polygonIcon';
import LinesIcon from './linesIcon';

const fadeInRightAnimation = keyframes`${fadeInRight}`;
const fadeOutRightAnimation = keyframes`${fadeOutRight}`;

const ToolbarContainer = styled.div`
    display: block;
    position: absolute;
    top: 40px;
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

const AddMarkerContainer = styled.div`
    margin-right: 12px;
    margin-top: 64px;
`;


const AddShapesContainer = styled.div`
    display: block;
    margin-right: 12px;
    margin-top: 32px;
`;

const IconShape = styled(IconButtonContainer)`
    display: block;
    margin-bottom: 0;

    &:first-child {
        button {
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            border-bottom: 0;
        }
    }

    &:last-child {
        button {
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }
    }
`;

const IconButtonStyle = styled(IconButton)`
    && {
        position: relative;
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

        .tooltip {
            display: flex;
            align-items: center;
            font-family: ${props => props.theme.boldFont};
            position: absolute;
            visibility: hidden;
            opacity: 0;
            font-size: 12px;
            background: #f1f1f1;
            border: 1px solid #aaaaaa;
            left: 49px;
            padding: 4px 8px;
            white-space:nowrap;
            min-width: 50px;
            height: 30px;
            transition: opacity 0.4s ease;
            z-index: 100;
            box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
        }

        &:hover .tooltip {
            visibility: visible;
            opacity: 1
        }

        &.add-button {
            svg {
                fill: ${props => props.selected ? props.theme.brandColor : props.theme.black};
            }
        }
    }
`;

const ShapeIconStyle = styled(IconButtonStyle)`
   && { 
        border-radius: 0;
        width: 50px;
   }
`;

function SelectShape() {
    const Shapes = [{
        tooltip: "Draw Lines",
        icon: LinesIcon
    },  
        {
            tooltip: "Draw a Rectangle",
            icon: SquareIcon
        },{
            tooltip: "Draw a Polygon",
            icon: PolygonIcon
        }
    ];

    return Shapes.map((el, i) => {
        const DynamicIcon = el.icon;
        return <IconShape key={i}>
                <ShapeIconStyle >
                    <DynamicIcon />
    <span className="tooltip"> {el.tooltip}</span>
                </ShapeIconStyle>
             </IconShape>
    })
    
}

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

        <AddMarkerContainer>
            <IconButtonContainer>
                <button className={dropMarker ? 'cancel-button selected' : 'cancel-button'} onClick={() => {
                    enableMarker(false);
                }}>Cancel</button>
                <IconButtonStyle onClick={() => {
                    enableMarker(true);
                }} className="add-button" selected={layerOpen && dropMarker}>
                    <AddLocationIcon />
                    <span className="tooltip"> Add a location marker</span>
                </IconButtonStyle>
            </IconButtonContainer>
        </AddMarkerContainer>
                
        <AddShapesContainer>
            <SelectShape />
        </AddShapesContainer>
    </ToolbarContainer>
}

export default Toolbar;
import React, { useEffect, useState, useContext, useRef} from 'react';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '../../UIKIT/ProfilePaperDropdown';
import MaterialIcon from '@material/react-material-icon';
import styled from 'styled-components';
import Button from '../../UIKIT/iButton';
import MenuItem from '../../UIKIT/MenuItem';
import {Markers} from '../../Icons/BaseMarker';
import BaseMarker from '../../Icons/BaseMarker';
import MenuList from '@material-ui/core/MenuList';

import {ViewPortContext} from '../../providers/MapProvider';
import { LocationEditorContext } from '../../providers/LocationEditorProvider';

const SelectMarkerPaper = styled(Paper)`
    && {
        position: absolute;
        left: 0;
        padding: 0;
        width: 180px;
        z-index: 10;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
        max-height: 250px;
        overflow: auto;
        .marker_text {
            margin-left: 8px;
        }

        span.dynamic-marker {
            transform: none !important; 
        }
    }
`;


const SelectMarkerButton = styled(Button)`
    && {
        height: 60px;
        padding-left: 8px;
        padding-right: 8px;
        
        > span {
            display: flex;
            justify-content: space-evenly;
        }

        &:hover {
            background: #ffffff;
            color: ${props => props.theme.brandColor};
        }

        &:hover svg {
            fill: ${props => props.theme.brandColor} !important;
        }
    }
`;

function CustomMarker(props) {

    const {form, setForm, dropMarker } = useContext(LocationEditorContext);
    const markerComponents = Object.keys(Markers);

    const {mapConfig} = useContext(ViewPortContext);
    const {editLocation} = useContext(LocationEditorContext)
    const [markerType, setMarkerType] = useState(form.markerType);

    useEffect(() => {
        setForm({
            ...form,
            markerType
        });

    }, [markerType, editLocation]);

    const buttonRef= useRef();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    function selectMarker(event, markerType) {
        setMarkerType(markerType);
        handleClose(event);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return  <div>
              <label>
                Choose Marker
            </label>
    <SelectMarkerButton
         id="marker-slider"
         aria-describedby={id} type="button" onClick={handleClick}
         ref={buttonRef}
        width="180px">
            <BaseMarker  markerType={markerType} pinColor="#444444" dropShadowColor="#ffffff" size={32} />
                    <span className="current_marker">{markerType}</span>
        <MaterialIcon icon="arrow_drop_down" />

    </SelectMarkerButton>
    <Popper id={id} open={open} anchorEl={anchorEl} transition placement="bottom-start">
        {({ TransitionProps }) => (
            <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                    transformOrigin: 'center top'
                }}>
                <SelectMarkerPaper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList aria-labelledby="marker-slider">
                        {markerComponents.map((type, i) => {
                            return <MenuItem key={i} onClick={(e) => selectMarker(e, type)}>
                                <BaseMarker  markerType={type} dropShadowColor="#ffffff" pinColor="#333333" size={28} disableTransform={true}/>
                        <span className="marker_text">{type}</span>
                            </MenuItem>
                            })}
                        </MenuList>
                    </ClickAwayListener>
                </SelectMarkerPaper>
            </Grow>
        )}
    </Popper>
</div>
}

export default CustomMarker;
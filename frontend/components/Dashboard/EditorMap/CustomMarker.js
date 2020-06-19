import React, { useEffect, useState, useContext } from 'react';
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
import { MapEditorContext } from '../../providers/MapEditorProvider';

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

    let anchorEl;

    const [open, setOpen] = useState(false);

    const {form, setForm, dropMarker} = props;
    const markerComponents = Object.keys(Markers);

    const {mapConfig} = useContext(ViewPortContext);
    const {editLocation} = useContext(MapEditorContext)
    const [markerType, setMarkerType] = useState(form.markerType);
    const [pinColor, setPinColor] = useState(form.pinColor);

    useEffect(() => {
        setForm({
            ...form,
            markerType
        });

        // if(!dropMarker) {
        //         setMarkerType('Default');
        // }
    }, [markerType, dropMarker]);

    useEffect(() => {
        if(editLocation) return;
        setForm({
            ...form
        });
    }, [dropMarker, mapConfig, editLocation]);

    function handleToggle() {
        setOpen(!open)
    }

    function selectMarker(event, markerType) {
        setMarkerType(markerType);
        handleClose(event);
    }

    function handleClose(event) {
        if (anchorEl.contains(event.target)) {
            return;
        }

        setOpen(false);
    }

    return  <div>
              <label>
                Choose Marker
            </label>
    <SelectMarkerButton
        buttonRef={node => {
            anchorEl = node;
        }}
        aria-owns={open
            ? 'menu-list-grow'
            : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        width="180px">
            <BaseMarker  markerType={markerType} pinColor="#444444" dropShadowColor="#ffffff" size={32} />
                    <span className="current_marker">{markerType}</span>
        <MaterialIcon icon="arrow_drop_down" />

    </SelectMarkerButton>
    <Popper open={open} anchorEl={anchorEl} transition disablePortal>
        {({ TransitionProps, placement }) => (
            <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                    transformOrigin: placement === 'bottom'
                        ? 'center top'
                        : 'center bottom'
                }}>
                <SelectMarkerPaper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList>
                        {markerComponents.map((type, i) => {
                            return <MenuItem key={i} onClick={(e) => selectMarker(e, type)}>
                                <BaseMarker  markerType={type} dropShadowColor="#ffffff" pinColor="#333333" size={28}/>
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
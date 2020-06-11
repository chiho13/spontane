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

const SelectMarkerPaper = styled(Paper)`
    && {
        position: absolute;
        left: 0;
        padding: 0;
        width: 200px;
        z-index: 10;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);

        .marker_text {
            margin-left: 8px;
        }
    }
`;

const SelectMarkerContainer = styled.div`
    display: block;
    width: 100%;
    padding-left: 32px;
    padding-right: 32px;
    padding-top: 16px;
    padding-bottom: 16px;
    border-bottom: 2px solid #cccccc;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);

    .current_marker {
        font-size: 16px;
        padding-left: 16px;
        padding-right: 16px;
    }

    svg {
            transform: none !important; 
    }
`;

const SelectMarkerButton = styled(Button)`
    && {
        height: 60px;

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

    const [markerType, setMarkerType] = useState('Default')
    useEffect(() => {
        setForm({
            ...form,
            markerType
        });
    }, [dropMarker, markerType]);
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

    return  <SelectMarkerContainer>
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
        disableRipple
        width="200px">
            <BaseMarker  markerType={markerType} pinColor="#333333" dropShadowColor="#ffffff"/>
            {/* <input
                        className="form-input"
                        type="text"
                        id="marker"
                        name="marker"
                        readOnly
                        value={form.markerType}
                    /> */}
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
                                <BaseMarker  markerType={type} pinColor="#333333" dropShadowColor="#ffffff"/>
                        <span class="marker_text">{type}</span>
                            </MenuItem>
                            })}
                        </MenuList>
                    </ClickAwayListener>
                </SelectMarkerPaper>
            </Grow>
        )}
    </Popper>
</SelectMarkerContainer>
}

export default CustomMarker;
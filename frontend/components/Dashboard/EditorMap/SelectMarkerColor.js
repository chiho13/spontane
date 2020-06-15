import React, { useEffect, useState, useContext } from 'react';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '../../UIKIT/ProfilePaperDropdown';
import MaterialIcon from '@material/react-material-icon';
import styled from 'styled-components';
import Button from '../../UIKIT/iButton';
import MenuItem from '../../UIKIT/MenuItem';
import { Markers } from '../../Icons/BaseMarker';
import BaseMarker from '../../Icons/BaseMarker';
import MenuList from '@material-ui/core/MenuList';

import { SketchPicker } from 'react-color';

import { ViewPortContext } from '../../providers/MapProvider';
import { MapEditorContext } from '../../providers/MapEditorProvider';

const SelectColorPaper = styled(Paper)`
    && {
        position: absolute;
        right: -100px;
        padding: 0;
        width: 200px;
        z-index: 10;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);

        .marker_text {
            margin-left: 8px;
        }
    }
`;


const SelectColorButton = styled(Button)`
    && {
        height: 60px;
        padding: 10px;

        &:hover {
            background: #ffffff;
        }

        .buttonSpan_container {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
    }

    .selectColor_swatch {
        width: 40px;
        height: 40px;
        margin-right: 16px;
        border-radius: 8px;
        border: 1px solid #aaaaaa;
    }
`;

function SelectMarkerColor(props) {

    let anchorEl;

    const [open, setOpen] = useState(false);

    const { form, setForm, dropMarker } = props;
    const markerComponents = Object.keys(Markers);

    const { mapConfig } = useContext(ViewPortContext);
    const { editLocation } = useContext(MapEditorContext)
    const [markerType, setMarkerType] = useState(form.markerType);
    const [pinColor, setPinColor] = useState(form.pinColor);


    useEffect(() => {
        setForm({
            ...form,
            markerType,
            pinColor
        });

        if (!dropMarker) {
            setMarkerType('Default');
        }
    }, [markerType, dropMarker, pinColor]);

    useEffect(() => {
        if (editLocation) return;
        setForm({
            ...form,
            pinColor: mapConfig.markerColor
        });
    }, [dropMarker, mapConfig, editLocation]);


    function handleToggle() {
        setOpen(!open)
    }

    function handleClose(event) {
        if (anchorEl.contains(event.target)) {
            return;
        }

        setOpen(false);
    }

     function handleChangeComplete(color) {
        setPinColor(color.hex);
     }

    return <div>
        <label>
            Select Color
            </label>
        <SelectColorButton
            buttonRef={node => {
                anchorEl = node;
            }}
            aria-owns={open
                ? 'menu-list-grow'
                : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            width="auto">

            <span className="buttonSpan_container">
                <div className="selectColor_swatch" style={
                    { backgroundColor: form.pinColor }
                }>
                </div>
                <MaterialIcon icon="arrow_drop_down" />
            </span>
        </SelectColorButton>
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
                <SelectColorPaper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <SketchPicker color={form.pinColor} onChangeComplete={handleChangeComplete} />
                    </ClickAwayListener>
                </SelectColorPaper>
            </Grow>
        )}
    </Popper>
    </div>
}

export default SelectMarkerColor;
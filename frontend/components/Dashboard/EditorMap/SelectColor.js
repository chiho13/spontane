import React, { useEffect, useState, useContext } from 'react';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '../../UIKIT/ProfilePaperDropdown';
import MaterialIcon from '@material/react-material-icon';
import styled from 'styled-components';
import Button from '../../UIKIT/iButton';


import { SketchPicker } from 'react-color';

import { ViewPortContext } from '../../providers/MapProvider';
import { LocationEditorContext } from '../../providers/LocationEditorProvider';

const SelectColorPaper = styled(Paper)`
    && {
        position: absolute;
        left: 0;
        padding: 0;
        width: 190px;
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

function SelectColor(props) {

    let anchorEl;

    const [open, setOpen] = useState(false);

    const { color, setColor} = props;

    const { mapConfig } = useContext(ViewPortContext);
    const { editLocation } = useContext(LocationEditorContext)

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
        setColor(color.hex);
     }

    return <>
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
                    { backgroundColor: color }
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
                        <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
                    </ClickAwayListener>
                </SelectColorPaper>
            </Grow>
        )}
    </Popper>
    </>
}

export default SelectColor;
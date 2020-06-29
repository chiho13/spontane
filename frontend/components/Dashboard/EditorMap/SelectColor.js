import React, { useEffect, useState, useContext } from 'react';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '../../UIKIT/ProfilePaperDropdown';
import MaterialIcon from '@material/react-material-icon';
import styled from 'styled-components';
import Button from '../../UIKIT/iButton';


import { SketchPicker } from 'react-color';


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

    const { color, setColor} = props;

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    function handleClose(event) {
        setAnchorEl(null)
    }

     function handleChangeComplete(color) {
        setColor(color.hex);
     }

    return <>
        <SelectColorButton
            aria-describedby={id} type="button" onClick={handleClick}
            width="auto">

            <span className="buttonSpan_container">
                <div className="selectColor_swatch" style={
                    { backgroundColor: color }
                }>
                </div>
                <MaterialIcon icon="arrow_drop_down" />
            </span>
        </SelectColorButton>
        <Popper id={id} open={open} anchorEl={anchorEl} transition placement="bottom-start">
        {({ TransitionProps }) => (
            <Grow
                {...TransitionProps}
                style={{
                    transformOrigin: 'center top'
                }}
            >
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
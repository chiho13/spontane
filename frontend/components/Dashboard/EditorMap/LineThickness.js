import React, { useEffect, useState, useContext } from 'react';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '../../UIKIT/ProfilePaperDropdown';
import MaterialIcon from '@material/react-material-icon';
import styled from 'styled-components';
import Button from '../../UIKIT/iButton';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '../../UIKIT/MenuItem';
import { ShapeEditorContext } from '../../providers/ShapeEditorProvider';

const SelectLineThicknessPaper = styled(Paper)`
    && {
        position: absolute;
        right: -70px;
        padding: 0;
        width: 190px;
        z-index: 10;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
        max-height: 200px;
        overflow: auto;

        .marker_text {
            margin-left: 8px;
        }
    }
`;

const SelectLineThicknessMenuItem = styled(MenuItem)`
    && {
        padding-top: 0;
        padding-bottom: 0
    }
`;


const SelectLineThicknessButton = styled(Button)`
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

        .material-icons {
            margin-left: 8px;
        }

    }
`;


function LineSVG(props) {
    const { strokeWidth } = props;
    const {form} = useContext(ShapeEditorContext);
    return <svg viewBox="0 0 80 4" height={30} width="100%">
        <line x1="0" y1="2" x2="80" y2="2" stroke="black" strokeDasharray={form.strokeDasharray} strokeWidth={strokeWidth}/>
    </svg>
}

LineSVG.defaultProps = {
    strokeWidth: 2
}

const LineThickness = [1, 2, 3, 4, 5];

function SelectLineThickness(props) {

    const { lineThickness, setLineThickness } = props;

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    function handleClose() {
        setAnchorEl(null)
    }

    function handleLineSelection(el) {
        setLineThickness(el);
        handleClose();
    }

    return <>
        <SelectLineThicknessButton
            aria-describedby={id} type="button" onClick={handleClick}
            width="auto">

            <span className="buttonSpan_container">
                {lineThickness + ' pt'}
                <MaterialIcon icon="arrow_drop_down" />
            </span>
        </SelectLineThicknessButton>
        <Popper id={id} open={open} anchorEl={anchorEl} transition placement="bottom">
            {({ TransitionProps }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin: 'center top'
                    }}
                >
                    <SelectLineThicknessPaper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList aria-labelledby={id}>
                                {LineThickness.map((el, i) => {
                                    return <SelectLineThicknessMenuItem key={i} onClick={() => handleLineSelection(el)}>
                                        <LineSVG strokeWidth={el} />
                                    </SelectLineThicknessMenuItem>
                                })}
                            </MenuList>
                        </ClickAwayListener>
                    </SelectLineThicknessPaper>
                </Grow>
            )}

        </Popper>
    </>
}

export default SelectLineThickness;
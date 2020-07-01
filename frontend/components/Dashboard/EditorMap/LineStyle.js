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


const SelectLineStylePaper = styled(Paper)`
    && {
        position: absolute;
        left: 0;
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

const SelectLineStyleMenuItem = styled(MenuItem)`
    && {
        padding-top: 0;
        padding-bottom: 0
    }
`;


const SelectLineStyleButton = styled(Button)`
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
    const { strokeDashArray, width} = props;
    return <svg viewBox="0 0 60 4" height={30} width={width}>
        <line x1="0" y1="2" x2="60" y2="2" stroke="black" strokeDasharray={strokeDashArray} />
    </svg>
}

LineSVG.defaultProps = {
    strokeDashArray: 'none',
    width: 80
}

const linestyles = ["none", "2 2", "1 4", "4 4", "5 5", "5 8", "6 2 2 2",  "6 6 2 6", "7 9", "10 10"
]

function SelectLineStyle(props) {

    const { lineDash, setLineDash } = props;

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
        setLineDash(el);
        handleClose();
    }

    return <>
        <SelectLineStyleButton
            aria-describedby={id} type="button" onClick={handleClick}
            width="auto">

            <span className="buttonSpan_container">
                <LineSVG strokeDashArray={lineDash} />
                <MaterialIcon icon="arrow_drop_down" />
            </span>
        </SelectLineStyleButton>
        <Popper id={id} open={open} anchorEl={anchorEl} transition placement="bottom-start">
            {({ TransitionProps }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin: 'center top'
                    }}
                >
                    <SelectLineStylePaper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList>
                                {linestyles.map((el, i) => {
                                    return <SelectLineStyleMenuItem key={i} onClick={() => handleLineSelection(el)}>
                                        <LineSVG strokeDashArray={el} width="100%"/>
                                    </SelectLineStyleMenuItem>
                                })}
                            </MenuList>
                        </ClickAwayListener>
                    </SelectLineStylePaper>
                </Grow>
            )}

        </Popper>
    </>
}

export default SelectLineStyle;
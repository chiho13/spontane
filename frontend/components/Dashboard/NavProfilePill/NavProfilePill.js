import React, { useState, useContext } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '../../UIKIT/ProfilePaperDropdown';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Button from '../../UIKIT/iButton';
import MaterialIcon from '@material/react-material-icon';
import Divider from '@material-ui/core/Divider';
import Logout from './Logout';
import { UserContext } from '../../Layout/DashboardLayout';
import styled from 'styled-components';
import MenuItem from '../../UIKIT/MenuItem';




const NavButton = styled(Button)`
    && {
        height: 60px;
        border-radius: 0;
    }
`;

const NavPaper = styled(Paper)`
    && {
        position: absolute;
        right: -151px;
        width: 200px;
        border-radius: 0;
    }
`;

function NavProfilePill(props) {

    let anchorEl;

    const [open,
        setOpen] = useState(false);

    const { user } = useContext(UserContext);

    function handleToggle() {
        setOpen(!open)
    }

    function handleClose(event) {
        if (anchorEl.contains(event.target)) {
            return;
        }

        setOpen(false);
    }

    return (
        <div>
            <NavButton
                buttonRef={node => {
                    anchorEl = node;
                }}
                aria-owns={open
                    ? 'menu-list-grow'
                    : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                disableRipple
                width="150px">
                {user && user.name}
                <MaterialIcon icon="arrow_drop_down" />

            </NavButton>
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
                        <NavPaper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList>
                                    <MenuItem>
                                        <MaterialIcon icon="settings" />
                                        Account Settings
                                    </MenuItem>
                                    <Logout handleClose={handleClose} />
                                </MenuList>
                            </ClickAwayListener>
                        </NavPaper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}

export default NavProfilePill;
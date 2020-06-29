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

    const { user } = useContext(UserContext);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    function handleClose(event) {
        setAnchorEl(null)
    }

    return (
        <div>
            <NavButton
                aria-describedby={id} 
                onClick={handleClick}
                disableRipple
                width="150px">
                {user && user.name}
                <MaterialIcon icon="keyboard_arrow_right" />

            </NavButton>
            <Popper id={id} open={open} anchorEl={anchorEl} transition placement="bottom-start">
                {({ TransitionProps }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: 'center top'
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
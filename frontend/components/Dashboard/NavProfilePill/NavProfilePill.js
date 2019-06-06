import React, {useState, useContext} from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '../../UIKIT/ProfilePaperDropdown';
import Popper from '@material-ui/core/Popper';
import MenuItem from '../../UIKIT/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ProfilePillStyle from './NavProfilePillStyle';
import NavButton from '../../UIKIT/iButton';
import MaterialIcon from '@material/react-material-icon';
import Divider from '@material-ui/core/Divider';
import Logout from './Logout';
import {UserContext} from '../../Layout/DashboardLayout';

function NavProfilePill() {

    let anchorEl;

    const [open,
        setOpen] = useState(false);

    const userId = useContext(UserContext);

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
        <ProfilePillStyle>
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
                {userId.name}
                <MaterialIcon icon="arrow_drop_down"/>

            </NavButton>
            <Popper open={open} anchorEl={anchorEl} transition disablePortal>
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        id="menu-list-grow"
                        style={{
                        transformOrigin: placement === 'bottom'
                            ? 'center top'
                            : 'center bottom'
                    }}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList>
                                    <MenuItem disableRipple onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem disableRipple onClick={handleClose}>My account</MenuItem>
                                    <Divider/>
                                    <Logout handleClose={handleClose}/>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </ProfilePillStyle>
    );
}

export default NavProfilePill;
import React, {Component} from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '../../UIKIT/ProfilePaperDropdown';
import Popper from '@material-ui/core/Popper';
import MenuItem from '../../UIKIT/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ProfilePillStyle from '../styles/NavProfilePillStyle';
import NavButton from '../../UIKIT/ProfileButton';
import MaterialIcon from '@material/react-material-icon';
import Divider from '@material-ui/core/Divider';

class NavProfilePill extends Component {
    state = {
        open: false
    };

    handleToggle = () => {
        this.setState(state => ({
            open: !state.open
        }));
    };

    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({open: false});
    };

    render() {
        const {open} = this.state;

        return (
            <ProfilePillStyle>
                <NavButton
                    buttonRef={node => {
                    this.anchorEl = node;
                }}
                    aria-owns={open
                    ? 'menu-list-grow'
                    : undefined}
                    aria-haspopup="true"
                    onClick={this.handleToggle}>
                    <div className="innerButton">
                    Anthony Ho
                    </div>
                    
                </NavButton>
                <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
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
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <MenuList>
                                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                        <Divider />
                                        <MenuItem onClick={this.handleClose}><MaterialIcon icon="exit_to_app" />Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </ProfilePillStyle>
        );
    }
}

export default NavProfilePill;
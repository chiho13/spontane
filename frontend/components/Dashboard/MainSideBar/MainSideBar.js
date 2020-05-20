import React, {Component} from 'react';
import MainSideBarStyle from './MainSideBarStyle';
import Row from '../../UIKIT/Row';
import MainSideBarItems from '../SideBarItems/SideBarItems';
import Logo from '../SideBarLogo/SideBarLogo';
import ProfileNav from '../NavProfilePill/NavProfilePill';

function MainSideBar(props) {
        return (
                <MainSideBarStyle>
                    <Logo />
                    {!props.hideList && <MainSideBarItems /> }
                    <ProfileNav />
                </MainSideBarStyle>
        );
}

export default MainSideBar;
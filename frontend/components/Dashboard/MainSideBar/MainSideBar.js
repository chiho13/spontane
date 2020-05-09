import React, {Component} from 'react';
import MainSideBarStyle from './MainSideBarStyle';
import Row from '../../UIKIT/Row';
import MainSideBarItems from '../SideBarItems/SideBarItems';
import Logo from '../SideBarLogo/SideBarLogo';

function  MainSideBar(props){
        return (
                <MainSideBarStyle>
                    <Logo />
                    <MainSideBarItems />
                </MainSideBarStyle>
        );
}

export default MainSideBar;
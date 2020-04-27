import React, {Component} from 'react';
import MainSideBarStyle from './MainSideBarStyle';
import Row from '../../UIKIT/Row';
import MainSideBarItems from '../SideBarItems/SideBarItems';
import Logo from '../SideBarLogo/SideBarLogo';
import Search from '../Searchbar/Searchbar';

function  MainSideBar(props){
        return (
            <Row>
                <MainSideBarStyle>
                    <Logo />
                    <Search />
                    <MainSideBarItems />
                </MainSideBarStyle>
            </Row>
        );
}

export default MainSideBar;
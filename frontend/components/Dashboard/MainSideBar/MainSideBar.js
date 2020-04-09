import React, {Component} from 'react';
import MainSideBarStyle from './MainSideBarStyle';
import Row from '../../UIKIT/Row';
import MainSideBarItems from '../SideBarItems/SideBarItems';
import Logo from '../SideBarLogo/SideBarLogo';
import Search from '../Searchbar/Searchbar';

class MainSideBar extends Component {

    render() {
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
}

export default MainSideBar;
import React, {Component} from 'react';
import MainSideBarStyle from '../../styles/MainSideBarStyle';
import Row from '../../../UIKIT/Row';
import MainSideBarItems from './SideBarItems';
import Logo from './SideBarLogo'

class MainSideBar extends Component {

    render() {
        return (
            <Row>
                <MainSideBarStyle>
                    <Logo />
                    <MainSideBarItems />
                </MainSideBarStyle>
            </Row>
        );
    }
}

export default MainSideBar;
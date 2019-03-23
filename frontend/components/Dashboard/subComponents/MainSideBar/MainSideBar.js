import React, {Component} from 'react';
import MainSideBarStyle from '../../styles/MainSideBarStyle';
import Row from '../../../UIKIT/Row';
import MainSideBarItems from './SideBarItems';

class MainSideBar extends Component {

    render() {
        return (
            <Row>
                <MainSideBarStyle>
                    <MainSideBarItems />
                </MainSideBarStyle>
            </Row>
        );
    }
}

export default MainSideBar;
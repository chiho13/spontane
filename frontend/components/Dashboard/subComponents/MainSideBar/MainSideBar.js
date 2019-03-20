import React, { Component } from 'react';
import MainSideBarStyle from '../../styles/MainSideBarStyle';
import Link from 'next/link';

class MainSideBar extends Component {
    render() {
        return (
            <MainSideBarStyle>
                this is the main side bar
                <Link href="/admin/createTour"><a>Create Tour</a></Link>
            </MainSideBarStyle>
        );
    }
}

export default MainSideBar;
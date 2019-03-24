import React, { Component } from 'react';
import SideBarLogoSyle from '../../styles/SideBarLogoStyle';
import Logo from '../../../../components/Logo';
class SideBarLogo extends Component {
    render() {
        return (
            <SideBarLogoSyle>
                <div className="navbar-brand"> 
                   <Logo />
                </div>
            </SideBarLogoSyle>
        );
    }
}

export default SideBarLogo;
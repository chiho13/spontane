import React, { Component } from 'react';
import SideBarLogoSyle from './SideBarLogoStyle';
import Logo from '../../Logo';
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
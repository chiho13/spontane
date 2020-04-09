import React, { Component } from 'react';
import SideBarItemsStyle from './SideBarItemsStyle';
import SideBarItem from '../SideBarItem/SideBarItem';

const sideBarItems = [ {
    title: "My Locations",
    icon: "list",
    link: "/admin/locations/list"
},{
    title: "Add Location",
    icon: "add_location",
    link: "/admin/add-location"
}];

class SideBarItems extends Component {
    render() {
        return (
            <SideBarItemsStyle>
                    { sideBarItems.map((item, i) => (
                        <SideBarItem key={i} item={item}/>
                    ))}
            </SideBarItemsStyle>
        );
    }
}

export default SideBarItems;
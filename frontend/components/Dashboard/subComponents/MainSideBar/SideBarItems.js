import React, { Component } from 'react';
import SideBarItemsStyle from '../../styles/SideBarItemsStyle';
import SideBarItem from './SideBarItem';

const sideBarItems = [ {
    title: "Dashboard",
    icon: "bar_chart",
    link: "/admin"
}, {
    title: "My Tours",
    icon: "table_chart",
    link: "/admin/myTours"
}, {
    title: "Add New Tour",
    icon: "add_circle_outline",
    link: "/admin/createTour"
},{
    title: "My Locations",
    icon: "list",
    link: "/admin/locations"
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
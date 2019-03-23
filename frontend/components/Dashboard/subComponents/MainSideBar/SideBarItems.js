import React, { Component } from 'react';
import SideBarItemsStyle from '../../styles/SideBarItemsStyle';
import SideBarItem from './SideBarItem';
import {TableChart, BarChart, AccountCircle, AddCircleOutline} from  '@material-ui/icons';

const sideBarItems = [ {
    title: "Dashboard",
    icon: BarChart,
    link: "/admin"
}, {
    title: "My Tours",
    icon: TableChart,
    link: "/admin/myTours"
}, {
    title: "Add New Tour",
    icon: AddCircleOutline,
    link: "/admin/createTours"
}, {
    title: "User Profile",
    icon: AccountCircle,
    link: "/admin/profile"
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
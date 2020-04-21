import React, { useContext } from 'react';
import SideBarItemsStyle from './SideBarItemsStyle';
import SideBarItem from '../SideBarItem/SideBarItem';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';
import {UserContext} from '../../../components/Layout/DashboardLayout';

const ProjectSidebar = styled.div`
    margin-top: 32px;
`;

function SideBarItems() {
    const {projectId} = useContext(UserContext);

    const sideBarItems = [  {
        title: "List of Locations",
        icon: "list",
        link: "/admin/project/locations/list"
    },
        {
            title: "Add Location",
            icon: "add_location",
            link: "/admin/add-location"
        },
  
    ];
    return (
        <SideBarItemsStyle>
            <SideBarItem item={{
                title: "Back to Projects",
                icon: "folder_open",
                link: "/admin"
            }} />

            <Divider />

            <ProjectSidebar>
                {sideBarItems.map((item, i) => (
                    <SideBarItem key={i} item={item} />
                ))}
                </ProjectSidebar>
            <ProjectSidebar>
            
            <Divider />
                  <SideBarItem item={      {
            title: "Project Settings",
            icon: "settings",
            link: "/admin/project_settings"
        }} />
            </ProjectSidebar>
        </SideBarItemsStyle>
    );
};

export default SideBarItems;
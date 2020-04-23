import React, { useContext, useEffect, useState} from 'react';
import SideBarItemsStyle from './SideBarItemsStyle';
import SideBarItem from '../SideBarItem/SideBarItem';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';
import {UserContext} from '../../../components/Layout/DashboardLayout';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useRouter } from 'next/router';

const ProjectSidebar = styled.div`
    margin-top: 32px;
`;

function SideBarItems() {
    // const {projectId} = useContext(UserContext);

    const router = useRouter();
    const [projectID, setProjectID] = useLocalStorage('projectID', router.query.id);

    console.log('sidebar', projectID);

    const sidebaritems =  [   {
        title: "Project Dashboard",
        icon: "dashboard",
        link: `/admin/project/${projectID}`
    },{
        title: "List of Locations",
        icon: "list",
        link: `/admin/project/locations/list/${projectID}`
    },
        {
            title: "Add Location",
            icon: "add_location",
            link: `/admin/project/locations/add/${projectID}`
        },

    ]

    return (
        <SideBarItemsStyle>
            <SideBarItem item={{
                title: "Back to Projects",
                icon: "folder_open",
                link: "/admin"
            }} />

            <Divider />

            <ProjectSidebar>
                {
              sidebaritems.map((item, i) => (
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
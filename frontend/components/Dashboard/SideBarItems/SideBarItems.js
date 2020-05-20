import React, { useContext, useEffect, useState} from 'react';
import SideBarItemsStyle from './SideBarItemsStyle';
import SideBarItem from '../SideBarItem/SideBarItem';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';
import {UserContext} from '../../../components/Layout/DashboardLayout';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useRouter } from 'next/router';
import ProfileNav from '../NavProfilePill/NavProfilePill';

const ProjectSidebar = styled.div`
display: flex;
`;

function SideBarItems() {
    // const {projectId} = useContext(UserContext);

    const router = useRouter();
    const [projectID, setProjectID] = useLocalStorage('projectID', router.query.id);

    console.log('sidebar', projectID);

    const sidebaritems =  [   {
        title: "Project Dashboard",
        icon: "dashboard",
        link: "/admin/project/[id]",
        as: `/admin/project/${projectID}`
    },
    // {
    //     title: "List of Locations",
    //     icon: "list",
    //     link: `/admin/project/locations/list/[id]]`,
    //     as: `/admin/project/locations/list/${projectID}`
    // },
    {
        title: "Map Preview",
        icon: "map",
        link: `/admin/project/locations/map/[id]`,
        as: `/admin/project/locations/map/${projectID}`
    },
        {
            title: " Edit Map",
            icon: "add_location",
            link: `/admin/project/locations/add/[id]`,
            as: `/admin/project/locations/add/${projectID}`
        },

    ]

    return (
        <SideBarItemsStyle>
              <ProjectSidebar>

             
            <SideBarItem item={{
                title: "Back to Projects",
                icon: "folder_open",
                link: "/admin"
            }} />

                {
              sidebaritems.map((item, i) => (
                    <SideBarItem key={i} item={item} />
                ))}
                 </ProjectSidebar>
                <ProjectSidebar>
                  <SideBarItem item={      {
            title: "Project Settings",
            icon: "settings",
            link: "/admin/project_settings"
        }} />
         <ProfileNav />
          </ProjectSidebar>
        </SideBarItemsStyle>
    );
};

export default SideBarItems;
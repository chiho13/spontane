import React, { useContext, useEffect, useState} from 'react';
import SideBarItemsStyle from './SideBarItemsStyle';
import SideBarItem from '../SideBarItem/SideBarItem';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';
import {UserContext} from '../../../components/Layout/DashboardLayout';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useRouter } from 'next/router';


const ProjectSidebar = styled.div`
display: flex;
`;

function SideBarItems() {
    // const {projectId} = useContext(UserContext);

    const router = useRouter();
    const projectID = router.query.id;

    const sidebaritems =  [   
    //     {
    //     title: "Project Dashboard",
    //     icon: "dashboard",
    //     link: "/admin/project/[id]",
    //     as: `/admin/project/${projectID}`
    // },
    // {
    //     title: "List of Locations",
    //     icon: "list",
    //     link: `/admin/project/locations/list/[id]]`,
    //     as: `/admin/project/locations/list/${projectID}`
    // },
    {
        title: "Map Editor",
        icon: "map",
        link: `/admin/project/map/editor/[id]`,
        as: `/admin/project/map/editor/${projectID}`
    },
    {
        title: "Preview",
        icon: "remove_red_eye",
        link: `/admin/project/map/preview/[id]`,
        as: `/admin/project/map/preview/${projectID}`
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
                  {/* <SideBarItem item={      {
            title: "Project Settings",
            icon: "settings",
            link: "/admin/project_settings"
        }} /> */}
          </ProjectSidebar>
        </SideBarItemsStyle>
    );
};

export default SideBarItems;
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
    {
        title: "Map Editor",
        icon: "map",
        link: `/mymaps/editor/[id]`,
        as: `/mymaps/editor/${projectID}`
    },
    {
        title: "Preview",
        icon: "remove_red_eye",
        link: `/mymaps/preview/[id]`,
        as: `/mymaps/preview/${projectID}`
    }];

    return (
        <SideBarItemsStyle>
              <ProjectSidebar>

             
            <SideBarItem item={{
                title: "Back to Projects",
                icon: "folder_open",
                link: "/mymaps"
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
            link: "/mymaps/project_settings"
        }} /> */}
          </ProjectSidebar>
        </SideBarItemsStyle>
    );
};

export default SideBarItems;
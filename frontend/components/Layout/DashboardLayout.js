import MainSideBar from '../Dashboard/MainSideBar/MainSideBar';
import ProfileNav from '../Dashboard/NavProfilePill/NavProfilePill';
import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import useUser from '../hooks/useUser';
import Router from 'next/router';

const MainContent = styled.div`
  display: flex;
  position: relative;
@media (min-width: 700px) {
  margin-left: 172px;
  height: 100vh;
  
}

@media (min-width: 900px) {
  margin-left: 200px;
}

.dashboard_content {
  width: 100%;
}
`;

const DashboardLayout = props => {
  const {data: {me}, loading} = useUser();
    
  useEffect(() => {
      const user = me;
        if(loading) {
          return
        }
        if(!user) {
          Router.push({
            pathname: '/login'
          });
      } 
  });

  if(loading) {
    return <div>Loading...</div>
  }
  
  return  <div>
    <MainSideBar />
    <MainContent>
        <ProfileNav />
        <div className="dashboard_content">
          {props.children}
        </div>
    </MainContent>
  </div>
};

export default DashboardLayout;
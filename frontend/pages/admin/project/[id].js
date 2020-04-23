import React, { useEffect, useContext } from 'react';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import LocationViewSwitcher from '../../../components/Dashboard/LocationViewSwitcher';
import ListView from '../../../components/Dashboard/LocationsListView';
import Title from '../../../components/Dashboard/MainContentTitle';
import Pagination from '../../../components/Dashboard/Pagination/Pagination';
import Head from 'next/head';
import { UserContext } from '../../../components/Layout/DashboardLayout';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Router from 'next/router'
import Paper from '@material-ui/core/Paper';

const StickyTabs = styled.div`
  position: sticky;
  top: 0;
  display: block;
  background-color: #f7f7f7;
  z-index: 10;
  padding-bottom: 4px;
`;

const IPaper = styled(Paper)`
  && {
    display: inline-flex;
    min-width: 240px;
    min-height: 150px;
  
    font-family: ${props => props.theme.boldFont};
    font-size: 20px;
    line-height: 1.5;
    box-shadow: 0 1px 5px 1px rgba(100, 105, 135, .3);

    .paperContainer {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      padding: 32px;
    }
  }
`;


const ProjectDashboardContainer = styled.div`
  display: block;
  padding: 32px;

`;

const ProjectLocations = () => {
  const router = useRouter();
  const { user: data, loading, refetch, setProjectID} = useContext(UserContext);

  useEffect(() => {
    setProjectID(router.query.id);
  }, loading);

  if (loading) {
    return <LoadingSpinner />
  }

  const filteredProject = data && data.projects.find(el => {
    return el.id === router.query.id
  });


  return <>
    <Head>
      <title>{data && filteredProject.title}</title>
    </Head>
    <Title title={data && filteredProject.title} />
    <ProjectDashboardContainer>
      <IPaper>
        <div className="paperContainer">
          {data && filteredProject.locations.length} Locations
        </div>
      </IPaper>
    </ProjectDashboardContainer>
  </>
}

const ProjectId = props => {
  return <DashboardLayout>
    <ProjectLocations />
  </DashboardLayout>
};

export default ProjectId;

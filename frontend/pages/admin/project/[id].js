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

const StickyTabs = styled.div`
  position: sticky;
  top: 0;
  display: block;
  background-color: #f7f7f7;
  z-index: 10;
  padding-bottom: 4px;
`;

const ProjectLocations = () => {
  const router = useRouter();
  const { user: data, loading, refetch, setProjectID} = useContext(UserContext);

  if (loading) {
    return <LoadingSpinner />
  }

  useEffect(() => {
    setProjectID(router.query.id);
  }, []);

  const filteredProject = data && data.projects.find(el => {
    return el.id === router.query.id
  });

  return <>
    <Head>
      <title>{filteredProject.title}</title>
    </Head>
    <Title title={filteredProject.title} />
  </>
}

const ProjectId = props => {
  return <DashboardLayout>
    <ProjectLocations />
  </DashboardLayout>
};

export default ProjectId;

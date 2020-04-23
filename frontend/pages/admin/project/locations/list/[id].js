import DashboardLayout from '../../../../../components/Layout/DashboardLayout';
import LocationViewSwitcher from  '../../../../../components/Dashboard/LocationViewSwitcher';
import ListView from  '../../../../../components/Dashboard/LocationsListView';
import Title from '../../../../../components/Dashboard/MainContentTitle';
import Pagination from '../../../../../components/Dashboard/Pagination/Pagination';
import Head from 'next/head';
import styled from 'styled-components';


const StickyTabs = styled.div`
  position: sticky;
  top: 0;
  display: block;
  background-color: #f7f7f7;
  z-index: 10;
  padding-bottom: 4px;
`;


const Locations = props => {


  return <DashboardLayout>
    <Head>
      <title>My Locations</title>
    </Head>
    <StickyTabs>
    <Title title="My Locations" />
    <LocationViewSwitcher />
    <Pagination page={parseFloat(props.query.page) || 1 }/>
    </StickyTabs>
    <ListView page={parseFloat(props.query.page) || 1 } />
  </DashboardLayout>
};

export default Locations;

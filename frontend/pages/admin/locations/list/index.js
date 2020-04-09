import DashboardLayout from '../../../../components/Layout/DashboardLayout';
import LocationViewSwitcher from  '../../../../components/Dashboard/LocationViewSwitcher';
import ListView from  '../../../../components/Dashboard/LocationsListView';
import Title from '../../../../components/Dashboard/MainContentTitle';
import Head from 'next/head';

const Locations = props => (
  <DashboardLayout>
    <Head>
      <title>My Locations</title>
    </Head>
    <Title title="My Locations" />
    <LocationViewSwitcher />
    <ListView page={parseFloat(props.query.page) || 1 } />
  </DashboardLayout>
);

export default Locations;

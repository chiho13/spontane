import DashboardLayout from '../../../components/Layout/DashboardLayout';
import LocationViewSwitcher from  '../../../components/Dashboard/LocationViewSwitcher';
import Title from '../../../components/Dashboard/MainContentTitle';
import Head from 'next/head';

const Locations = props => (
  <DashboardLayout>
    <Head>
      <title>My Locations</title>
    </Head>
    <Title title="My Locations" />
  </DashboardLayout>
);

export default Locations;
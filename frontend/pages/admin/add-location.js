import CreateLocation from '../../components/Dashboard/CreateLocation';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import Head from 'next/head';

const addLocation = () => (
    <DashboardLayout>
        <Head>
            <title>Add Location</title>
        </Head>
        <CreateLocation/>
    </DashboardLayout>
);

export default addLocation;
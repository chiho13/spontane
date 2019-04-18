import CreateLocation from '../../components/CreateLocationForm';
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
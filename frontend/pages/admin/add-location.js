import CreateLocation from '../../components/Dashboard/CreateLocation/CreateLocation';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import Head from 'next/head';

const addLocation = (props) => (
    <DashboardLayout>
        <Head>
            <title>Add Location</title>
        </Head>
        <CreateLocation project={props.query.projectId}/>
    </DashboardLayout>
);

export default addLocation;
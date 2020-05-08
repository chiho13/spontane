import UpdateLocation from '../../../../../components/Dashboard/UpdateLocation';
import DashboardLayout from '../../../../../components/Layout/DashboardLayout';
import Head from 'next/head';

const Update = props => (
    <DashboardLayout>
        <Head>
            <title>Update Location</title>
        </Head>
        <UpdateLocation locationID={props.query.locationID} latitude={props.query.latitude} longitude={props.query.longitude}/>
    </DashboardLayout>
)

export default Update;
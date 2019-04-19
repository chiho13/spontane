import UpdateLocation from '../../../components/UpdateLocation';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import Head from 'next/head';

const Update = props => (
    <DashboardLayout>
        <Head>
            <title>Update Location</title>
        </Head>
        <UpdateLocation id={props.query.id} latitude={props.query.latitude} longitude={props.query.longitude}/>
    </DashboardLayout>
)

export default Update;
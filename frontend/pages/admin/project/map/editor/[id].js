import CreateLocation from '../../../../../components/Dashboard/EditorMap/Editor';
import DashboardLayout from '../../../../../components/Layout/DashboardLayout';
import Head from 'next/head';

const addLocation = (props) => {

   return <DashboardLayout>
        <Head>
            <title>Add Location</title>
        </Head>
        <CreateLocation project={props.query.projectId}/>
    </DashboardLayout>
};

export default addLocation;
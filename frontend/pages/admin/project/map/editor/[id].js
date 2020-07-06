import MapEditor from '../../../../../components/Dashboard/EditorMap/Editor';
import DashboardLayout from '../../../../../components/Layout/DashboardLayout';
import Head from 'next/head';

const addLocation = (props) => {

   return <DashboardLayout>
        <Head>
            <title>Map Editor</title>
        </Head>

                 <MapEditor project={props.query.projectId}/>

    </DashboardLayout>
};

export default addLocation;
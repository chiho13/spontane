import CreateLocation from '../../../../../components/Dashboard/EditorMap/Editor';
import DashboardLayout from '../../../../../components/Layout/DashboardLayout';
import Head from 'next/head';
import {MapEditorProvider} from '../../../../../components/providers/MapEditorProvider';

const addLocation = (props) => {

   return <DashboardLayout>
        <Head>
            <title>Add Location</title>
        </Head>
        <MapEditorProvider>
            <CreateLocation project={props.query.projectId}/>
        </MapEditorProvider>
    </DashboardLayout>
};

export default addLocation;
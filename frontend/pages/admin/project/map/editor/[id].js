import CreateLocation from '../../../../../components/Dashboard/EditorMap/Editor';
import DashboardLayout from '../../../../../components/Layout/DashboardLayout';
import Head from 'next/head';
import {LocationEditorProvider} from '../../../../../components/providers/LocationEditorProvider';

const addLocation = (props) => {

   return <DashboardLayout>
        <Head>
            <title>Map Editor</title>
        </Head>
        <LocationEditorProvider>
            <CreateLocation project={props.query.projectId}/>
        </LocationEditorProvider>
    </DashboardLayout>
};

export default addLocation;
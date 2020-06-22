import MapEditor from '../../../../../components/Dashboard/EditorMap/Editor';
import DashboardLayout from '../../../../../components/Layout/DashboardLayout';
import Head from 'next/head';
import {LocationEditorProvider} from '../../../../../components/providers/LocationEditorProvider';
import {ShapeEditorProvider} from '../../../../../components/providers/ShapeEditorProvider';

const addLocation = (props) => {

   return <DashboardLayout>
        <Head>
            <title>Map Editor</title>
        </Head>
        <LocationEditorProvider>
            <ShapeEditorProvider>
                 <MapEditor project={props.query.projectId}/>
            </ShapeEditorProvider>
        </LocationEditorProvider>
    </DashboardLayout>
};

export default addLocation;
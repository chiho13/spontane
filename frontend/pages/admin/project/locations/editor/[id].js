import CreateLocation from '../../../../../components/Dashboard/CreateLocation/CreateLocation';
import DashboardLayout from '../../../../../components/Layout/DashboardLayout';
import Head from 'next/head';
import {useState} from 'react';

const addLocation = (props) => {

    const [pageNum, setPageNum] = useState(parseFloat(props.query.page) || 1 );
   return <DashboardLayout>
        <Head>
            <title>Add Location</title>
        </Head>
        <CreateLocation project={props.query.projectId}/>
    </DashboardLayout>
};

export default addLocation;
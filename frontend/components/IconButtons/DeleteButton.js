import {useContext} from 'react';

import {ThemeProvider} from 'styled-components';
import MaterialIcon from '@material/react-material-icon';
import IconButtonStyle from './IconButtonStyle';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {ALL_LOCATIONS_QUERY} from '../Dashboard/LocationsListView';
import Router from 'next/router';
import {PAGINATION_QUERY} from '../Dashboard/Pagination/Pagination';
import useLocalStorage from '../hooks/useLocalStorage';
import { useRouter } from 'next/router';
import {UserContext} from '../Layout/DashboardLayout';
import {useMutation} from '../hooks/useMutation';

const DELETE_LOCATION_MUTATION = gql`
    mutation DELETE_LOCATION_MUTATION($id: ID!) {
        deleteLocation(id: $id) {
            id
        }
    }
`;

const theme = {
    iconColor: '#777777',
    iconColorHover: '#ff4c4c'
};

const DeleteButton = (props) => {
    const router = useRouter();
    const {user: data, loading, refetch} = useContext(UserContext);
 
    const {locationID} = props;

    const [deleteLocation] = useMutation(DELETE_LOCATION_MUTATION, {
        variables: {
            id: locationID
        }
    });

    async function deleteStuff(e) {
        e.stopPropagation();
        if(confirm('Are you sure you want to delete this location?')) {
           const res = await deleteLocation();
           if(res) {
                refetch();
                console.log(res);
                console.log("deleted")
           }
        }
    }
    
    return <ThemeProvider theme={theme}>
                <IconButtonStyle onClick={deleteStuff}>
                    <MaterialIcon icon="delete" className="materialIcon" /></IconButtonStyle>
            </ThemeProvider>
};

export default DeleteButton;
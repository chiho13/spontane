import {ThemeProvider} from 'styled-components';
import MaterialIcon from '@material/react-material-icon';
import IconButtonStyle from './IconButtonStyle';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {ALL_LOCATIONS_QUERY} from '../Dashboard/LocationsListView';
import Router from 'next/router';
import {PAGINATION_QUERY} from '../Dashboard/Pagination/Pagination';

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

    const update = () => {
        Router.push({
            pathname: '/admin/locations',
            query: {
                view: 'List'
            }
        });
    };
    
    const {id} = props;
    return (
        <Mutation
            mutation={DELETE_LOCATION_MUTATION}
            variables={{
            id
        }}
        update={update}
        refetchQueries={[
            {query: ALL_LOCATIONS_QUERY}, {query: PAGINATION_QUERY}
        ]}>
            {(deleteLocation, {error}) => (
                <ThemeProvider theme={theme}>
                <IconButtonStyle onClick={() => {
                    if(confirm('Are you sure you want to delete this location?')) {
                        deleteLocation();
                    }
                }}>
                    <MaterialIcon icon="delete" className="materialIcon" /></IconButtonStyle>
            </ThemeProvider>
            )}
        </Mutation>
    )
};

export default DeleteButton;
import {ThemeProvider} from 'styled-components';
import MaterialIcon from '@material/react-material-icon';
import IconButtonStyle from './IconButtonStyle';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {ALL_LOCATIONS_QUERY} from '../LocationsMapView';

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

    const update = (cache, payload) => {
        //manually update the cache on the client so it matches the server
        // 1. Read the cache for the items we want
        const data = cache.readQuery({query: ALL_LOCATIONS_QUERY})
        //2. Filter the deletedItem out of the page
        data.locations = data.locations.filter(location => location.id !== payload.data.deleteLocation.id)
        cache.writeQuery({ query: ALL_LOCATIONS_QUERY, data});
    };
    
    const {id} = props;
    return (
        <Mutation
            mutation={DELETE_LOCATION_MUTATION}
            variables={{
            id
        }}
        update={update}>
            {(deleteLocation, {error}) => (
                <ThemeProvider theme={theme}>
                <IconButtonStyle onClick={() => {
                    if(confirm('Are you sure you want to delete this location?')) {
                        deleteLocation();
                    }
                }}>
                    <MaterialIcon icon="delete" className="materialIcon"/></IconButtonStyle>
            </ThemeProvider>
            )}
        </Mutation>
    )
};

export default DeleteButton;
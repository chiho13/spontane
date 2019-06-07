import {useQuery} from 'react-apollo-hooks';
import gql from 'graphql-tag';

const CURRENT_USER_QUERY = gql `
    query {
        me {
            id
            email
            name
            permissions
            locations {
                id
                country
                city
                geoLocation {
                    latitude
                    longitude
                }
                 description
            }
        }
    }
`;

function useUser() {
    const payload = useQuery(CURRENT_USER_QUERY);
    return payload
}

export default useUser;
export {CURRENT_USER_QUERY}
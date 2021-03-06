import {useQuery} from 'react-apollo-hooks';
import gql from 'graphql-tag';

const CURRENT_USER_QUERY = gql `
    query {
        me {
            id
            email
            name
            permissions
            projects {
                id
                title
                mapBounds
                mapStyle
                markerColor
                locations {
                    id
                country
                city
                geoLocation {
                    id
                    latitude
                    longitude
                }
                markerType {
                    id
                    type
                    pinColor
                }
                 description
                }
                shapes {
                    id
                    geojson
                    user
                }
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
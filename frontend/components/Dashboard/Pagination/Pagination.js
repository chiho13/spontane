import React from 'react';
import PaginationStyle from './PaginationStyle';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        locationsConnection {
            aggregate {
                count
            }
        }
    }
`;

function Pagination(props) {
    return (
        <PaginationStyle>
            <Query query={PAGINATION_QUERY}>
            {({data, loading, error}) => <>  Pagination {data.locationsConnection.aggregate.count}</>}
            </Query>
        </PaginationStyle>
    )
}

export default Pagination;
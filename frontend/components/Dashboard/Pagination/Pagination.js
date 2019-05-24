import React from 'react';
import PaginationStyle from './PaginationStyle';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { perPage } from '../../../config';
import Head from 'next/head';
import Link from 'next/link';
import MaterialIcon from '@material/react-material-icon';

export const PAGINATION_QUERY = gql`
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
            <Query query={PAGINATION_QUERY}>
            {({data, loading, error}) =>{
                if(loading) return <p>Loading...</p>
                const count = data.locationsConnection.aggregate.count;
                const pages = Math.ceil(count / perPage);
                const page = props.page;
                return <PaginationStyle> 
                    <Head><title>
                            Spontane | Page {page} of {pages}
                        </title>
                    </Head>
                    <p className="totalLocations">{count} Locations</p>
                    <Link prefetch href={{
                        pathname: 'locations',
                        query: {page: page - 1}
                    }}><a className="prev" aria-disabled={page <= 1 }><MaterialIcon icon="chevron_left" /></a></Link>
                    <p>  Page {page} of {pages}</p>
                    <Link prefetch href={{
                        pathname: 'locations',
                        query: {page: page + 1}
                    }}><a className="next" aria-disabled={page >= pages }><MaterialIcon icon="chevron_right" /></a></Link>
                    
                    </PaginationStyle>;
            } }
            </Query>
    )
}

export default Pagination;
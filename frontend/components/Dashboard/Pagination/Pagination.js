import React, {useContext} from 'react';
import PaginationStyle from './PaginationStyle';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {perPage} from '../../../config';
import Head from 'next/head';
import Link from 'next/link';
import MaterialIcon from '@material/react-material-icon';
import {UserContext} from '../../Layout/DashboardLayout';
import {useQuery} from 'react-apollo-hooks';

export const PAGINATION_QUERY = gql `
    query PAGINATION_QUERY($userId: ID!) {
        locationsConnection(where: { user: {
              id: $userId
          }}) {
            aggregate {
                count
            }
        }
    }
`;

function Pagination(props) {
    const {user} = useContext(UserContext)

    console.log(user);
    const {data, loading, called} = useQuery(PAGINATION_QUERY, {
        variables: {
            userId: user && user.id
        }
    });

    if (loading) 
        return <div></div>

    const count = data.locationsConnection.aggregate.count;
    const pages = Math.ceil(count / perPage);
    const page = props.page;
    

    return <PaginationStyle>
        <Head>
            <title>
                Spontane | Page {page}
                of {pages}
            </title>
        </Head>
        <p className="totalLocations">{count} Location{count > 1 && 's'}</p>

        {pages > 1 && <>
            <Link
                prefetch
                href={{
                pathname: 'locations',
                query: {
                    page: page - 1
                }
            }}>
                <a className="prev" aria-disabled={page <= 1}><MaterialIcon icon="chevron_left"/></a>
            </Link>
            <p>
                Page {page}
                of {pages}</p>
            <Link
                prefetch
                href={{
                pathname: 'locations',
                query: {
                    page: page + 1
                }
            }}>
                <a className="next" aria-disabled={page >= pages}><MaterialIcon icon="chevron_right"/></a>
            </Link>
        </>
}
    </PaginationStyle>;
}

export default Pagination;
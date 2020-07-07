import React, {useContext, useEffect, useState} from 'react';
import PaginationStyle from './PaginationStyle';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {perPage} from '../../../config';
import Head from 'next/head';
import Link from 'next/link';
import MaterialIcon from '@material/react-material-icon';
import {UserContext} from '../../Layout/DashboardLayout';
import {useQuery} from 'react-apollo-hooks';
import Router, {useRouter} from 'next/router'

import styled from 'styled-components';

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

const Lazyloader = styled.div`
    display: block;
    height: 64px;
`;

function Pagination(props) {
    const router = useRouter();
    const {user: data, loading, projectData} = useContext(UserContext)

    const {page, setPageNum} = props;

    if (loading) {
        return <Lazyloader></Lazyloader>
    }

    const count = projectData && projectData.locations.length;
    const pages = Math.ceil(count / perPage);

    function pageChange(num) {
        
        setPageNum(num);
        const href = `/mymaps/editor/[id]`;
            
        const newPath = `/mymaps/editor/${router.query.id}` + `?page=${num}`;
        
        Router.push(href, newPath, {shallow: true});

    }


    return <PaginationStyle>
        {data && <p className="totalLocations">{count} Location{count > 1 && 's'}</p>}

        {pages > 1 && <>
           
                <button className="prev" onClick={(e) => pageChange(page - 1)} aria-disabled={page <= 1}><MaterialIcon icon="chevron_left"/></button>
            <p>
                Page {page} of {pages}</p>
            
                <button className="next" onClick={(e) => pageChange(page + 1)} aria-disabled={page >= pages}><MaterialIcon icon="chevron_right"/></button>
        </>
}
    </PaginationStyle>;
}

export default Pagination;
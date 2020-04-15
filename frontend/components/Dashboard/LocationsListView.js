import React, {useEffect, useContext} from 'react';
import styled from 'styled-components';
import Location from './LocationListViewItem/LocationListViewItem';
import Pagination from './Pagination/Pagination';
import gql from 'graphql-tag';
import {perPage} from '../../config';
import {useQuery} from 'react-apollo-hooks';
import {UserContext} from '../Layout/DashboardLayout';
import Loading from '../LoadingSpinner';
import Router from 'next/router';

export const ALL_LOCATIONS_QUERY = gql `
        query ALL_LOCATIONS_QUERY($skip: Int = 0, $first: Int = ${perPage}, $userId: ID) {
            locations(where: { user: {
              id: $userId
          }}, first: $first, skip: $skip, orderBy: createdAt_DESC) {
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
`;

const LocationsListViewStyle = styled.div `
    display: block;
    max-width: ${props => props.theme.maxWidth};
    padding-left: 32px;
    padding-right: 32px;
`;

const LocationListView = (props) => {
    const {user: data, loading, refetch} = useContext(UserContext);

    if(loading) {
        return <Loading />
    }

    const locations = data && data.locations.slice((props.page - 1) * perPage, props.page * perPage);
    
   useEffect(() => {
    refetch();
   }, [])

 

    return (
        <LocationsListViewStyle>
            <>
            { data && locations.map((location) => <Location location={location} key={location.id}/>)
            }

        {data && locations.length > perPage && <Pagination page={props.page}/>}
            </> 
        </LocationsListViewStyle>
    );
}

export default LocationListView;

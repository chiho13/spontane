import React from 'react';
import styled from 'styled-components';
import Location from './LocationListViewItem/LocationListViewItem';
import Pagination from './Pagination/Pagination';
import gql from 'graphql-tag';
import {perPage} from '../../config';
import {useQuery} from 'react-apollo-hooks';

export const ALL_LOCATIONS_QUERY = gql `
        query ALL_LOCATIONS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
          locations(first: $first, skip: $skip, orderBy: createdAt_DESC) {
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
    padding-right: 16px;
`;

const LocationListView = (props) => {
    const {data, error, loading} = useQuery(ALL_LOCATIONS_QUERY, {
        variables: {
            skip: props.page * perPage - perPage,
            first: perPage
        }
    });
    if (loading) {
       console.log("Loading")
    }
    if (error) {
        console.log("Error")
    }

    return (
        <LocationsListViewStyle>
            <>
            <Pagination page={props.page}/>
            {  data.locations && data
                .locations
                .map(location => <Location location={location} key={location.id}/>)
            }

        {(data.locations && data.locations.length) ? <Pagination page={props.page}/> : null }
            </> 
        </LocationsListViewStyle>
    );
}

export default LocationListView;

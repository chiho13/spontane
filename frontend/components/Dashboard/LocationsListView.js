import React from 'react';
import {Query} from 'react-apollo';
import styled from 'styled-components';
import Location from './LocationListViewItem/LocationListViewItem';
import Pagination from './Pagination/Pagination';
import gql from 'graphql-tag';
import {perPage} from '../../config';

const ALL_LOCATIONS_QUERY = gql `
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
    return (
        <LocationsListViewStyle>
            <Pagination page={props.page}/>
            <Query query={ALL_LOCATIONS_QUERY} variables={{
                skip: props.page * perPage - perPage
            }}>
                {({data, error, loading}) => {
                    if (loading) 
                        return <p>Loading...</p>;
                    if (error) 
                        return <p>Error: {error.message}</p>;
                    return ( <> {
                        data
                            .locations
                            .map(location => <Location location={location} key={location.id}/>)
                    } </>
                        );w
                }}
            </Query>
            <Pagination page={props.page} />
        </LocationsListViewStyle>
    );
}

export default LocationListView;

import React from 'react';
import {Query} from 'react-apollo';
import styled from 'styled-components';
import Location from './LocationListViewItem/LocationListViewItem';
import Pagination from './Pagination/Pagination';
import {ALL_LOCATIONS_QUERY} from '../LocationsMapView';

const LocationsListViewStyle = styled.div `
  display: block;
  max-width: ${props => props.theme.maxWidth};
    padding-left: 32px;
    padding-right: 16px;
`;

const LocationListView = () => {
    return (
        <LocationsListViewStyle>
            <Pagination/>
            <Query query={ALL_LOCATIONS_QUERY}>
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
            <Pagination/>
        </LocationsListViewStyle>
    );
}

export default LocationListView;

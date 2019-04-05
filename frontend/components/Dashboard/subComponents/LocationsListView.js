import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Location from './LocationListViewItem';
import {ALL_LOCATIONS_QUERY} from '../../LocationsMapView';

const LocationsListViewStyle = styled.div `
  display: block;
  max-width: ${props => props.theme.maxWidth};
    padding-left: 32px;
    padding-right: 16px;
`;

const LocationListView = () => {
        return (
            <div>
                    <Query query={ALL_LOCATIONS_QUERY}>
                        {({data, error, loading}) => {
                            if (loading) 
                                return <p>Loading...</p>;
                            if (error) 
                                return <p>Error: {error.message}</p>;
                            return (
                                <LocationsListViewStyle>{data
                                        .locations
                                        .map(location => <Location location={location} key={location.id}/>)}</LocationsListViewStyle>
                            );
                        }}
                    </Query>
            </div>
        );
}

export default LocationListView;

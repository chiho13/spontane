import React, {Component} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Location from './Location';

const ALL_LOCATIONS_QUERY = gql `
  query ALL_LOCATIONS_QUERY {
    locations {
      id
      country
      city
      geoLocation {
        latitude
        longitude
      }
    }
  }
`;

const Center = styled.div `
  text-align: center;
`;

const LocationsList = styled.div `
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Locations extends Component {
    render() {
        return (
            <div>
                <Center>
                    <Query query={ALL_LOCATIONS_QUERY}>
                        {({data, error, loading}) => {
                            if (loading) 
                                return <p>Loading...</p>;
                            if (error) 
                                return <p>Error: {error.message}</p>;
                            return (
                                <LocationsList>{data
                                        .locations
                                        .map(location => <Location location={location} key={location.id}/>)}</LocationsList>
                            );
                        }}
                    </Query>
                </Center>
            </div>
        );
    }
}

export default Locations;

import React, {useEffect, useContext, useState} from 'react';
import styled from 'styled-components';
import Location from './LocationListViewItem/LocationListViewItem';
import Pagination from './Pagination/Pagination';
import gql from 'graphql-tag';
import {perPage} from '../../config';
import {useQuery} from 'react-apollo-hooks';
import {UserContext} from '../Layout/DashboardLayout';
import Loading from '../LoadingSpinner';
import Router from 'next/router';
import { useRouter } from 'next/router';

// import dynamic from 'next/dynamic';
// const Skeleton = dynamic(() => import('react-loading-skeleton'), {
//     ssr: false
//   });

import Skeleton from './Skeleton';

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
            user
          }
        }
`;



const LoadingContainer = styled.div`
display: flex;
position: relative;
background-color: ${props => props.theme.white};
border: none;
margin-top: 2px;
box-shadow: none;
border-radius: 0;
align-items: center;
height: 100px;

&:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
    
    `;

const LocationsListViewStyle = styled.ol`
    display: block;
    max-width: ${props => props.theme.maxWidth};
    padding-bottom: 32px;
    height: calc(100vh - 190px);
    overflow-y: scroll;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const LocationListView = (props) => {
    const {loading, projectData: filteredProject} = useContext(UserContext);

    const {page, updateLocation} = props;

    const [locations, setLocations] = useState(null);

    useEffect(() => {
        if(loading) return;

        let reversed =  filteredProject.locations.reverse();
        const locations = reversed.slice((page - 1) * perPage, page * perPage);
        setLocations(locations);

        return () => {
            reversed =  filteredProject.locations.reverse();
        }
    }, [loading, page, locations]);

    function listItemUpdate(location) {

    }

    if(loading) {
        return <LocationsListViewStyle>
                    <Skeleton count={3} />
             </LocationsListViewStyle>
    }
    return (
        <LocationsListViewStyle>
            { locations && locations.map((location) => <li key={location.id} onClick={() => updateLocation(location)}><Location location={location} /></li>)
            }
        </LocationsListViewStyle>
    );
}

export default LocationListView;

import React, {useEffect, useContext, useState, useMemo} from 'react';
import styled from 'styled-components';
import Location from './LocationListViewItem/LocationListViewItem';

import {perPage} from '../../config';
import {UserContext} from '../Layout/DashboardLayout';


import Skeleton from './Skeleton';


const LocationsListViewStyle = styled.ol`
    display: block;
    max-width: ${props => props.theme.maxWidth};
    padding-bottom: 32px;
    height: calc(100vh - 182px);
    overflow-y: scroll;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const LocationListView = (props) => {
    const {loading, projectData: filteredProject} = useContext(UserContext);
    
    const {page, updateLocation} = props;

    const MemoiseLocations = useMemo(() => {
        if(loading) return;
        const reversed =  [...filteredProject.locations].reverse();
        const locations = reversed.slice((page - 1) * perPage, page * perPage);
        return locations;
    }, [filteredProject, loading, page]);

    if(loading) {
        return <LocationsListViewStyle>
                    <Skeleton count={3} />
             </LocationsListViewStyle>
    }
    return (
        <LocationsListViewStyle>
            { MemoiseLocations.map((location) => <li key={location.id} onClick={() => {
                updateLocation(location);
            }}><Location location={location} /></li>)
            }
        </LocationsListViewStyle>
    );
}

export default LocationListView;

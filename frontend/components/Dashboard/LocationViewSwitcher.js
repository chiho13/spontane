import React, {Component} from 'react';
import MapView from '../LocationsMapView';
import ListView from './LocationsListView'
import styled from 'styled-components';
import Tabs from './SegmentTabs/Tabs';
import { useRouter } from 'next/router';
import Search from './Searchbar/Searchbar';

const SwitcherStyle = styled.div`
        display: flex;
        align-items: center;
        margin-top: 16px;
        
    .locationItem {
      position: absolute;
    }

    .search_container {
        margin-left: 32px;
        width: 250px;
    }
`;

const LocationViewSwitcher = (props) => {
    const router = useRouter();
        return (
            <SwitcherStyle>
                <div className="search_container">
                    <Search />
                </div>
            </SwitcherStyle>
        );
};

export default LocationViewSwitcher;
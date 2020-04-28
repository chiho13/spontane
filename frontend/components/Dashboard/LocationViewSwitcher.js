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
                <Tabs id={props.id}>
                    <div label="list" projectId={router.query.id} icon="view_list">
                    
                    </div>
                    <div label="map" projectId={router.query.id} icon="map">
                       
                    </div>
                </Tabs>
                <div className="search_container">
                    <Search />
                </div>
            </SwitcherStyle>
        );
};

export default LocationViewSwitcher;
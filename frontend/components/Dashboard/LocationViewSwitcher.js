import React, {Component} from 'react';
import MapView from '../LocationsMapView';
import ListView from './LocationsListView'
import styled from 'styled-components';
import Tabs from './SegmentTabs/Tabs';


const SwitcherStyle = styled.div`
    width: 100%;

    .locationItem {
      position: absolute;
    }
`;

const LocationViewSwitcher = (props) => {
        return (
            <SwitcherStyle>
                <Tabs id={props.id}>
                    <div label="list" icon="view_list">
                    
                    </div>
                    <div label="map" icon="map">
                       
                    </div>
                </Tabs>
            </SwitcherStyle>
        );
};

export default LocationViewSwitcher;
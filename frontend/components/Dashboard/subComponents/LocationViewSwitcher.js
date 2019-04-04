import React, {Component} from 'react';
import MapView from '../../LocationsMapView';
import ListView from './LocationsListView'
import styled from 'styled-components';
import Tabs from '../../SegmentTabs/Tabs';


const SwitcherStyle = styled.div`
    margin-top: 32px;
    width: 100%;
`;

const LocationViewSwitcher = (props) => {
        return (
            <SwitcherStyle>
                <Tabs>
                    <div label="List" icon="view_list">
                        <ListView />
                    </div>
                    <div label="Map" icon="map">
                       <MapView id={props.id} lat={props.lat} lon={props.lon} pathname="/admin/locations"/>
                    </div>
                </Tabs>
            </SwitcherStyle>
        );
};

export default LocationViewSwitcher;
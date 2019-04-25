import React, {Component} from 'react';
import MapView from '../LocationsMapView';
import ListView from './LocationsListView'
import styled from 'styled-components';
import Tabs from '../SegmentTabs/Tabs';


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
                    <div label="List" icon="view_list">
                        <ListView />
                    </div>
                    <div label="Map" icon="map">
                       <MapView id={props.id} lat={props.lat} lon={props.lon} pathname="locations" editButton={true}/>
                    </div>
                </Tabs>
            </SwitcherStyle>
        );
};

export default LocationViewSwitcher;
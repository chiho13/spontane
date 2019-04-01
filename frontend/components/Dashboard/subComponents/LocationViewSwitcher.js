import React, {Component} from 'react';
import MapView from './LocationsMapView';
import ListView from './LocationsListView'
import styled from 'styled-components';
import Tabs from '../../SegmentTabs/Tabs';


const SwitcherStyle = styled.div`
    margin-top: 32px;
`;


class LocationViewSwitcher extends Component {
    render() {
        return (
            <SwitcherStyle>
                <Tabs>
                    <div label="List" icon="view_list">
                        <ListView />
                    </div>
                    <div label="Map" icon="map">
                       <MapView />
                    </div>
                    
                </Tabs>
            </SwitcherStyle>
        );
    }
}

export default LocationViewSwitcher;
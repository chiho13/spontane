import React, {Component} from 'react';
import MapView from './LocationsMapView';
import ListView from './LocationsListView'
import styled from 'styled-components';

import Tabs from './SegmentTabs/Tabs';

const BackgroundColor = styled.div`
    background-color: #f1f1f1;
`;

class LocationViewSwitcher extends Component {
    render() {
        return (
            <BackgroundColor>
                <Tabs>
                    <div label="List" icon="view_list">
                        <ListView />
                    </div>
                    <div label="Map" icon="map">
                       <MapView />
                    </div>
                </Tabs>
            </BackgroundColor>
        );
    }
}

export default LocationViewSwitcher;
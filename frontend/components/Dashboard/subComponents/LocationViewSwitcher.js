import React, {Component} from 'react';
import MapView from './LocationsMapView';
import ListView from './LocationsListView'

import Tabs from '../../SegmentTabs/Tabs';

class LocationViewSwitcher extends Component {
    render() {
        return (
            <div>
                <Tabs>
                    <div label="List" icon="view_list">
                        <ListView />
                    </div>
                    <div label="Map" icon="map">
                       <MapView />
                    </div>
                    
                </Tabs>
            </div>
        );
    }
}

export default LocationViewSwitcher;
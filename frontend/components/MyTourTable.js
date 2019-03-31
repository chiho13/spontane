import React, { Component } from 'react';
import Title from './Dashboard/subComponents/MainContentTitle';
import LocationViewList from './LocationsListView';

class MyTourTable extends Component {
    render() {
        return (
            <div>
                <Title title="My Tours" />
                <LocationViewList />
            </div>
        );
    }
}

export default MyTourTable;
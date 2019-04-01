import React, {Component} from 'react';
import LocationItemStyles from '../styles/LocationListViewItemStyle';
import EditButton from '../../UIKIT/EditButton';

const LocationListViewItem = (props) => {
    const {location} = props;
    return (
        <LocationItemStyles>
            <div className="location_content">
                <h3>{location.city}, {location.country}</h3>
                <p>
                    {location.description}
                </p>
            </div>
            <div className="buttonList">
                <EditButton pathname="admin/update" id={location.id} />
            </div>
        </LocationItemStyles>
    )
}

export default LocationListViewItem;
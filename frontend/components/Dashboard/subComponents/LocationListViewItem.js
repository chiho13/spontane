import React, {Component} from 'react';
import LocationItemStyles from '../styles/LocationListViewItemStyle';
import EditButton from '../../UIKIT/IconButtons/EditButton';
import DeleteButton from '../../UIKIT/IconButtons/DeleteButton';

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
                <EditButton pathname="/admin/locations/update" id={location.id} showButton={true}/>
                <DeleteButton pathname="/admin/locations/update" id={location.id} showButton={true}/>
            </div>
        </LocationItemStyles>
    )
}

export default LocationListViewItem;
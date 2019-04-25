import React, {Component} from 'react';
import LocationItemStyles from './LocationListViewItemStyle';
import EditButton from '../../IconButtons/EditButton';
import DeleteButton from '../../IconButtons/DeleteButton';

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
                <EditButton pathname="/admin/locations/update" id={location.id} latitude={location.geoLocation.latitude} longitude={location.geoLocation.longitude} showButton={true}/>
                <DeleteButton pathname="/admin/locations/update" id={location.id} showButton={true}/>
            </div>
        </LocationItemStyles>
    )
}

export default LocationListViewItem;
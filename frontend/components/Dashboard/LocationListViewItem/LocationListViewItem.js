import React from 'react';
import LocationItemStyles from './LocationListViewItemStyle';
import EditButton from '../../IconButtons/EditButton';
import DeleteButton from '../../IconButtons/DeleteButton';
import {useRouter} from 'next/router';

const LocationListViewItem = (props) => {
    const router = useRouter();
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
                <EditButton pathname=
                {`/admin/project/locations/update/${router.query.id}`} locationID={location.id} latitude={location.geoLocation.latitude} longitude={location.geoLocation.longitude} showButton={true}/>
                <DeleteButton pathname="/admin/project/locations/update" locationID={location.id} showButton={true}/>
            </div>
        </LocationItemStyles>
    )
}

export default LocationListViewItem;
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
                <h3>{location.city}</h3>
                <p>
                    {location.description}
                </p>
            </div>
            <div className="buttonList">
                <DeleteButton locationID={location.id} showButton={true}/>
            </div>
        </LocationItemStyles>
    )
}

export default LocationListViewItem;
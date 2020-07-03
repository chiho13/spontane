import React, {useContext} from 'react';
import LocationItemStyles from './LocationListViewItemStyle';
import EditButton from '../../IconButtons/EditButton';
import DeleteButton from '../../IconButtons/DeleteButton';
import {useRouter} from 'next/router';
import { LocationEditorContext } from '../../providers/LocationEditorProvider';

const LocationListViewItem = (props) => {
    const {location} = props;

    const {setHoverLocation} = useContext(LocationEditorContext);
    return (
        <LocationItemStyles onMouseEnter={() => {
            setHoverLocation(location.id)
        }}
        onMouseLeave={() => {
            setHoverLocation('')
        }}
        >
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
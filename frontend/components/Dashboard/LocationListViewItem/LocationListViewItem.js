import React, { useContext } from 'react';
import LocationItemStyles from './LocationListViewItemStyle';
import EditButton from '../../IconButtons/EditButton';
import DeleteButton from '../../IconButtons/DeleteButton';
import { useRouter } from 'next/router';
import { LocationEditorContext } from '../../providers/LocationEditorProvider';

import { UserContext } from '../../Layout/DashboardLayout';
import { useMutation } from '../../hooks/useMutation';
import gql from 'graphql-tag';

const DELETE_LOCATION_MUTATION = gql`
mutation DELETE_LOCATION_MUTATION($id: ID!) {
    deleteLocation(id: $id) {
        id
    }
}
`;

const LocationListViewItem = (props) => {
    const { location } = props;

    const { user: data, loading, refetch } = useContext(UserContext);

    const [deleteLocation] = useMutation(DELETE_LOCATION_MUTATION, {
        variables: {
            id: location.id
        }
    });

    async function deleteStuff(e) {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this location?')) {
            const res = await deleteLocation();
            if (res) {
                refetch();
            }
        }
    }

    const { setHoverLocation } = useContext(LocationEditorContext);
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
                <DeleteButton  showButton={true} deleteStuff={deleteStuff} />
            </div>
        </LocationItemStyles>
    )
}

export default LocationListViewItem;
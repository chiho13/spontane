import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import LocationItemStyles from '../../styles/LocationItemStyles';
import Cross from '../../Icons/Cross';
import EditIcon from '../../Icons/Edit';

export default class Location extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired
    };

    closeLocation = () => {
        this.closeLocationDetail()
    }

    render() {
        const {location, closeLocation, isOpened} = this.props;
        return (
            <LocationItemStyles isOpened={isOpened} className="locationItem">
              
                    <a className="closeLocation_icon" onClick={closeLocation}><Cross/></a>
                <div className="location_content">
                    <h3>{location.city}, {location.country}</h3>
                    <p>
                        {location.description}
                    </p>
                </div>
                <div className="buttonList">
                    <Link
                        href={{
                        pathname: 'update',
                        query: {
                            id: location.id
                        }
                    }}>
                        <a>
                            <span>Edit
                            </span>{< EditIcon />}</a>
                    </Link>
                </div>
            </LocationItemStyles>
        );
    }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import LocationItemStyles from './styles/LocationItemStyles';
import Cross from './Icons/Cross';

export default class Location extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  closeLocation = () => {
    this.closeLocationDetail()
  }

  render() {
    const { location, closeLocation} = this.props;
    return (
      <LocationItemStyles className="locationItem">
        <Link href={{
                        pathname: '/'
                    }}>
          <a className="closeLocation_icon"onClick={closeLocation}><Cross/></a>
        </Link>
        <h3>{location.city}, {location.country}</h3>
        <p>
          {location.description}
        </p>  
        <div className="buttonList">
                    <Link
                        href={{
                        pathname: 'update',
                        query: {
                            id: location.id
                        }
                    }}>
                        <a>Edit ✏️</a>
                    </Link>
                </div>
      </LocationItemStyles>
    );
  }
}

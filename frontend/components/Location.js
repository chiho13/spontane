import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';

export default class Location extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { location } = this.props;
    return (
      <ItemStyles>
        <Title>
          <Link
            href={{
              pathname: '/location',
              query: { id: location.id },
            }}
          >
            <a>{location.country}</a>
          </Link>
        </Title>
        <p>{location.city}</p>

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
      </ItemStyles>
    );
  }
}

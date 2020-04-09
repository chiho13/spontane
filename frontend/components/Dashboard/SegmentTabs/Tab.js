import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from '@material/react-material-icon';
import Link from '../../helpers/link';

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };


  render() {
    const {
      props: {
        label,
        icon
      },
    } = this;

    let className = 'tab-list-item';

    return (
      <Link href={`/admin/locations/${label}`}>
        <a>
          <li className={className}>
            <MaterialIcon icon={icon} /> {label}
          </li>
        </a>
      </Link>
    );
  }
}

export default Tab;
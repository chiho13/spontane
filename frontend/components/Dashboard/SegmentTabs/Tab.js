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

  changeTabs = () => {
    const { label, onClick } = this.props;
    onClick(label);
  }

  render() {
    const {
      changeTabs,
      props: {
        label,
        icon, 
        activeTab,
        projectId
      },
    } = this;

    let className = 'tab-list-item';


    if (activeTab === label ) {
      className += ' tab-list-active';
    }

    return (
          <button className={className} onClick={changeTabs}>  
            <MaterialIcon icon={icon} /> {label}
          </button>
    );
  }
}

export default Tab;
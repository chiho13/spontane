import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from '@material/react-material-icon';
import Link from '../../helpers/link';

function Tab(props) {
  const { label, icon, activeTab, onClick } = props;

  function changeTabs() {
    onClick(label);
  }

  let className = 'tab-list-item';

  if (activeTab === label) {
    className += ' tab-list-active';
  }

  return (
    <button className={className} onClick={changeTabs}>
      <MaterialIcon icon={icon} /> 
      <span>
        {label}
      </span>
    </button>
  );
}

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tab;
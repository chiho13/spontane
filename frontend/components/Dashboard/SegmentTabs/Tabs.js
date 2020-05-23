import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import TabsStyle from './TabsStyle';
import Tab from './Tab';
import Router from 'next/router';

function Tabs(props) {
  const [activeTab, setActiveTab] = useState(props.children[0].props.label);

  const {children} = props;
  function onClickTabItem(tab) {
    setActiveTab(tab);
  }

  return (
    <TabsStyle>
      <ol className="tab-list">
        {children.map((child) => {
          const { label, icon} = child.props;

          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              icon={icon}
              onClick={onClickTabItem}
            />
          );
        })}
      </ol>
      <div className="tab-content">
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </TabsStyle>
  );
  
}

export default Tabs;


Tabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
}
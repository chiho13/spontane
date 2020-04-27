import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TabsStyle from './TabsStyle';
import Tab from './Tab';
import Router from 'next/router';

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }

  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.label,
    };
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  }
  
  getParam = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('view');
    return myParam
  }

  // componentDidUpdate() {
  //   this._isMounted = true;

  //   if (!this._isMounted) return;

  //   Router.onRouteChangeComplete = () => {
  //     const myParam = this.getParam();
      
  //     myParam === 'list' && this.setState({ activeTab: 'List' });
  //   };    
  // }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // componentWillMount() {
  //   const myParam = this.getParam();
  
  //   if(myParam === 'map') {
  //     this.setState({ activeTab: 'Map' });
  //   } else if(myParam === 'list') {
  //     this.setState({ activeTab: 'List' });
  //   }
  //     this.props.id && this.setState({ activeTab: 'Map' });
  // }

  render() {
    const {
      onClickTabItem,
      props: {
        children,
      },
      state: {
        activeTab
      }
    } = this;

    return (
      <TabsStyle>
        <ol className="tab-list">
          {children.map((child) => {
            const { label, icon, projectId} = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                icon={icon}
                projectId={projectId}
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
}

export default Tabs;
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TabsStyle from './TabsStyle';
import Tab from './Tab';
import Router from 'next/router';

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }

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

  componentDidUpdate() {
    Router.onRouteChangeComplete = () => {
      const myParam = this.getParam();
      
      myParam === 'List' && this.setState({ activeTab: 'List' });
    };    
  }

  componentDidMount() {
    const myParam = this.getParam();

      if(myParam === 'Map') {
        this.setState({ activeTab: 'Map' });
      } else if(myParam === 'List') {
        this.setState({ activeTab: 'List' });
      }
  }
  componentWillMount() {
      this.props.id && this.setState({ activeTab: 'Map' });
  }

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
}

export default Tabs;
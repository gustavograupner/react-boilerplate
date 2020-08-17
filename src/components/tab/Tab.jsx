import React, { useState } from 'react';
import PropTypes from 'prop-types';
import tabStyle from './tab.module.scss';

const Tab = props => {

  const [ selectedTab, setSelectedTab ] = useState(props.selectedTabIndex);

  const getClassName = (tab) => {
		let classes = tabStyle.tab + ' ';
		if (selectedTab === tab.index) {
			classes += tabStyle.selected + ' ';
		}
		return classes;
	}

  const renderTabs = () => {
    if (props.tabs) {
      return props.tabs.map((tab) => (
        <div 
					className={getClassName(tab)}
					onClick={() => { setSelectedTab(tab.index) }} key={tab.index}>
          {tab.description}
        </div>
      ));
    }
    return null;
  }

  const renderTabContent = () => {
    if (props.tabs && props.tabs.length) {
      const tab = props.tabs.find((tab) => {
        return tab.index === selectedTab
      });
  
      if (tab) {
        return tab.component();
      }
    }
    return null;
  }

  return (
    <>
      <div className={tabStyle.tabContainer} style={{justifyContent: props.justifyContent ? props.justifyContent : 'flex-start'}}>
				{ renderTabs() }
			</div>
			<div className={tabStyle.tabContent}>
			  { renderTabContent() }
			</div>	
    </>
  );
}

Tab.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      component: PropTypes.func.isRequired
    })
  ),
  selectedTabIndex: PropTypes.number.isRequired
};

export default Tab;
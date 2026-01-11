import React from 'react'
import GlobalValueTab from './GlobalValueTab';
import ScrollSmotherTab from './ScrollSmotherTab';
import ImportExportTab from './ImportExportTab';
import PageTransitionTab from './PageTransitionTab';

const GlobalSettingTabContent = ({ activeTab }) => {
  switch (activeTab) {
    case "scroll_smoother":
      return <ScrollSmotherTab/>;

    case "global":
      return <GlobalValueTab />;

    case "import_export":
      return <ImportExportTab />;

    case "page_transition":
      return <PageTransitionTab />;

    default:
      return null;
  }
}

export default GlobalSettingTabContent;
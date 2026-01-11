import React, { useState } from "react";
import GlobalSettingSidebarTabs from "./GlobalSettingSidebarTabs";
import GlobalSettingTabContent from "./GlobalSettingTabContent";

const GlobalSettingModal = () => {
  const [activeTab, setActiveTab] = useState("scroll_smoother");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="w-[900px] h-[520px] bg-[#151518] rounded-lg flex overflow-hidden">
        
        {/* Sidebar */}
        <GlobalSettingSidebarTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* Content */}
      </div>
        <div className="flex-1 p-6 overflow-auto text-white">
          <GlobalSettingTabContent activeTab={activeTab} />
        </div>
    </div>
  );
};

export default GlobalSettingModal;

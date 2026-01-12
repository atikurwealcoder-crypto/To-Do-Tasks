import React from "react";
import { Tabs } from "@/components/ui/tabs";
import GlobalSettingSidebarTabs from "./GlobalSettingSidebarTabs";
import GlobalSettingTabContent from "./GlobalSettingTabContent";

const GlobalSettingModal = () => {
  return (
    <div className="h-165.75 w-149 rounded-md bg-[#18181B]">
      <Tabs
        defaultValue="scroll_smoother"
        className="flex h-full w-full"
      >
        {/* Sidebar */}
        <aside className="h-full w-44.75 border-r border-[#3F3F46]">
          <GlobalSettingSidebarTabs />
        </aside>

        {/* Content */}
        <main className="flex-1 h-full w-104">
          <GlobalSettingTabContent />
        </main>
      </Tabs>
    </div>
  );
};

export default GlobalSettingModal;

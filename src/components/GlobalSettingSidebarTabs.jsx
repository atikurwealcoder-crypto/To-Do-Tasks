import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

const GlobalSettingSidebarTabs = () => {
  const tabs = [
    { id: "scroll_smoother", label: "Scroll Smoother" },
    { id: "global_value", label: "Global Value" },
    { id: "import_export", label: "Import / Export" },
    { id: "page_transition", label: "Page Transition" },
  ];

  return (
    <div>
      <TabsList className="w-37.258 h-full flex flex-col rounded-md gap-1 bg-transparent px-2 py-3 overflow-y-auto">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="w-37.25 h-9 rounded-md text-sm text-[#A1A1AA] transition hover:bg-[#27272A]"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
};

export default GlobalSettingSidebarTabs;

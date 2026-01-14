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
      <TabsList className=" h-full flex flex-col rounded-md gap-1 bg-transparent p-3.75 overflow-y-auto">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="w-37.25 h-9 rounded-md text-[15px] font-normal leading-5 text-[#A1A1AA] data-[state=active]:bg-[#27272A] data-[state=active]:text-[#FAFAFA] hover:bg-[#27272A]"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
};

export default GlobalSettingSidebarTabs;

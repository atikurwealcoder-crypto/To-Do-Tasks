import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import GlobalValueTab from "./GlobalValueTab";
import ScrollSmotherTab from "./ScrollSmotherTab";
import ImportExportTab from "./ImportExportTab";
import PageTransitionTab from "./PageTransitionTab";

const GlobalSettingTabContent = () => {

  

  return (
    <div className="h-full p-3 text-white">
      <TabsContent value="scroll_smoother">
        <ScrollSmotherTab />
      </TabsContent>

      <TabsContent value="global_value">
        <GlobalValueTab />
      </TabsContent>

      <TabsContent value="import_export">
        <ImportExportTab />
      </TabsContent>

      <TabsContent value="page_transition">
        <PageTransitionTab />
      </TabsContent>
    </div>
  );
};
export default GlobalSettingTabContent;

import React from "react";
import ExportSection from "./ExportSection";
import ImportSection from "./ImportSection";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { CancelCircleIcon } from "@hugeicons/core-free-icons";

const ImportExportTab = () => {
  // close button handler
  const handleCloseClick = () => {
    console.log("close button clicked");
  };
  return (
    <div>
      <div className="space-y-5 mb-5">
        <ExportSection />
        <ImportSection />
      </div>

      {/* close button */}
      <div className="flex justify-end">
        <Button
          onClick={handleCloseClick}
          size="sm"
          className="bg-[#B34A33] w-18.5 h-7.5 flex items-center gap-1 px-3 py-1.5"
        >
          <HugeiconsIcon icon={CancelCircleIcon} />
          Close
        </Button>
      </div>
    </div>
  );
};

export default ImportExportTab;

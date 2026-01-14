import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Download01Icon } from "@hugeicons/core-free-icons";
import exportAnimations from "../../public/exportData.json";
import { toast } from "sonner";

const ExportSection = () => {
   const [selectedIds, setSelectedIds] = useState([]);

  const allSelected = selectedIds.length === exportAnimations.length;

  // Toggle select all
  const toggleSelectAll = (checked) => {
    setSelectedIds(checked ? exportAnimations.map((item) => item.id) : []);
  };

  // Toggle single checkbox
  const toggleItem = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Export handler
  const saveJsonFile = async (data, filename) => {
    const jsonData = JSON.stringify(data, null, 2);

    if (window.showSaveFilePicker) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: filename,
          types: [
            {
              description: "JSON File",
              accept: { "application/json": [".json"] },
            },
          ],
        });

        const writable = await handle.createWritable();
        await writable.write(jsonData);
        await writable.close();

        toast.success("Export successful", {
          description: `${filename} saved`,
        });

        return;
      } catch (err) {
        if (err.name === "AbortError") {
          toast.error("Export Cancelled", {
            description: `${filename} exporting cancelled`,
          });
        }
        return;
      }
    }

    // fallback
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleExportSelected = () => {
    if (selectedIds.length === 0) return;

    const dataToExport =
      selectedIds.length === exportAnimations.length
        ? exportAnimations
        : exportAnimations.filter((item) => selectedIds.includes(item.id));

    saveJsonFile(dataToExport, "animations-export.json");
  };

  const handleExportSingle = (item) => {
    saveJsonFile([item], `${item.label}.json`);
  };

  return (
    <div className="w-full max-w-md rounded-xl h-65.25 bg-[#27272A] p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium">Export</h2>

        <Button
          size="icon"
          onClick={handleExportSelected}
          className="gap-1"
        >
          <HugeiconsIcon icon={Download01Icon} size={16} />
          Export
        </Button>
      </div>

      {/* Select All */}
      <div className="flex items-center gap-2 px-1">
        <Checkbox checked={allSelected} onCheckedChange={toggleSelectAll} />
        <span className="text-sm">
          Select All
          <span className="ml-1 text-xs text-[#A1A1AA]">
            ({exportAnimations.length})
          </span>
        </span>
      </div>

      {/* List */}
      <div className="space-y-1">
        {exportAnimations.slice(0, 5).map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-2 rounded-md px-1 py-1.5 hover:bg-[#3F3F46]"
          >
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedIds.includes(item.id)}
                onCheckedChange={() => toggleItem(item.id)}
              />
              <span className="text-sm">{item.label}</span>
            </div>

            <Button
              onClick={() => handleExportSingle(item)}
              className="bg-[#3F3F46] w-5 h-5 rounded-full p-1.5"
            >
              <HugeiconsIcon icon={Download01Icon} size={16} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExportSection
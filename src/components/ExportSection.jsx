import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Download01Icon } from "@hugeicons/core-free-icons";
import { toast } from "sonner";

const ExportSection = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [animationData, setAnimationData] = useState([]);

  useEffect(() => {
    fetch("/exportData.json")
      .then((res) => res.json())
      .then((json) => setAnimationData(json))
      .catch(console.error);
  }, []);

  const allSelected = selectedIds.length === animationData.length;

  // Toggle select all
  const toggleSelectAll = (checked) => {
    setSelectedIds(checked ? animationData.map((item) => item.id) : []);
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
      selectedIds.length === animationData.length
        ? animationData
        : animationData.filter((item) => selectedIds.includes(item.id));

    saveJsonFile(dataToExport, "animations-export.json");
  };

  const handleExportSingle = (item) => {
    saveJsonFile([item], `${item.label}.json`);
  };

  return (
    <div className="w-96.5 rounded-md h-65.25 bg-[#27272A] p-3.75 space-y-3.75">
      {/* Header */}
      <div className="w-89 h-7.5 flex items-center justify-between">
        <h2 className="text-[15px] font-normal leading-5 text-white">Export</h2>

        <Button
          size="icon"
          onClick={handleExportSelected}
          className="flex items-center gap-1 text-[13px] font-normal leading-4.5 w-19.75 px-3 py-1.5 rounded-md h-full bg-[#3F3F46] text-[#FAFAFA]"
        >
          <HugeiconsIcon icon={Download01Icon} className="h-3 w-3" />
          Export
        </Button>
      </div>

      {/* Select All */}
      <div className="flex items-center gap-1.5 w-27.5 h-4.5">
        <Checkbox
          checked={allSelected}
          onCheckedChange={toggleSelectAll}
          className="text-[#A1A1AA] w-3.25 h-3.25"
        />
        <p className="text-sm font-normal leading-4.5 w-14.5 h-full">
          Select All
        </p>
        <span className="text-xs font-normal leading-4.5 text-white bg-[#166272] w-6 h-full rounded-xl px-1.25">
          {animationData.length}
        </span>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {animationData.slice(0, 5).map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedIds.includes(item.id)}
                onCheckedChange={() => toggleItem(item.id)}
                className="text-[#A1A1AA] w-3.25 h-3.25"
              />
              <span className="text-sm font-normal leading-4.5">
                {item.label}
              </span>
            </div>

            <button
              onClick={() => handleExportSingle(item)}
              className="bg-[#3F3F46] w-5 h-5 rounded-full p-1 flex items-center justify-center cursor-pointer"
            >
              <HugeiconsIcon
                icon={Download01Icon}
                className="w-2.5 h-2.5 text-[#E4E4E7]"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExportSection;

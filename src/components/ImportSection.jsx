import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Upload01Icon } from "@hugeicons/core-free-icons";

const ImportSection = () => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const isValidJson = (file) => file && file.type === "application/json";

  const handleFile = (file) => {
    if (!isValidJson(file)) {
      // setError("Only JSON files are allowed");
      setFile(null);
      return;
    }

    setError("");
    setFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  //   import button click handler
  const handleImport = () => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        console.log("Imported JSON:", jsonData);
      } catch {
        setError("Invalid JSON structure");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-md h-78 rounded-xl bg-[#27272A] p-3.75 space-y-3.75">
      <h2 className="text-sm font-medium">Import</h2>

      {/* Drop zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border border-dashed border-[#71717A] bg-[#18181B] rounded-lg p-3.75 text-center space-y-3 w-89 h-39.5"
      >
        <div className="flex flex-col items-center">
          <img src="/file-icon.png" alt="" className="w-12 h-14" />
          {file && <p className="text-xs text-green-400">{file.name}</p>}

          <p className="text-[13px] font-normal leading-4.5 text-[#A1A1AA]">
            Drag and drop or upload.json file
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".json"
          hidden
          onChange={(e) => handleFile(e.target.files[0])}
        />

        <Button
          onClick={() => inputRef.current.click()}
          className="bg-[#3F3F46] w-22 h-7.5 px-3 py-1.5 rounded-md text-[#FAFAFA] text-[13px] font-normal leading-4.5"
        >
          Browse file
        </Button>

        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>

      <div className="space-y-2">
        <p className="text-[13px] font-normal leading-4.5 text-[#E4E4E7]">
          Streamlined data import solutions for enhanced accessibility and
          control
        </p>

        <Button
          onClick={handleImport}
          // disabled={!file}
          className="gap-1 bg-[#3F3F46] w-20 h-7.5 rounded-md px-3 py-1.5"
        >
          <HugeiconsIcon icon={Upload01Icon} />
          Import
        </Button>
      </div>
    </div>
  );
};

export default ImportSection;

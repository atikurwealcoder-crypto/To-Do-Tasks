import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon } from "@hugeicons/core-free-icons";
import { toast } from "sonner";
import { debounceFn } from "../lib/utils";

const ModalInfoTextAreaField = ({
  label = "Current Class (Short)",
  value = "",
  placeholder = "Enter Current Class",
  onUpdateValue = () => {},
}) => {
  const [inputValue, setInputValue] = useState(value ?? "");

  //   handle copy text
  const handleCopy = async (inputText) => {
    if (!inputText) return;

    try {
      await navigator.clipboard.writeText(inputText);
      console.log(value)
      toast.success("Copy successful", {
        description: "Text copied to clipboard",
      });
    } catch (err) {
      toast.error("Copy Failed", {
        description: "Failed to copy text",
      });
    }
  };

  //   handle input field
  const handleInput = debounceFn((newValue) => {
    onUpdateValue(newValue);
  }, 150);

  return (
    <div className="w-123 h-36.75 space-y-2">
      {/* label */}
      <div className="flex items-center justify-between">
        <p className="text-[#FAFAFA] text-[15px] font-normal leading-5">
          {label ?? ""}
        </p>
        {/* copy button */}
        <button
          onClick={() => handleCopy(inputValue)}
          className="cursor-pointer bg-[#3f3f46] w-5 h-5 p-1 rounded-full flex items-center justify-center"
          title="Copy"
        >
          <HugeiconsIcon
            icon={Copy01Icon}
            className=" text-[#E4E4E7] w-2.5 h-2.5"
          />
        </button>
      </div>

      {/* Input */}
      <Textarea
        value={inputValue}
        onChange={(e) => {
          const value = e.target.value;
          setInputValue(value);
          handleInput(value);
        }}
        placeholder={placeholder ?? "placeholder"}
        className="bg-[#3F3F46] text-[#FAFAFA] text-sm font-normal leading-4.5 px-3 py-2 w-full h-29.75 border-none resize-none focus-visible:ring-0 placeholder:text-[#A1A1AA]"
      />
    </div>
  );
};

export default ModalInfoTextAreaField;

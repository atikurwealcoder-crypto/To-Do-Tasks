import React, { useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  InformationCircleIcon,
  Delete01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const CodeblockField = ({
  property = {},
  value = "",
  onDelete = () => {},
  onDisabledUpdate = () => {},
  onValueChange = () => {},
}) => {
  const {
    title = "Custom",
    tooltipContent = "Enter the value.",
    isRequired = false,
    isCustomAnim = true,
    ...rest
  } = property || {};

  const [code, setCode] = useState(value);

  // optional: sync if HOC changes value
  useEffect(() => {
    setCode(value || "");
  }, [value]);

  const commitValue = (raw) => {
    setCode(raw);
    onValueChange(raw);
  };

  return (
    <div className="w-88.75 h-25 space-y-3">
      {/* Header */}
      <div className="w-full h-4.5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-white text-[11.5px] font-normal leading-4.5">
            {title}
          </span>

          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <HugeiconsIcon
                  icon={InformationCircleIcon}
                  className="w-3 h-3 text-gray-400"
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipContent}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {isCustomAnim && (
          <Button onClick={onDelete} className="has-[>svg]:px-0">
            <HugeiconsIcon
              icon={Delete01Icon}
              size={5}
              className="text-[#A1A1AA] w-5 h-5"
            />
          </Button>
        )}
    
      </div>

      {/* Code block */}
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onBlur={() => commitValue(code)}
        placeholder="x:1, y:2"
        spellCheck={false}
        className="w-full min-h-17.5 resize-none bg-[#3F3F46] text-[#FAFAFA] text-[11.5px] font-normal leading-4.5 px-2.5 py-1.25 outline-none placeholder:text-[#A1A1AA]"
      />

      {/* required message */}
      {isRequired && isDataValid && (
        <p className="text-white text-sm">Field is Required</p>
      )}
    </div>
  );
};

export default CodeblockField;

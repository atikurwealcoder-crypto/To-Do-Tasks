import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Input } from "./ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import { InformationCircleFreeIcons } from "@hugeicons/core-free-icons";

const ClassSelectionField = ({
  label = "Applied on Class",
  tooltipContent = "Start Trigger defines the element that triggers the animation, e.g., '.trigger' triggers the animation when the trigger element enters the viewport",
  isRequired = false,
  isValid = () => {},
}) => {
  const [value, setValue] = useState("");
  const [isDataValid, setIsDataValid] = useState(false);

  return (
    <div className="p-2">
      <div>
        {/* label + tooltip */}
        <div className="flex items-center gap-3 text-[#E4E4E7] mb-2">
          <h2 className="text-white text-sm">{label}</h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <HugeiconsIcon
                  icon={InformationCircleFreeIcons}
                  className="w-2.5 h-2.5"
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipContent}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/*input field*/}
        <div className="relative flex items-center gap-2 mb-2">
          <Input
            placeholder="h1.hero_title"
            className="flex items-center justify-center w-full"
            value={value}
            type="text"
            onChange={(e) => {
              const value = e.target.value;
              setValue(value);
            }}
          />

          {/* inside input field- right side circle */}
          <div className="absolute top-1.75 right-2 w-5 h-5 rounded-full border-2 border-[#E4E4E7]"/>
          <div className="absolute top-2.25 right-4.25 h-0.75 w-0.5 bg-[#E4E4E7]"/>
          <div className="absolute top-4 right-2.5 h-0.5 w-0.75 bg-[#E4E4E7]"/>
          <div className="absolute bottom-2.25 right-4.25 h-0.75 w-0.5 bg-[#E4E4E7]"/>
          <div className="absolute top-4 right-5.75 h-0.5 w-0.75 bg-[#E4E4E7]"/>
        </div>
      </div>

      {/* required message */}
      <div>
        <p className="text-white text-sm">
          {isRequired && "Field is Required"}
        </p>
      </div>
    </div>
  );
};

export default ClassSelectionField;

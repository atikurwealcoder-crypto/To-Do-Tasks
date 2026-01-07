import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Input } from "./ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import { InformationCircleFreeIcons } from "@hugeicons/core-free-icons";

const TextField = ({
  label = "Trigger",
  tooltipContent = "Start Trigger defines the element that triggers the animation, e.g., '.trigger' triggers the animation when the trigger element enters the viewport",
  
  isRequired = false,
  isValid = () => {},
}) => {
  const [value, setValue] = useState("");
  const [isDataValid, setIsDataValid] = useState(false);

  return (
    <div className="p-4">
      <div className="flex flex-col justify-between gap-3 rounded-lg sm:flex-row sm:items-center">
        {/* left label + tooltip */}
        <div className="flex items-center gap-3 text-[#E4E4E7]">
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

        {/* right add + delete button */}
        <div className="flex items-center gap-2">
          <Input
            placeholder=".start_trigger"
            className="flex items-center justify-center w-62.75"
            value={value}
            type="text"
            onChange={(e) => {
              const value = e.target.value;
              setValue(value);
            }}
          />
        </div>
      </div>
      <div>
        <p>{isRequired && "Field is Required"}</p>
      </div>
    </div>
  );
};

export default TextField;

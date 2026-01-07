import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Input } from "./ui/input";
import {
  Delete01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "./ui/button";
import Wheeler from "./Wheeler";

const RotationField = ({
  label = "Rotate",
  tooltipContent = "Adjust Rotate Value",
  config = {
    min: 0,
    max: 360,
    defaultValue: 0,
  },
  isRequired = false,
  isValid = () => {},
  onDelete,
  isCustomAnim = true,
}) => {
  const [value, setValue] = useState(config.defaultValue);
  const [isDataValid, setIsDataValid] = useState(false);

  return (
    <div className="p-2">
      <div className="flex flex-col justify-between gap-3 rounded-lg sm:flex-row sm:items-center">
        {/* left label + tooltip */}
        <div className="flex items-center gap-3 text-[#E4E4E7]">
          <h2 className="text-white text-sm">{label}</h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <HugeiconsIcon
                  icon={InformationCircleIcon}
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
          {/* knob wheeler icon */}
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative flex items-center justify-center rounded-full bg-[#A1A1AA] shadow-sm w-5 h-5">
                {/* Indicator line */}
                <div className="absolute top-1 h-2 w-0.5 rounded bg-primary" />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <Wheeler
                min={config.min}
                max={config.max}
                value={value}
                onChange={setValue}
              />
            </PopoverContent>
          </Popover>

          <Input
            placeholder="Add Value"
            className="flex items-center justify-center w-28"
            value={value}
            min={config.min}
            max={config.max}
            type="number"
            onChange={(e) => {
              const value = e.target.value;
              setValue(value);
            }}
          />
          {isCustomAnim && (
            <Button>
              <HugeiconsIcon
                icon={Delete01Icon}
                onClick={onDelete}
                className="text-[#A1A1AA]"
              />
            </Button>
          )}
        </div>
      </div>
      {/* required message */}
      <div>
        <p className="text-white text-sm">{isRequired && "Field is Required"}</p>
      </div>
    </div>
  );
};

export default RotationField;

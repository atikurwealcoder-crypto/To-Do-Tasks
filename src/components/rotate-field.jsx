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

const RotateField = ({
  label = "Rotate",
  defaultValue = 0,
  min = 0,
  max = 360,
  onDelete,
  isCustomAnim = true,
}) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="flex flex-col justify-between gap-3 rounded-lg p-4 sm:flex-row sm:items-center">
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
            <p>Adjust scale value</p>
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
            min={min} 
            max={max} 
            value={value} 
            onChange={setValue} />
          </PopoverContent>
        </Popover>

        <Input
          placeholder="Add Value"
          className="flex items-center justify-center w-28"
          value={value}
          min={min}
          max={max}
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
  );
};

export default RotateField;

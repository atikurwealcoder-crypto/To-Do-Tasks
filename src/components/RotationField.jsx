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
import { debounceFn } from "../lib/utils";

const RotationField = ({
  label = "Rotate",
  tooltipContent = "Adjust Rotate Value",
  value = 0,
  config = { min: 0, max: 360 },
  isRequired = false,
  onUpdateValue = () => {},
  onDisabledUpdate = () => {},
  onDelete,
  isCustomAnim = true,
}) => {
  const [inputValue, setInputValue] = useState(value ?? 0);
  const [isDataValid, setIsDataValid] = useState(false);

  const clamp = (num, min, max) => Math.min(max, Math.max(min, num));

  const handleRotationValue = (rawValue) => {
    let currentValue = Number(rawValue);
    if (Number.isNaN(currentValue)) return;

    currentValue = clamp(currentValue, config.min, config.max);
    setInputValue(currentValue);
    onUpdateValue(currentValue);
  };

  // input handler
  const handleInput = debounceFn((value) => {
    handleRotationValue(value);
  }, 150);

  return (
    <div className="p-2">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        {/* label */}
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
            <TooltipContent>{tooltipContent}</TooltipContent>
          </Tooltip>
        </div>

        {/* controls */}
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative flex items-center justify-center rounded-full bg-[#A1A1AA] shadow-sm w-5 h-5">
                <div className="absolute top-1 h-2 w-0.5 rounded bg-primary" />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <Wheeler
                min={config?.min}
                max={config?.max}
                value={inputValue}
                onChange={handleInput}
              />
            </PopoverContent>
          </Popover>

          <Input
            type="number"
            value={inputValue}
            min={config?.min}
            max={config?.max}
            className="w-28"
            onChange={(e) => handleInput(e.target.value)}
          />

          {isCustomAnim && (
            <Button onClick={onDelete}>
              <HugeiconsIcon icon={Delete01Icon} className="text-[#A1A1AA]" />
            </Button>
          )}
        </div>
      </div>

      {isRequired && <p className="text-white text-sm">Field is Required</p>}
    </div>
  );
};

export default RotationField;

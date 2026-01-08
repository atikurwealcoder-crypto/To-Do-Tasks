import React, { useEffect, useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Input } from "./ui/input";
import {
  Delete01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "./ui/button";
import { debounceFn } from "../lib/utils";

const NumberField = ({
  label = "MinWidth",
  tooltipContent = "MinWidth Value",
  config = {
    min: 0,
    max: 100,
  },
  onDelete,
  isRequired = false,
  isValid = () => {},
  onUpdateValue = () => {},
  isCustomAnim = true,
}) => {
  const [inputValue, setInputValue] = useState(0);
  const [isDataValid, setIsDataValid] = useState(false);

  const handleInput = debounceFn((rewValue) => {
    if (rewValue === "" || rewValue === "-") return;

    let currentValue = Number(rewValue);
    if (isNaN(currentValue)) return;
    if (currentValue < config.min) currentValue = config.min;
    if (currentValue > config.max) currentValue = config.max;

    setInputValue(currentValue);
    onUpdateValue(currentValue);
  }, 150);

  return (
    <div className="p-2">
      <div className="flex flex-col justify-between gap-3 w-97.5 h-8.5 mx-auto rounded-lg sm:flex-row sm:items-center">
        {/* left label + tooltip */}
        <div className="flex items-center gap-3 text-[#E4E4E7]">
          <h2 className="text-white text-sm w-16.5 h-4.5">{label}</h2>
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
        <div className="flex items-center gap-2 w-34.5 h-8.5">
          <Input
            placeholder="Add Value"
            className="flex items-center justify-center w-28.5"
            value={inputValue}
            min={config.min}
            max={config.max}
            type="number"
            onChange={(e) => {
              const value = e.target.value;
              setInputValue(value);
              handleInput(value);
            }}
          />
          {isCustomAnim && (
            <Button size="icon">
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
        <p className="text-white text-sm">
          {isRequired && "Field is Required"}
        </p>
      </div>
    </div>
  );
};

export default NumberField;

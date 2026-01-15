import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Input } from "./ui/input";
import {
  ArrowDataTransferHorizontalIcon,
  Delete01Icon,
  InfinityIcon,
  InformationCircleIcon,
  ShuffleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "./ui/button";
import { debounceFn } from "../lib/utils";

const RepeatField = ({
  label = "Repeat",
  tooltipContent = "Repeat Value",
  value = 0,
  config = {
    min: 0,
    max: 0,
  },
  isRequired = false,
  onUpdateValue = () => {},
  onDisabledUpdate = () => {},
  onUpdateYoyo = () => {},
  onDelete,
  isCustomAnim = true,
}) => {
  const [inputValue, setInputValue] = useState(value ?? 0);
  const [isDataValid, setIsDataValid] = useState(false);

  const updateRepeat = (val) => {
    setInputValue(val);
    onUpdateValue(val);
  };

  const handleInput = debounceFn((rewValue) => {
    if (rewValue === "" || rewValue === "-") return;

    let currentValue = Number(rewValue);
    if (isNaN(currentValue)) return;

    if (config?.min !== 0 || config?.max !== 0) {
      if (currentValue < config?.min) currentValue = config?.min;
      if (currentValue > config?.max) currentValue = config?.max;

      updateRepeat(currentValue);
      onUpdateYoyo(false);
      return;
    }

    updateRepeat(currentValue);
  }, 150);

  const setInfinity = () => {
    updateRepeat(-1);
    onUpdateYoyo(false);
  };

  const setShuffle = () => {
    updateRepeat(1);
    onUpdateYoyo(true);
  };

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

        {/* right */}
        <div className="flex items-center gap-2">
          <Input
            placeholder="Add Value"
            className="flex items-center justify-center w-28"
            value={inputValue}
            min={config?.min === 0 ? Infinity : config?.min}
            max={config?.max === 0 ? Infinity : config?.max}
            type="number"
            onChange={(e) => {
              const value = e.target.value;
              setInputValue(value);
              handleInput(value);
            }}
          />
          {/* Infinity */}
          <Button
            size="icon"
            onClick={setInfinity}
            className="bg-[#3F3F46] w-8.5 h-8.5 rounded-md hover:bg-none"
          >
            <HugeiconsIcon icon={InfinityIcon} className="text-[#A1A1AA]" />
          </Button>

          {/* Shuffle */}
          <Button
            size="icon"
            onClick={setShuffle}
            className="bg-[#3F3F46] w-8.5 h-8.5 rounded-md hover:bg-none"
          >
            <HugeiconsIcon
              icon={ArrowDataTransferHorizontalIcon}
              className="text-[#A1A1AA]"
            />
          </Button>

          {/* delete button */}
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

export default RepeatField;

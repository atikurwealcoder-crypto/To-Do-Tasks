import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Input } from "./ui/input";
import {
  ArrowDataTransferHorizontalIcon,
  Delete01Icon,
  InfinityIcon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "./ui/button";
import { debounceFn } from "../lib/utils";

const RepeatField = ({
  property = {},
  value = { repeat: 0, yoyo: false },
  onValueChange = () => {},
  onDisabledUpdate = () => {},
  onDelete = () => {},
}) => {
  // default value
  const {
    title = "Repeat",
    tooltipContent = "Enter the value.",
    isRequired = false,
    isCustomAnim = true,
    min = 0,
    max = 0,
    path = "",
    ...rest
  } = property || {};

  const [inputValue, setInputValue] = useState(value.repeat ?? 0);
  const [isDataValid, setIsDataValid] = useState(false);

  const updateValue = (newValues) => {
    onValueChange({
      ...value,
      ...newValues,
    });
  };

  const handleInput = debounceFn((rewValue) => {
    if (rewValue === "" || rewValue === "-") return;

    let currentValue = Number(rewValue);
    if (isNaN(currentValue)) return;

    if (min !== 0 || max !== 0) {
      if (currentValue < min) currentValue = min;
      if (currentValue > max) currentValue = max;

      setInputValue(currentValue);
      updateValue({
        repeat: currentValue,
        yoyo: false,
      });
      return;
    }

    setInputValue(currentValue);
    updateValue({
      repeat: currentValue,
      yoyo: false,
    });
  }, 150);

  const setInfinity = () => {
    setInputValue(-1);
    updateValue({
      repeat: -1,
      yoyo: false,
    });
  };

  const setShuffle = () => {
    const shuffleValue = Math.max(value.repeat ?? 0, 1);
    setInputValue(shuffleValue);
    updateValue({
      repeat: shuffleValue,
      yoyo: true,
    });
  };

  return (
    <div className="p-2">
      <div className="flex flex-col justify-between gap-3 rounded-lg sm:flex-row sm:items-center">
        {/* left label + tooltip */}
        <div className="flex items-center gap-3 text-[#E4E4E7]">
          <h2 className="text-white text-sm">{title}</h2>
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
            min={min === 0 ? Infinity : min}
            max={max === 0 ? Infinity : max}
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
      {isRequired && <p className="text-red-500 text-sm">Field is Required</p>}
    </div>
  );
};

export default RepeatField;

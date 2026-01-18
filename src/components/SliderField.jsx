import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "./ui/button";
import { debounceFn } from "../lib/utils";

const SliderField = ({
  property = {},
  value = 0,
  onValueChange = () => {},
  onDisabledUpdate = () => {},
  onDelete = () => {},
}) => {
  const {
    title = "Scale",
    tooltipContent = "Adjust scale value",
    min = 0,
    max = 8000,
    step = 1,
    path = "",
    isRequired = false,
    isCustomAnim = true,
    ...rest
  } = property || {};

  const [inputValue, setInputValue] = useState(value ?? 0);
  const [isDataValid, setIsDataValid] = useState(false);

  // input handler
  const handleInput = debounceFn((rewValue) => {
    if (rewValue === "" || rewValue === "-") return;

    let currentValue = Number(rewValue);
    if (isNaN(currentValue)) return;

    if (min !== 0 || max !== 0) {
      if (currentValue < min) currentValue = min;
      if (currentValue > max) currentValue = max;
      setInputValue(currentValue);
      onValueChange(currentValue);
      return;
    }
    setInputValue(currentValue);
    onValueChange(currentValue);
  }, 150);

  return (
    <div className="p-2">
      <div className="flex flex-col gap-3 rounded-lg  sm:flex-row sm:items-center">
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

        {/* middle slider */}
        <div className="flex-1">
          <Slider
            value={[inputValue]}
            min={min}
            max={max}
            step={step}
            onValueChange={(v) => setInputValue(v)}
            className="flex-1"
          />
        </div>

        {/* right add + delete button */}
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
        <p className="text-white text-sm">
          {isRequired && "Field is Required"}
        </p>
      </div>
    </div>
  );
};

export default SliderField;

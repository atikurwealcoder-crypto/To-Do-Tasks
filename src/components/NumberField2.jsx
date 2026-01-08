import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Input } from "./ui/input";
import {
  InformationCircleIcon,
  MinusSignIcon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "./ui/button";
import { debounceFn } from "../lib/utils";

const NumberField2 = ({
  label = "Delay",
  tooltipContent = "Delay sets a pause before starting the animation, e.g., 2 waits 2 seconds before animating",
  config = {
    min: 0,
    max: 2,
    step: 0.1,
  },
  isRequired = false,
  onUpdateValue = () => {},
  isValid = () => {},
}) => {
  const [inputValue, setInputValue] = useState(0);
  // console.log(inputValue)
  const [isDataValid, setIsDataValid] = useState(false);

  const round = (value) => Math.round(value * 100) / 100;

  // value handler
  const commitValue = (rawValue) => {
    let updateValue = Number(rawValue);
    if (Number.isNaN(updateValue)) return;

    updateValue = Math.min(config.max, Math.max(config.min, updateValue));
    updateValue = round(updateValue);

    console.log(updateValue);
    setInputValue(updateValue);
    onUpdateValue(updateValue);
  };

// input handler
  const handleInput = debounceFn((value) => {
    commitValue(value);
  }, 150);

  // plus minus button click handler
  const updateValue = (step) => {
    commitValue(step);
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

        {/* right add + delete button */}
        <div className="flex items-center gap-2 ">
          <div className="relative">
            <Input
              placeholder="Add Value"
              className="flex items-center justify-center w-62.5"
              value={inputValue}
              min={config.min}
              max={config.max}
              step={config.step}
              type="number"
              onChange={(e) => {
                const value = e.target.value;
                setInputValue(value);
                handleInput(value);
              }}
            />
            {/* plus - minus icon */}
            <div className="flex items-center justify-center absolute right-2 top-1.25 bg-[#52525B] h-6 rounded-sm">
              <Button
                size="icon"
                onClick={() => updateValue(inputValue - config.step)}
              >
                <HugeiconsIcon
                  icon={MinusSignIcon}
                  className="text-[#E4E4E7]"
                />
              </Button>
              <div className="w-px h-6 bg-[#71717A]" />

              <Button
                size="icon"
                onClick={() => updateValue(inputValue + config.step)}
              >
                <HugeiconsIcon icon={PlusSignIcon} className="text-[#E4E4E7]" />
              </Button>
            </div>
          </div>
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

export default NumberField2;

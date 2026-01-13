import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Input } from "./ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete01Icon,
  InformationCircleFreeIcons,
} from "@hugeicons/core-free-icons";
import { debounceFn } from "../lib/utils";
import { Button } from "./ui/button";

const TextField = ({
  label = "Trigger",
  tooltipContent = "Give a Value",
  value = "",
  isRequired = false,
  isCustomAnim = true,
  onUpdateValue = () => {},
  onDisabledUpdate = () => {},
  onDelete = () => {},
}) => {
  const [inputValue, setInputValue] = useState(value ?? "");
  const [isDataValid, setIsDataValid] = useState(false);

  const handleInput = debounceFn((newValue) => {
    onUpdateValue(newValue);
  }, 150);

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
            value={inputValue}
            type="text"
            onChange={(e) => {
              const value = e.target.value;
              setInputValue(value);
              handleInput(value);
            }}
          />
          {isCustomAnim && (
            <Button size="icon" onClick={onDelete}>
              <HugeiconsIcon icon={Delete01Icon} className="text-[#A1A1AA]" />
            </Button>
          )}
        </div>
      </div>
      {/* required message */}
      {isRequired && <p className="text-red-500">"Field is Required"</p>}
    </div>
  );
};

export default TextField;

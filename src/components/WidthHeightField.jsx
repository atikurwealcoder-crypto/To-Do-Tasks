import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Input } from "./ui/input";
import {
  Delete01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "./ui/button";
import { debounceFn } from "../lib/utils";

const WidthHeightField = ({
  property = {},
  value = 0,
  onValueChange = () => {},
  onDisabledUpdate = () => {},
  onDelete = () => {},
}) => {
  const {
    title = "MinWidth",
    tooltipContent = "MinWidth Value",
    min = 0,
    max = 0,
    fieldData = [
      { title: "%", value: "%" },
      { title: "px", value: "px" },
      { title: "em", value: "em" },
      { title: "ch", value: "ch" },
      { title: "rem", value: "rem" },
      { title: "vh", value: "vh" },
      { title: "vw", value: "vw" },
      { title: "svh", value: "svh" },
      { title: "svw", value: "svw" },
    ],
    path = "",
    isRequired = false,
    isCustomAnim = true,
    ...rest
  } = property || {};

  const [inputValue, setInputValue] = useState(value ?? 0);
  const [selectedValue, setSelectedValue] = useState("");
  const [isDataValid, setIsDataValid] = useState(false);

  const handleSelect = (value) => {
    console.log(value);
    setSelectedValue(value);
    onValueChange(value);
  };

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
    <div className="w-88.75 h-7 p-0.5">
      <div className="flex flex-col justify-between gap-3 mx-auto rounded-lg sm:flex-row sm:items-center">
        {/* left label + tooltip */}
        <div className="flex items-center gap-3 text-[#E4E4E7]">
          <h2 className="text-white text-sm w-16.5 h-4.5">{title}</h2>
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
        <div className="flex items-center gap-3 w-38.5 h-7">
          <div className="relative">
            <Input
              placeholder="Add Value"
              className="flex items-center justify-center w-32.5 h-7"
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
            <Select value={selectedValue} onValueChange={handleSelect}>
              <SelectTrigger
                className="absolute top-0.75 right-0.5 w-8 data-[size=default]:h-5.5 pl-1.5 py-0.5 pr-0.5 bg-[#52525B] text-[11.5px] text-[#A1A1AA] gap-0.5"
              >
                <SelectValue placeholder="%" />
              </SelectTrigger>
              <SelectContent className="bg-[#3F3F46] w-11.5 h-50.5 p-0.5 rounded-md">
                {fieldData.map((field, index) => (
                  <SelectItem
                    key={index}
                    value={field.value}
                    className="text-[#A1A1AA] focus:bg-[#27272A] focus:text-[#A1A1AA] w-10.5 h-5.5 pl-1.5 py-0.5 pr-0.5 text-[11.5px]"
                  >
                    {field.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {isCustomAnim && (
            <Button onClick={onDelete} className="has-[>svg]:px-0">
              <HugeiconsIcon
                icon={Delete01Icon}
                size={5}
                className="text-[#A1A1AA] w-3 h-3"
              />
            </Button>
          )}
        </div>
      </div>

        {/* required message */}
      {isRequired && isDataValid && (
        <p className="text-white text-sm">Field is Required</p>
      )}
    </div>
  );
};

export default WidthHeightField;

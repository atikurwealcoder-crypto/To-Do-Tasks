import React, { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
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
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { parseCssValue, toCssValue } from "../lib/cssValue";

const WidthHeightField = ({
  property = {},
  value = "",
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

  const [inputValue, setInputValue] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState("px");
  const [isDataValid, setIsDataValid] = useState(false);

  // sync incoming value
  useEffect(() => {
    const parsedValue = parseCssValue(value, "px");

    setInputValue(parsedValue?.value);
    setSelectedUnit(parsedValue?.unit);
  }, [value]);

  // helper function to send data to HOC
  const updateValue = (next = {}) => {
    const nextValue = next.value ?? inputValue ?? 0;
    const nextUnit = next.unit ?? selectedUnit ?? "px";
    onValueChange(toCssValue(nextValue, nextUnit));
  };

  // input value handler
  const handleInput = debounceFn((rewValue) => {
    if (rewValue === "" || rewValue === "-") return;

    let currentValue = Number(rewValue);
    if (isNaN(currentValue)) return;

    if (min !== 0 || max !== 0) {
      if (currentValue < min) currentValue = min;
      if (currentValue > max) currentValue = max;
      setInputValue(currentValue);
      updateValue({ value: currentValue });
      return;
    }

    setInputValue(currentValue);
    updateValue({ value: currentValue });
  }, 150);

  // unit select handler
  const handleSelect = (unit) => {
    setSelectedUnit(unit);
    updateValue({ unit });
  };

  return (
    <div className="w-64 h-7 p-0.5">
      <div className="flex flex-col justify-between rounded-lg sm:flex-row sm:items-center">
        {/* left title + tooltip */}
        <div className="w-18.75 h-4.5 flex items-center gap-1.5">
          <h2 className="text-white text-[11.5px] font-normal leading-4.5">
            {title}
          </h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <HugeiconsIcon
                  icon={InformationCircleIcon}
                  className="w-2.5 h-2.5 text-[#E4E4E7]"
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipContent}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* right input + delete button */}
        <div className="flex items-center gap-3 w-37.5 h-7">
          {/* input group (input field + unit selector) */}
          <InputGroup className="border-none bg-[#303033] w-32.5 h-7 has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[>[data-align=inline-end]]:[&>input]:pr-1">
            <InputGroupInput
              placeholder="Add Value"
              className="text-[11.5px] font-normal leading-4.5"
              value={inputValue}
              min={min === 0 ? Infinity : min}
              max={max === 0 ? Infinity : max}
              type="number"
              onChange={(e) => handleInput(e.target.value)}
            />
            <InputGroupAddon align="inline-end" className="pr-2.5">
              <Select value={selectedUnit} onValueChange={handleSelect}>
                <SelectTrigger className="min-w-8 data-[size=default]:h-5.5 pl-1.5 py-0.5 pr-0.5 bg-[#27272A] text-[11.5px] text-[#A1A1AA] gap-0.5">
                  <SelectValue placeholder={selectedUnit} />
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
            </InputGroupAddon>
          </InputGroup>

          {/* delete button */}
          {isCustomAnim && (
            <Button
              onClick={onDelete}
              className="has-[>svg]:px-0 bg-transparent hover:bg-transparent cursor-pointer"
            >
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

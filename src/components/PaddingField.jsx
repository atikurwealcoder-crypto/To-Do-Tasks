import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Input } from "./ui/input";
import {
  DashedLine02Icon,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "./ui/button";
import { debounceFn } from "../lib/utils";

const popoverData = [
  { title: "Top", key: "top" },
  { title: "Right", key: "right" },
  { title: "Bottom", key: "bottom" },
  { title: "Left", key: "left" },
];

const PaddingField = ({
  property = {},
  value = 0,
  onValueChange = () => {},
  onDisabledUpdate = () => {},
  onDelete = () => {},
}) => {
  const {
    title = "Padding",
    tooltipContent = "Padding Value",
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

  const [unit, setUnit] = useState(selectedValue || "rem");
  const [sides, setSides] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  const handleSelect = (value) => {
    setSelectedValue(value);
    setUnit(value);

    onValueChange({
      unit: value,
      ...sides,
    });
  };

  const increaseSide = (side) => {
    setSides((prev) => {
      const updated = {
        ...prev,
        [side]: prev[side] + 1,
      };

      onValueChange({
        unit,
        ...updated,
      });

      return updated;
    });
  };

  const getInputDisplayValue = () => {
    const { top, right, bottom, left } = sides;

    const hasCustomSides = [top, right, bottom, left].some((v) => v !== 0);

    if (hasCustomSides) {
      return `${top},${right},${bottom},${left}`;
    }

    return inputValue;
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

  const hasCustomSides = Object.values(sides).some((v) => v !== 0);

  return (
    <div className="w-88.75 h-7 p-0.5">
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        {/* left title + tooltip */}
        <div className="w-16.5 h-4.5 flex items-center gap-3 text-[#E4E4E7]">
          <h2 className="text-white text-[11.5px] font-normal leading-4.5">
            {title}
          </h2>
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

        {/* right input + delete button */}
        <div className="w-47.5 h-7 flex items-center gap-3">
          {/* input and custom popover */}
          <div className="flex items-center gap-2 w-41.5 h-7">
            <div className="relative">
            {/* input field */}
              <Input
                placeholder="Add Value"
                className="flex items-center justify-center w-32.5 h-7 text-[11.5px] font-normal leading-4.5"
                value={getInputDisplayValue()}
                min={min === 0 ? Infinity : min}
                max={max === 0 ? Infinity : max}
                type="text"
                disabled={hasCustomSides}
                onChange={(e) => {
                  if (hasCustomSides) return;
                  const value = e.target.value;
                  setInputValue(value);
                  handleInput(value);
                }}
              />

              {/* unit selection button */}
              <Select value={selectedValue} onValueChange={handleSelect}>
                <SelectTrigger className="absolute top-0.75 right-0.5 w-8 data-[size=default]:h-5.5 pl-1.5 py-0.5 pr-0.5 bg-[#52525B] text-[11.5px] text-[#A1A1AA] gap-0.5">
                  <SelectValue placeholder="rem" />
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

            {/* custom padding selection popover button */}
            <Popover>
              <PopoverTrigger>
                <Button className="w-7 h-7 rounded-md bg-[#3F3F46] px-0">
                  <HugeiconsIcon
                    icon={DashedLine02Icon}
                    color="#A1A1AA"
                    strokeWidth={1.5}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="w-57.5 h-35 bg-[#3F3F46] rounded-md p-3 grid grid-cols-2 gap-2.5">
                  {popoverData.map((data) => (
                    <div key={data.key} className="space-y-1.5">
                      <h1 className="text-[#E4E4E7] text-[11.5px] font-normal leading-4.5">
                        {data.title}
                      </h1>
                      <Button
                        onClick={() => increaseSide(data.key)}
                        className="flex justify-between items-center bg-[#27272A] w-24.25 h-7 py-1.25 pl-2.5 pr-3 rounded-md text-[#A1A1AA]"
                      >
                        <div className="flex items-center gap-1.5">
                          <HugeiconsIcon
                            icon={DashedLine02Icon}
                            size={24}
                            color="#A1A1AA"
                            strokeWidth={1.5}
                          />
                          <span className="text-[11.5px] font-normal leading-4.5">
                            {sides[data.key]}
                          </span>
                        </div>
                        <div>
                          <p className="text-[11.5px] font-normal leading-4.5">
                            {unit}
                          </p>
                        </div>
                      </Button>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* delete button */}
          <div>
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
      </div>

      {/* required message */}
      {isRequired && isDataValid && (
        <p className="text-white text-sm">Field is Required</p>
      )}
    </div>
  );
};

export default PaddingField;

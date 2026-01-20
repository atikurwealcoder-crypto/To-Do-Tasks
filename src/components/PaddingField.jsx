import React, { useEffect, useState } from "react";
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
  value = {},
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

  const [padding, setPadding] = useState({
    top: value?.top ?? 0,
    right: value?.right ?? 0,
    bottom: value?.bottom ?? 0,
    left: value?.left ?? 0,
    unit: value?.unit ?? "px",
  });
  const [isDataValid, setIsDataValid] = useState(false);

  // helper to send data to HOC
  const updatePadding = (next) => {
    const updated = { ...padding, ...next };
    setPadding(updated);
    onValueChange(updated);
  };

  /** input display logic */
  const inputDisplayValue = () => {
    const { top, right, bottom, left } = padding;
    const allSame = top === right && top === bottom && top === left;
    const sideSame = top === bottom && left === right;

    if (allSame) return top;
    if (sideSame) return `${top}, ${right}`;
    return `${top}, ${right}, ${bottom}, ${left}`;
  };

  /** input handler → applies to all sides */
  const handleInputChange = debounceFn((rawValue) => {
    if (rawValue === "" || rawValue === "-") return;

    const num = Number(rawValue);
    if (isNaN(num)) return;

    updatePadding({
      top: num,
      right: num,
      bottom: num,
      left: num,
    });
  }, 150);

  /** popover side increment */
  const increaseSide = (side) => {
    updatePadding({
      [side]: padding[side] + 1,
    });
  };

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

        {/* right input and custom popover */}
        <div className="w-47.5 h-7 flex items-center gap-3">
          {/* input and custom popover */}
          <div className="flex items-center gap-2 w-41.5 h-7">
            <div className="relative">
              {/* input field */}
              <Input
                placeholder="Add Value"
                className="flex items-center justify-center w-32.5 h-7 text-[11.5px] font-normal leading-4.5"
                value={inputDisplayValue()}
                min={min === 0 ? Infinity : min}
                max={max === 0 ? Infinity : max}
                type="text"
                onChange={(e) => handleInputChange(e.target.value)}
              />

              {/* unit selection button */}
              <Select
                value={padding.unit}
                onValueChange={(unit) => updatePadding({ unit })}
              >
                <SelectTrigger className="absolute top-0.75 right-0.5 w-10.75 data-[size=default]:h-5.5 pl-1.5 py-0.5 pr-0.5 bg-[#52525B] text-[11.5px] text-[#A1A1AA] gap-0.5 items-center">
                  <SelectValue placeholder={padding.unit} />
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

            {/* custom padding selection popover */}
            <Popover>
              <PopoverTrigger>
                <div className="w-7 h-7 rounded-md bg-[#3F3F46] p-1 flex items-center justify-center cursor-pointer">
                  <HugeiconsIcon
                    icon={DashedLine02Icon}
                    color="#A1A1AA"
                    strokeWidth={1.5}
                  />
                </div>
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
                            {padding[data.key]}
                          </span>
                        </div>
                        <div>
                          <p className="text-[11.5px] font-normal leading-4.5">
                            {padding.unit}
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

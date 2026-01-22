import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
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
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "./ui/button";
import { debounceFn } from "../lib/utils";
import { buildBoxValues, parseBoxValues } from "../lib/cssValue";

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

  const [padding, setPadding] = useState(() => {
    const parsedValue = parseBoxValues(value, "padding", "px");
    return {
      top: parsedValue.top ?? 0,
      right: parsedValue.right ?? 0,
      bottom: parsedValue.bottom ?? 0,
      left: parsedValue.left ?? 0,
      unit: parsedValue.unit ?? "px",
    };
  });
  const [isDataValid, setIsDataValid] = useState(false);

  // helper to send data to HOC
  const updatePadding = (next) => {
    const updatedValues = { ...padding, ...next };

    setPadding(updatedValues);
    onValueChange(buildBoxValues(updatedValues, "padding"));
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
  const handleInput = debounceFn((rawValue) => {
    if (rawValue === "" || rawValue === "-") return;

    let currentValue = Number(rawValue);
    if (isNaN(currentValue)) return;

    if (min !== 0 || max !== 0) {
      if (currentValue < min) currentValue = min;
      if (currentValue > max) currentValue = max;
      updatePadding({
        top: currentValue,
        right: currentValue,
        bottom: currentValue,
        left: currentValue,
      });
      return;
    }

    updatePadding({
      top: currentValue,
      right: currentValue,
      bottom: currentValue,
      left: currentValue,
    });
  }, 150);

  /** popover side input value change handler */
  const handleSideChange = (side) => (e) => {
    const next = Number(e.target.value);
    if (Number.isNaN(next)) return;

    updatePadding({
      [side]: next,
    });
  };

  return (
    <div className="w-64 h-7 p-0.5">
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        {/* left title + tooltip */}
        <div className="w-15.75 h-4.5 flex items-center gap-1.5 ">
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

        {/* right input and custom popover */}
        <div className="w-47.5 h-7 flex items-center gap-2">
          {/* input group (input field + unit selection) */}
          <InputGroup className="border-none bg-[#303033] w-32.5 h-7 has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[>[data-align=inline-end]]:[&>input]:pr-1">
            <InputGroupInput
              placeholder="Add Value"
              className="text-[11.5px] font-normal leading-4.5"
              value={inputDisplayValue()}
              min={min === 0 ? Infinity : min}
              max={max === 0 ? Infinity : max}
              type="text"
              onChange={(e) => handleInput(e.target.value)}
            />

            <InputGroupAddon align="inline-end" className="pr-2.5">
              <Select
                value={padding.unit}
                onValueChange={(unit) => updatePadding({ unit })}
              >
                <SelectTrigger className="min-w-8 data-[size=default]:h-5.5 pl-1.5 py-0.5 pr-0.5 bg-[#27272A] text-[11.5px] text-[#A1A1AA] gap-0.5 items-center">
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
            </InputGroupAddon>
          </InputGroup>

          {/* custom padding selection popover */}
          <Popover>
            <PopoverTrigger>
              <div className="w-7 h-7 rounded-md bg-[#303033] p-1 flex items-center justify-center cursor-pointer">
                <HugeiconsIcon
                  icon={DashedLine02Icon}
                  color="#A1A1AA"
                  strokeWidth={1.5}
                  className="w-3 h-3"
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
                    <InputGroup className="border-none bg-[#18181B] w-24.25 h-7 has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[>[data-align=inline-end]]:[&>input]:pr-1">
                      <InputGroupInput
                        value={padding[data.key]}
                        onChange={handleSideChange(data.key)}
                        type="number"
                        className="text-[11.5px] font-normal leading-4.5"
                      />
                      <InputGroupAddon className="">
                        <HugeiconsIcon
                          icon={DashedLine02Icon}
                          size={24}
                          color="#A1A1AA"
                          strokeWidth={1.5}
                        />
                      </InputGroupAddon>
                      <InputGroupAddon
                        align="inline-end"
                        className="text-[11.5px] font-normal leading-4.5 text-[#A1A1AA]"
                      >
                        {padding.unit}
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

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

export default PaddingField;

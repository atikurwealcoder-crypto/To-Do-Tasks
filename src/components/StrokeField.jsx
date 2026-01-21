import React, { useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Input } from "./ui/input";
import {
  Delete01Icon,
  InformationCircleIcon,
  Settings03Icon,
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

const StrokeField = ({
  property = {},
  value = {},
  onValueChange = () => {},
  onDisabledUpdate = () => {},
  onDelete = () => {},
}) => {
  const {
    title = "Stroke",
    tooltipContent = "Stroke Value",
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

  const [stroke, setStroke] = useState({
    size: value?.size ?? 0,
    unit: value?.unit ?? "px",
    color: value?.color ?? "#000000",
  });
  const [isDataValid, setIsDataValid] = useState(false);
  const colorInputRef = useRef(null);

  // helper to send data to HOC
  const updateStroke = (next) => {
    const updatedValues = { ...stroke, ...next };
    console.log(updatedValues);
    setStroke(updatedValues);
    onValueChange(updatedValues);
  };

  // hex code validation
  const isValidHex = (value) =>
    /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);

  // input size value handler
  const handleInput = debounceFn((rewValue) => {
    if (rewValue === "" || rewValue === "-") return;

    let currentValue = Number(rewValue);
    if (isNaN(currentValue)) return;

    if (min !== 0 || max !== 0) {
      if (currentValue < min) currentValue = min;
      if (currentValue > max) currentValue = max;
      updateStroke({ size: currentValue });
      return;
    }

    updateStroke({ size: currentValue });
  }, 150);

  // handle unit change
  const handleUnitChange = (unit) => {
    updateStroke({ unit });
  };

  // handle color input typing
  const handleColorInput = (rawColor) => {
    const inputColor = rawColor.toUpperCase();
    setStroke((prev) => ({
      ...prev,
      color: inputColor,
    }));
    // console.log(rawColor);
    updateStroke({ color: inputColor });
  };

  // color picker handler
  const handleColorSelection = (rawColor) => {
    const selectedColor = rawColor.toUpperCase();
    
    if (!isValidHex(selectedColor)) return;

    updateStroke({ color: selectedColor });
  };

  return (
    <div className="w-64 h-7 p-0.5">
      <div className="h-7 flex justify-between items-center rounded-lg">
        {/* left label + tooltip */}
        <div className="w-13.5 h-4.5 flex items-center gap-1.5 text-[#E4E4E7]">
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

        <div className="w-12 h-7 flex items-center gap-2">
          <Popover>
            <PopoverTrigger>
              <div className="w-7 h-7 rounded-md bg-[#303033] p-1 flex items-center justify-center cursor-pointer">
                <HugeiconsIcon
                  icon={Settings03Icon}
                  color="#A1A1AA"
                  strokeWidth={1.5}
                  className="w-3.5 h-3.5"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="w-38.5 h-22 bg-[#303033] rounded-md p-3 flex flex-col gap-2">
                <InputGroup className="border-none bg-[#18181B] w-32.5 h-7 has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[>[data-align=inline-end]]:[&>input]:pr-1">
                  <InputGroupInput
                    placeholder="Add Value"
                    className="w-32.5 h-7 text-[11.5px] font-normal leading-4.5 bg-[#18181B] rounded-md"
                    value={stroke.size}
                    min={min === 0 ? Infinity : min}
                    max={max === 0 ? Infinity : max}
                    type="number"
                    onChange={(e) => handleInput(e.target.value)}
                  />

                  <InputGroupAddon align="inline-end" className="pr-2.5">
                    <Select
                      value={stroke.unit}
                      onValueChange={handleUnitChange}
                    >
                      <SelectTrigger className="min-w-8 data-[size=default]:h-5.5 pl-1.5 py-0.5 pr-0.5 bg-[#27272A] text-[11.5px] font-normal leading-4.5 text-[#A1A1AA] gap-0.5">
                        <SelectValue placeholder="%" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#3F3F46] w-11.5 h-50.5 p-0.5 rounded-md">
                        {fieldData.map((field, index) => (
                          <SelectItem
                            key={index}
                            value={field.value}
                            className="text-[#A1A1AA] focus:bg-[#27272A] focus:text-[#A1A1AA] w-10.5 h-5.5 pl-1.5 py-0.5 pr-0.5 text-[11.5px] font-normal leading-4.5"
                          >
                            {field.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </InputGroupAddon>
                </InputGroup>

                {/* color picker field */}
                <div className="flex items-center gap-2">
                  <input
                    ref={colorInputRef}
                    type="color"
                    value={isValidHex(stroke.color) ? stroke.color : "#000000"}
                    onChange={(e) => handleColorSelection(e.target.value)}
                    className="absolute h-0 w-0 opacity-0"
                  />

                  {/* swatch */}
                  <Button
                    type="button"
                    size="icon"
                    onClick={() => colorInputRef.current?.click()}
                    className="h-5.5 w-5.5 rounded-full border-2 border-[#303033]"
                    style={{ backgroundColor: stroke.color }}
                  />

                  {/* hex input */}
                  <Input
                    value={stroke.color}
                    onChange={(e) => handleColorInput(e.target.value)}
                    onBlur={() => handleColorSelection(stroke.color)}
                    placeholder="#000000"
                    className="uppercase w-full h-7 text-[11.5px] font-normal leading-4.5 text-[#FAFAFA] bg-[#18181B]"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {/* delete button */}
          {isCustomAnim && (
            <Button onClick={onDelete} className="has-[>svg]:px-0 bg-transparent hover:bg-transparent cursor-pointer">
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

export default StrokeField;


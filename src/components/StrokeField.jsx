import React, { useRef, useState } from "react";
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

const StrokeField = ({
  property = {},
  value = 0,
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

  const [inputValue, setInputValue] = useState(value ?? 0);
  const [selectedValue, setSelectedValue] = useState("");
  const [isDataValid, setIsDataValid] = useState(false);
  const [color, setColor] = useState((value || "#000000").toUpperCase());
  const [error, setError] = useState("");
  const colorInputRef = useRef(null);

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

  // hex code validation
  const isValidHex = (value) =>
    /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);

  // handle input typing
  const handleColorInput = (rawColor) => {
    const selectedColor = rawColor.toUpperCase();
    setColor(selectedColor);

    if (selectedColor === "" || isValidHex(selectedColor)) {
      setError("");
    } else {
      setError("Hex color code is not valid");
    }
  };

  // color picker handler
  const handleColorSelection = (rawColor) => {
    const selectedColor = rawColor.toUpperCase();

    if (!isValidHex(selectedColor)) {
      setError("Hex color code is not valid");
      return;
    }
    setError("");
    setColor(selectedColor);
    onValueChange(selectedColor);
  };

  return (
    <div className="w-88.75 h-7 p-0.5">
      <div className="h-7 flex flex-col justify-between gap-[15.5px] mx-auto rounded-lg md:flex-row md:items-center">
        {/* left label + tooltip */}
        <div className="w-16.5 h-4.5 flex items-center gap-1.5 text-[#E4E4E7]">
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

        <div className="flex items-center gap-2">
          {/* stroke value input and color picker */}
          <div className="relative">
            <Input
              placeholder="Add Value"
              className="flex items-center justify-center w-32.5 h-7 text-[11.5px] font-normal leading-4.5"
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
              <SelectTrigger className="absolute top-0.75 right-0.5 w-8 data-[size=default]:h-5.5 pl-1.5 py-0.5 pr-0.5 bg-[#52525B] text-[11.5px] font-normal leading-4.5 text-[#A1A1AA] gap-0.5">
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
          </div>

          {/* color picker field */}
          <div className="flex items-center gap-2">
            <input
              ref={colorInputRef}
              type="color"
              value={isValidHex(color) ? color : value}
              onChange={(e) => handleColorSelection(e.target.value)}
              className="absolute h-0 w-0 opacity-0"
            />

            {/* swatch */}
            <Button
              type="button"
              size="icon"
              onClick={() => colorInputRef.current?.click()}
              className="h-6 w-6 rounded-full border-2 border-[#3F3F46]"
              style={{ backgroundColor: isValidHex(color) ? color : value }}
            />

            {/* hex input */}
            <Input
              value={color}
              onChange={(e) => handleColorInput(e.target.value)}
              onBlur={() => handleColorSelection(color)}
              placeholder="#000000"
              className="uppercase w-17.75 h-7 text-[11.5px] font-normal leading-4.5 text-[#FAFAFA]"
            />
          </div>
        </div>
        <div>
          {/* delete button */}
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

export default StrokeField;

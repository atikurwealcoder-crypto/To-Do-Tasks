import React, { useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Input } from "./ui/input";
import {
  Delete01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "./ui/button";

const ColorPickerField = ({
  property = {},
  value = "#000000",
  onDelete = () => {},
  onDisabledUpdate = () => {},
  onValueChange = () => {},
}) => {
  const {
    title = "Background",
    tooltipContent = "Select your color.",
    isRequired = false,
    isCustomAnim = false,
    ...rest
  } = property || {};
  const [color, setColor] = useState((value || "#000000").toUpperCase());
  const [error, setError] = useState("");
  const colorInputRef = useRef(null);

  // hex code validation
  const isValidHex = (value) =>
    /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);

  // handle input typing
  const handleInput = (rawColor) => {
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
    <div className="p-2">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        {/* label + tooltip */}
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

        {/* picker + input */}
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
            onChange={(e) => handleInput(e.target.value)}
            onBlur={() => handleColorSelection(color)}
            placeholder="#000000"
            className="w-28 uppercase"
          />

          {isCustomAnim && (
            <Button size="icon" onClick={onDelete} className="text-[#A1A1AA]">
              <HugeiconsIcon icon={Delete01Icon} />
            </Button>
          )}
        </div>
      </div>

      {/* validation messages */}
      {isRequired && <p className="text-white text-sm">Field is Required</p>}
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};

export default ColorPickerField;

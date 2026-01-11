import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
  Delete01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "./ui/button";

const SelectField = ({
  label = "Method",
  tooltipContent = "Select Method",
  value = "",
  isRequired = false,
  isValid = () => {},
  isCustomAnim = true,
  onDelete = () => {},
  onDisabledUpdate = () => {},
  onUpdateValue = () => {},
}) => {
  const [selectedValue, setSelectedValue] = useState(value ?? "");
  // console.log(selectedValue);
  const [isDataValid, setIsDataValid] = useState(false);

  const handleSelect = (value) => {
    setSelectedValue(value);
    onUpdateValue(value);
    isValid(true);
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

        <div className="flex items-center gap-3">
          <Select value={selectedValue} onValueChange={handleSelect}>
            <SelectTrigger className="w-62.75">
              <SelectValue placeholder="Select Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="to">To</SelectItem>
              <SelectItem value="from">From</SelectItem>
              <SelectItem value="set">Set</SelectItem>
            </SelectContent>
          </Select>

          {isCustomAnim && (
            <Button size="icon" onClick={onDelete}>
              <HugeiconsIcon icon={Delete01Icon} className="text-[#A1A1AA]" />
            </Button>
          )}
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
export default SelectField;

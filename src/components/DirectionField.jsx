import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
  Delete01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "./ui/button";

const DirectionField = (
  property = {},
  value = "drawin",
  onValueChange = () => {},
  onDisabledUpdate = () => {},
  onDelete = () => {},
) => {
  const {
    title = "Animation Direction",
    tooltipContent = "Choose animation direction",
    path = "",
    isRequired = false,
    isCustomAnim = true,
    ...rest
  } = property || {};

  const handleChange = (selectedValue) => {
    onValueChange(selectedValue);
  };

  return (
    <div className="w-88.75 h-7 p-0.5">
      <div className="flex flex-col justify-between mx-auto rounded-lg sm:flex-row sm:items-center">
        {/* left label + tooltip */}
        <div className="w-35.5 h-4.5 flex items-center gap-1.5">
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

        {/* right radio + delete button */}
        <div className="flex items-center gap-3 w-44.5 h-4.5">
          <RadioGroup
            defaultValue={value}
            onValueChange={handleChange}
            className="flex items-center gap-3 w-38.5"
          >
            <div className="flex items-center gap-2 w-16.5">
              <RadioGroupItem
                value="drawin"
                id="draw-in"
                className="size-3.5 border-none bg-[#18181B] focus-visible:ring-0 focus-visible:border-none"
              />
              <Label
                htmlFor="draw-in"
                className="text-[#A1A1AA] text-[11.5px] font-normal leading-4.5"
              >
                Draw In
              </Label>
            </div>
            <div className="flex items-center gap-2 w-19">
              <RadioGroupItem
                value="drawout"
                id="draw-out"
                className="size-3.5 border-none bg-[#18181B] focus-visible:ring-0 focus-visible:border-none"
              />
              <Label
                htmlFor="draw-out"
                className="text-[#A1A1AA] text-[11.5px] font-normal leading-4.5"
              >
                Draw Out
              </Label>
            </div>
          </RadioGroup>

          {isCustomAnim && (
            <Button onClick={onDelete} className="has-[>svg]:px-0">
              <HugeiconsIcon
                icon={Delete01Icon}
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

export default DirectionField;

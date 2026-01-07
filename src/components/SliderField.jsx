import React, { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "./ui/button";

const SliderField = ({
  label = "Scale",
  tooltipContent = "Adjust scale value",
  config = {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 0,
    delay: 500,
  },
  isRequired = false,
  isValid=()=>{},
  onValueChange,
  onDelete,
  isCustomAnim = true,
}) => {
  const [value, setValue] = useState(config.defaultValue);
  const [isDataValid, setIsDataValid]=useState(false);

  // Debounce handler
  useEffect(() => {
    if (value === "") return;

    const timer = setTimeout(() => {
      onValueChange?.(+value);
    }, config.delay);

    return () => clearTimeout(timer);
  }, [value, config.delay, onValueChange]);

  return (
    <div className="p-2">
      <div className="flex flex-col gap-3 rounded-lg  sm:flex-row sm:items-center">
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

        {/* middle slider */}
        <div className="flex-1">
          <Slider
            value={[value]}
            min={config.min}
            max={config.max}
            step={config.step}
            onValueChange={(v) => setValue(v[0])}
            className="flex-1"
          />
        </div>

        {/* right add + delete button */}
        <div className="flex items-center gap-2">
          <Input
            placeholder="Add Value"
            className="flex items-center justify-center w-28"
            value={value}
            min={config.min}
            max={config.max}
            type="number"
            onChange={(e) => {
              const value = e.target.value;
              setValue(value);
            }}
          />
          {isCustomAnim && (
            <Button>
              <HugeiconsIcon
                icon={Delete01Icon}
                onClick={onDelete}
                className="text-[#A1A1AA]"
              />
            </Button>
          )}
        </div>
      </div>
      {/* required message */}
      <div>
        <p className="text-white text-sm">{isRequired && "Field is Required"}</p>
      </div>
    </div>
  );
};

export default SliderField;

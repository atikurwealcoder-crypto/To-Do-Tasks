import React, { useState } from "react";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const SelectField = ({
  label = "Method",
  tooltipContent = "Select Method",
  isRequired = false,
  isValid = () => {},
}) => {
  const [value, setValue] = useState("");
  const [isDataValid, setIsDataValid] = useState(false);

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

        {/* right add + delete button */}
        {/* <NativeSelect className="w-52 text-[#A1A1AA]">
          <NativeSelectOption value="">Select Method</NativeSelectOption>
          <NativeSelectOption value="to">To</NativeSelectOption>
          <NativeSelectOption value="from">From</NativeSelectOption>
          <NativeSelectOption value="set">Set</NativeSelectOption>
        </NativeSelect> */}

        <Select>
          <SelectTrigger className="w-62.75">
            <SelectValue placeholder="Select Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="to">To</SelectItem>
            <SelectItem value="from">From</SelectItem>
            <SelectItem value="set">Set</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* required message */}
      <div>
        <p className="text-white text-sm">{isRequired && "Field is Required"}</p>
      </div>
    </div>
  );
};
export default SelectField;

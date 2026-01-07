import React, { useState } from "react";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const MethodSelectField = ({
  label = "Method",
  tooltipContent = "Select Method",
  isRequired = false,
  isValid = () => {},
}) => {
  const [value, setValue] = useState("");
  const [isDataValid, setIsDataValid] = useState(false);

  return (
    <div>
      <div className="flex flex-col justify-between gap-3 rounded-lg p-4 sm:flex-row sm:items-center">
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
        <NativeSelect className="w-52">
          <NativeSelectOption value="">Select Method</NativeSelectOption>
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
          <NativeSelectOption value="banana">Banana</NativeSelectOption>
          <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
          <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
        </NativeSelect>
      </div>
      <div>
        <p>{isRequired && "Field is Required"}</p>
      </div>
    </div>
  );
};
export default MethodSelectField;

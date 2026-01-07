import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";

const SwitchField = ({
  label = "Enable Split Text",
  isRequired = false,
  isValid = () => {},
}) => {
  const [value, setValue] = useState("");
  const [isDataValid, setIsDataValid] = useState(false);
  return (
    <div className="p-2">
      <div className="flex justify-between gap-3 rounded-lg flex-row items-center">
        {/* left label + tooltip */}
        <div>
          <h2 className="text-[#FAFAFA] text-[15px]">{label}</h2>
        </div>

        {/* right toggle button*/}
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" className="cursor-pointer"/>
        </div>
      </div>
      {/* required message */}
      <div>
        <p className="text-white text-sm">{isRequired && "Field is Required"}</p>
      </div>
    </div>
  );
};

export default SwitchField;

import React from "react";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CancelCircleIcon,
  Delete01Icon,
  NoteEditIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

const DynamicModal = ({
  title = "Draft Animation",
  subtitle = "Your draft animation list",
  config = {
    count: 12,
    headingIcon: <HugeiconsIcon icon={NoteEditIcon} className="w-6 h-6" />,
    deleteBtn: {
      icon: <HugeiconsIcon icon={Delete01Icon} className="w-4 h-4" />,
      label: "Delete",
    },
    publishBtn: {
      icon: <HugeiconsIcon icon={Tick02Icon} className="w-4 h-4" />,
      label: "Publish",
    },
  },
  children,
  onClose = () => {},
  onDelete = () => {},
  onInsert = () => {},
}) => {
  return (
    <div className="w-99.5 max-h-97.5 rounded-md bg-[#27272A] p-3.75 flex flex-col gap-7.5">
      {/* Header*/}
      <div className="flex items-start justify-between">
        <div className="w-50.5 h-10.5 flex items-center gap-3">
          <div className="w-10 h-10 p-2 rounded-full bg-[#64964C] flex items-center justify-center text-[#FAFAFA]">
            {config.headingIcon}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <h2 className="text-[15px] font-medium text-[#FAFAFA] leading-5">
                {title}
              </h2>
              <span className="bg-[#64964C] w-6 h-4.5 rounded-2xl p-1.25 text-white font-[12px] flex items-center justify-center">
                {config.count}
              </span>
            </div>

            <p className="text-sm font-normal text-[#E4E4E7] leading-4.5">
              {subtitle}
            </p>
          </div>
        </div>

        <button onClick={onClose} className="">
          <HugeiconsIcon
            icon={CancelCircleIcon}
            className="text-[#E55F42] w-4 h-4"
          />
        </button>
      </div>

      {/* Dynamic Content */}
      <div className="max-h-55.5 overflow-y-auto">{children}</div>

      {/* Footer Buttons */}
      <div className="w-92 h-9 flex items-center gap-5 pt-2">
        <Button
          onClick={onDelete}
          className="bg-[#3F3F46] w-43.5 h-9 rounded-md text-[15px] font-medium text-[#FAFAFA] leading-5"
        >
          {config.deleteBtn.icon}
          {config.deleteBtn.label}
        </Button>
        <Button
          onClick={onInsert}
          className="bg-[#3F3F46] w-43.5 h-9 rounded-md text-[15px] font-medium text-[#FAFAFA] leading-5"
        >
          {config.publishBtn.icon}
          {config.publishBtn.label}
        </Button>
      </div>
    </div>
  );
};

export default DynamicModal;

import React, { useState } from "react";
import TextField from "./TextField";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AddCircleIcon,
  InformationCircleFreeIcons,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import properties from "@/data/pageTransitionProperties";

const PageTransitionExitSection = () => {
  const [pageTransitionConfig, setPageTransitionConfig] = useState({});
  const [search, setSearch] = useState("");

  // Add property safely
  const addProperty = (key) => {
    setPageTransitionConfig((prev) => {
      if (key in prev) return prev;
      return { ...prev, [key]: "" };
    });
  };

  // Filter groups + items based on search
  const filteredGroups = properties
    .map((group) => {
      const filteredItems = group.items.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );

      return {
        ...group,
        items: filteredItems,
      };
    })
    .filter((group) => group.items.length > 0);

  return (
    <div className="w-96 bg-[#27272A] rounded-md p-4 space-y-4">
      {/* Header */}
      <h1 className="text-white text-[15px] font-normal leading-5">Exit</h1>

      {/* Render selected properties */}
      {Object.entries(pageTransitionConfig).map(([key, value]) => (
        <TextField
          key={key}
          property={{ title: key }}
          value={value}
          onUpdateValue={(newValue) => {
            setPageTransitionConfig((prev) => ({
              ...prev,
              [key]: newValue,
            }));
          }}
        />
      ))}

      {/* Add Properties */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-normal leading-5 text-[#FAFAFA]">Add Properties</span>
          <HugeiconsIcon
            icon={AddCircleIcon}
            className="text-[#D4D4D8] w-4 h-4"
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button className="bg-[#3F3F46] w-full h-8.5 rounded-md">
                <HugeiconsIcon icon={AddCircleIcon} className="text-[#D4D4D8] w-3.25 h-3.25"/>
                <span className="text-[#FAFAFA] text-sm font-normal leading-4.5">Add</span>
              </Button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            className="w-72 bg-[#424348] p-2 rounded-md"
          >
            {/* Search */}
            <div  className="flex items-center pb-2 border-b border-[#505257]">
              <HugeiconsIcon size={20} icon={Search01Icon} className="text-[#a1a1a4] mt-1"/>
              <Input
                placeholder="Search properties"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full placeholder:text-[#756e60] bg-transparent shadow-none"
              />
            </div>

            {/* Property list */}
            <div className="max-h-80 overflow-y-auto space-y-2">
              {filteredGroups.map((group, i) => (
                <div key={i}>
                  {/* Group title */}
                  {group.key && (
                    <div className="px-2 py-1 text-xs uppercase text-[#fff6dc]">
                      {group.key}
                    </div>
                  )}

                  {/* Group items */}
                  {group.items.map((item) => {
                    const isAdded = item.key in pageTransitionConfig;

                    return (
                      <button
                        key={item.key}
                        disabled={isAdded}
                        onClick={() => addProperty(item.key)}
                        className={`w-full text-left items-center cursor-pointer text-sm
                          ${
                            isAdded
                              ? "opacity-60 cursor-not-allowed"
                              : "text-[#b5b7bd]"
                          }`}
                      >
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button>
                              <HugeiconsIcon
                                icon={InformationCircleFreeIcons}
                                className="w-2.5 h-2.5"
                              />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>tooltip</p>
                          </TooltipContent>
                        </Tooltip>
                        {item.title}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default PageTransitionExitSection;

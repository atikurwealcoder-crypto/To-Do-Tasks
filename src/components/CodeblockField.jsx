import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/themes/prism-tomorrow.css";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  InformationCircleIcon,
  Delete01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "./ui/button";
import { debounceFn } from "../lib/utils";

// TODO:I have used react-simple-code-editor and prismjs package for this component.

const CodeblockField = ({
  property = {},
  value = "",
  onDelete = () => {},
  onDisabledUpdate = () => {},
  onValueChange = () => {},
}) => {
  const {
    title = "Custom",
    tooltipContent = "Enter JS or CSS code",
    placeholder = "x:1, y:2",
    language = "javascript",
    isRequired = false,
    isCustomAnim = true,
    ...rest
  } = property || {};

  const [code, setCode] = useState(value ?? "");

  const handleChange = debounceFn((newCode) => {
    setCode(newCode);
    onValueChange(newCode);
  });

  const highlightCode = (code) => {
    const grammar =
      language === "css" ? Prism.languages.css : Prism.languages.javascript;

    return Prism.highlight(code, grammar, language);
  };

  return (
    <div className="w-64 space-y-3">
      {/* Header */}
      <div className="w-full h-4.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-white text-[11.5px] font-normal leading-4.5">
            {title}
          </span>

          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <HugeiconsIcon
                  icon={InformationCircleIcon}
                  className="w-3 h-3 text-gray-400"
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipContent}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {isCustomAnim && (
          <Button
            onClick={onDelete}
            className="has-[>svg]:px-0 bg-transparent hover:bg-transparent"
          >
            <HugeiconsIcon
              icon={Delete01Icon}
              className="text-[#A1A1AA] w-5 h-5"
            />
          </Button>
        )}
      </div>

      {/* Code Editor */}
      <div className="rounded-md bg-[#303033] overflow-hidden">
        <Editor
          value={code}
          placeholder={placeholder}
          onValueChange={handleChange}
          highlight={highlightCode}
          padding={10}
          textareaId="codeblock-editor"
          spellCheck={false}
          className="w-full min-h-10 max-h-15 overflow-y-auto text-[11.5px] leading-4.5 text-[#FAFAFA] bg-[#303033]"
        />
      </div>

      {/* required message */}
      {isRequired && !code && (
        <p className="text-red-400 text-xs">Field is Required</p>
      )}
    </div>
  );
};

export default CodeblockField;

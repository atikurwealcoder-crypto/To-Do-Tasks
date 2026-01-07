import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function NativeSelect({
  className,
  size = "default",
  ...props
}) {
  return (
    <div
      className="group/native-select relative w-fit has-[select:disabled]:opacity-50"
      data-slot="native-select-wrapper">
      <select
        data-slot="native-select"
        data-size={size}
        className={cn(
          "border-input placeholder:text-[#A1A1AA] selection:bg-primary selection:text-white dark:bg-input/30 dark:hover:bg-input/50 h-9 w-full min-w-0 appearance-none rounded-md bg-[#3F3F46] px-2.5 py-2 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed data-[size=sm]:h-8 data-[size=sm]:py-1",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props} />
      <ChevronDownIcon
        className="text-white pointer-events-none absolute top-1/2 right-3.5 size-5 -translate-y-1/2 opacity-90 select-none"
        aria-hidden="true"
        data-slot="native-select-icon" />
    </div>
  );
}

function NativeSelectOption({
  ...props
}) {
  return <option data-slot="native-select-option" {...props} />;
}

function NativeSelectOptGroup({
  className,
  ...props
}) {
  return (<optgroup data-slot="native-select-optgroup" className={cn(className)} {...props} />);
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }

"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const checkboxVariants = {
  primary:
    "border-[#ABB6AC] data-[state=checked]:bg-[#3E9D33] data-[state=checked]:text-[#fff] focus-visible:ring-[#2D8545]",
  secondary:
    "border-[#ABB6AC] data-[state=checked]:bg-[#3063DA] data-[state=checked]:text-[#fff] focus-visible:ring-[#3063DA]",
};

const checkboxShapes = {
  square: "rounded-[12px]", // ✅ DEFAULT (same as now)
  rounded: "rounded-full",
};

const checkboxSizes = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

const Checkbox = React.forwardRef(
  (
    {
      className,
      variant = "primary",
      shape = "square",
      size = "sm", // ✅ DEFAULT
      ...props
    },
    ref
  ) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer shrink-0 border shadow focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
        checkboxVariants[variant],
        checkboxShapes[shape],
        checkboxSizes[size],
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className='flex items-center justify-center text-current'>
        <Check size={20} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
);

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        `
        w-full
        rounded-xl
        border border-[#D1E5D6]
        bg-white
        px-4 py-3
        text-sm md:text-base
        text-gray-700
        placeholder:text-gray-700
        outline-none
        transition
        focus:border-[#1B752A]
        focus:ring-0
        disabled:bg-gray-100
        disabled:cursor-not-allowed
        `,
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };

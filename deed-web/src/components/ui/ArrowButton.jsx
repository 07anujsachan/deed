import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ArrowButton = ({
  direction = "right",
  onClick,
  disabled = false,
  className = "",
}) => {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={`${direction} arrow`}
      className={`
p-2 rounded-xl border-2 border-[#1B752A] bg-[#EFFEF1] shadow-md text-[#1B752A] font-semibold
        ${className}
      `}
    >
      <Icon size={18} strokeWidth={2.5} />
    </button>
  );
};

export default ArrowButton;

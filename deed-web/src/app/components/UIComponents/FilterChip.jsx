import { X } from "lucide-react";
import React from "react";

type FilterChipProps = {
  label: string;
  selected?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
};

export default function FilterChip({
  label,
  selected = false,
  onRemove,
  onClick,
}: FilterChipProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-1.5 rounded-lg border cursor-pointer transition
      ${
        selected
          ? "border-green-600 text-green-600 font-semibold"
          : "border-gray-300 text-gray-800 font-semibold"
      }`}
    >
      <span>{label}</span>
      {selected && onRemove && (
        <X
          size={16}
          className="cursor-pointer hover:text-red-500"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        />
      )}
    </div>
  );
}

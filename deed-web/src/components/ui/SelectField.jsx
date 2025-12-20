"use client";
import React from "react";
import clsx from "clsx";

const SelectField = ({
  value,
  onChange,
  options = [],
  placeholder = "Select option",
  className = "",
  disabled = false,
}) => {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={clsx(
          `
          w-full appearance-none
          border border-[#D1E5D6]
          rounded-xl
          bg-white
          px-4 py-3
          text-gray-700 text-sm md:text-base
          focus:outline-none focus:ring-0 focus:border-[#1B752A]
          disabled:bg-gray-100 disabled:cursor-not-allowed
          `,
          className
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Dropdown Icon */}
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </span>
    </div>
  );
};

export default SelectField;

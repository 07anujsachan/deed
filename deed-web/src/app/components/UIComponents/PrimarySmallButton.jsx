"use client";
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";



const variantStyles = {
  PrimarySmallButton:
    "bg-[#1B752A] text-[#D5FFDC] px-8 py-3 text-lg  rounded-2xl font-semibold",
    PrimarySmallOutlinedButton:
    "border-2 border-[#1B752A]  bg-[#EFFFF1] text-[#1B752A] box-border  px-8 py-3 text-lg  rounded-2xl font-semibold",
  PrimaryLargeButton:
    "bg-[#1B752A] text-[#D5FFDC] px-8 py-4 text-lg  rounded-2xl font-semibold",
    PrimaryLargeOutlinedButton:
    "border-2 border-[#1B752A]  bg-[#EFFFF1] text-[#1B752A] box-border  px-8 py-4 text-lg  rounded-2xl font-semibold",
    SecondarySmallButton:
    "bg-[#3063DA] text-[#EDF2FF] px-8 py-3 text-lg  rounded-2xl font-semibold",
    SecondarySmallOutlinedButton:
    "border-2 border-[#3063DA]  bg-[#EDF2FF] text-[#3063DA] box-border  px-8 py-3 text-lg  rounded-2xl font-semibold",
  SecondaryLargeButton:
    "bg-[#3063DA] text-[#EDF2FF] px-8 py-4 text-lg  rounded-2xl font-semibold",
    SecondaryLargeOutlinedButton:
    "border-2 border-[#3063DA]  bg-[#EDF2FF] text-[#3063DA] box-border  px-8 py-4 text-lg  rounded-2xl font-semibold",
};

 export const Button = ({ text, variant, onClick, type = "button", className = "" }) => {
  const finalClasses = clsx(
    "transition duration-300",
    variantStyles[variant],
    className
  );

  return (
    <button type={type} onClick={onClick} className={finalClasses}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf([
    "PrimarySmallButton",
    "SecondarySmallButton",
    "PrimaryLargeButton",
    "SecondaryLargeButton",
    " SecondaryLargeOutlinedButton",
  ]).isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
};



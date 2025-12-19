"use client";
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Link from "next/link";

const variantStyles = {
  PrimarySmallButton:
    "bg-[#1B752A] text-[#D5FFDC] px-8 py-3 text-lg rounded-2xl font-semibold",
  PrimarySmallOutlinedButton:
    "border-2 border-[#1B752A] bg-[#EFFFF1] text-[#1B752A] px-8 py-3 text-lg rounded-2xl font-semibold",
  PrimaryLargeButton:
    "bg-[#1B752A] text-[#D5FFDC] px-8 py-4 text-lg rounded-2xl font-semibold",
  PrimaryLargeOutlinedButton:
    "border-2 border-[#1B752A] bg-[#EFFFF1] text-[#1B752A] px-8 py-4 text-lg rounded-2xl font-semibold",
  SecondarySmallButton:
    "bg-[#3063DA] text-[#EDF2FF] px-8 py-3 text-lg rounded-2xl font-semibold",
  SecondarySmallOutlinedButton:
    "border-2 border-[#3063DA] bg-[#EDF2FF] text-[#3063DA] px-8 py-3 text-lg rounded-2xl font-semibold",
  SecondaryLargeButton:
    "bg-[#3063DA] text-[#EDF2FF] px-8 py-4 text-lg rounded-2xl font-semibold",
  SecondaryLargeOutlinedButton:
    "border-2 border-[#3063DA] bg-[#EDF2FF] text-[#3063DA] px-8 py-4 text-lg rounded-2xl font-semibold",
};

export const Button = ({
  text,
  variant,
  onClick,
  href,
  type = "button",
  className = "",
}) => {
  const finalClasses = clsx(
    "inline-flex items-center justify-center transition duration-300",
    variantStyles[variant],
    className
  );

  // 🔗 LINK BUTTON
  if (href) {
    return (
      <Link href={href} className={finalClasses}>
        {text}
      </Link>
    );
  }

  // 🔘 NORMAL BUTTON
  return (
    <button type={type} onClick={onClick} className={finalClasses}>
      {text}
    </button>
  );
};
Button.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(Object.keys(variantStyles)).isRequired,
  onClick: PropTypes.func,
  href: PropTypes.string, // 👈 link support
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
};

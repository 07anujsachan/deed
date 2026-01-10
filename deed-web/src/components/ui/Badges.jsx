// Badge.jsx
import React from "react";
import clsx from "clsx";
import { Check } from "lucide-react";

const emphasisClasses = {
  red: {
    high: "bg-red-600 text-white",
    medium: "bg-red-100 text-red-600",
  },
  green: {
    high: "bg-green-600 text-white",
    medium: "bg-green-100 text-green-600",
  },
  brown: {
    high: "bg-yellow-800 text-white",
    medium: "bg-yellow-100 text-yellow-800",
  },
  blue: {
    high: "bg-blue-600 text-white",
    medium: "bg-blue-100 text-blue-600",
  },
};

const sizeClasses = {
  small: "text-sm px-2 py-1",
  medium: "text-base px-2 py-2",
  large: "text-lg px-2 py-2",
};

const iconSize = {
  small: 16,
  medium: 16,
  large: 24,
};

const Badge = ({
  color = "red",
  size = "small",
  emphasis = "high",
  checkPosition = "start",
  text = "Badge",
}) => {
  const bgClass = emphasisClasses[color][emphasis];
  const sizeClass = sizeClasses[size];
  const checkIcon = <Check size={iconSize[size]} className="mx-1" />;

  return (
    <div
      className={clsx(
        "inline-flex items-center rounded-lg font-medium ",
        bgClass,
        sizeClass
      )}
    >
      {checkPosition === "start" && checkIcon}
      <span>{text}</span>
      {checkPosition === "end" && checkIcon}
    </div>
  );
};

export default Badge;

import React from "react";
import { cn } from "@/lib/utils";

export default function InlineNotice({
  icon,
  text,
  variant = "primary",
}) {
  const styles = {
    primary: {
      wrapper: "bg-green-50 text-green-700",
    },
    secondary: {
      wrapper: "bg-blue-50 text-blue-700",
    },
  };

  return (
    <div
      className={cn(
        "mt-2 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-medium",
        styles[variant].wrapper
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{text}</span>
    </div>
  );
}

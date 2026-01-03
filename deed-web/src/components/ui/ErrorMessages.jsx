"use client";

import { XCircle } from "lucide-react";

export default function ErrorMessage({ error }) {
  if (!error) return null;

  return (
    <div
      className="
        flex items-center gap-2
        bg-red-50 border border-red-200
        text-red-700 text-sm
        px-3 py-2 rounded-lg
      "
    >
      <XCircle size={16} />
      <span>{error}</span>
    </div>
  );
}

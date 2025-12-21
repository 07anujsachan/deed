"use client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function OtherInlineOption({
  label = "Other (please specify)",
  values,
  onAdd,
}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const addValue = () => {
    const trimmed = input.trim();
    if (!trimmed || values.includes(trimmed)) return;

    onAdd(trimmed);
    setInput("");
    setOpen(false);
  };

  return (
    <div className='space-y-2 flex items-center gap-4'>
      <label className='flex items-center gap-2 cursor-pointer w-full'>
        <Checkbox checked={open} onCheckedChange={(v) => setOpen(v)} />
        <span className='text-sm'>{label}</span>
      </label>

      {open && (
        <Input
          placeholder='Please specify'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addValue();
            }
          }}
        />
      )}
    </div>
  );
}

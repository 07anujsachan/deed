"use client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/PrimarySmallButton";

const DEFAULT_OPTIONS = [
  "Design / UX / UI",
  "Engineering / Technology",
  "Medicine / Healthcare",
  "Business / Finance",
  "Law / Policy",
  "Media / Arts",
  "Education / Research",
  "Government / Civil Services",
];

export default function IndustrySelector({ value = [], onChange }) {
  const [customOptions, setCustomOptions] = useState([]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherValue, setOtherValue] = useState("");

  const allOptions = [...DEFAULT_OPTIONS, ...customOptions];

  const toggleOption = (option) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  const addCustomOption = () => {
    const trimmed = otherValue.trim();
    if (!trimmed) return;
    if (allOptions.includes(trimmed)) return;

    setCustomOptions((prev) => [...prev, trimmed]);
    onChange([...value, trimmed]);
    setOtherValue("");
    setShowOtherInput(false);
  };

  return (
    <div className='space-y-4 mt-2'>
      {/* OPTIONS LIST */}
      <div className='flex flex-wrap gap-x-8 gap-y-4'>
        {allOptions.map((option) => (
          <label
            key={option}
            className='flex items-center gap-3 cursor-pointer'
          >
            <Checkbox
              checked={value.includes(option)}
              onCheckedChange={() => toggleOption(option)}
            />
            <span className='text-sm'>{option}</span>
          </label>
        ))}

        {/* OTHERS OPTION */}
        <label className='flex items-center gap-3 cursor-pointer'>
          <Checkbox
            checked={showOtherInput}
            onCheckedChange={(checked) => {
              setShowOtherInput(checked);
              if (!checked) setOtherValue("");
            }}
          />
          <span className='text-sm'>Others (please specify)</span>
        </label>
      </div>

      {/* OTHER INPUT (OPENS INLINE) */}
      {showOtherInput && (
        <div className='flex gap-2 max-w-md'>
          <Input
            placeholder='Enter your industry / expertise'
            value={otherValue}
            onChange={(e) => setOtherValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustomOption();
              }
            }}
          />
          <Button
            variant={"PrimarySmallButton"}
            type='button'
            onClick={addCustomOption}
            text={"Add"}
            className='px-2 py-1 text-sm text-white'
          />
        </div>
      )}
    </div>
  );
}

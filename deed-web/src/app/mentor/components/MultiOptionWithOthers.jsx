"use client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export default function MultiOptionWithOthers({
  options = [],
  value = [],
  onChange,
  otherLabel = "Others (please specify)",
  otherPlaceholder = "Please specify",
}) {
  const [customOptions, setCustomOptions] = useState([]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherValue, setOtherValue] = useState("");

  const allOptions = [...options, ...customOptions];

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

    const exists = allOptions.some(
      (opt) => opt.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) return;

    setCustomOptions((prev) => [...prev, trimmed]);
    onChange([...value, trimmed]);

    setOtherValue("");
    setShowOtherInput(false);
  };

  const removeCustomOption = (option) => {
    setCustomOptions((prev) => prev.filter((o) => o !== option));
    onChange(value.filter((v) => v !== option));
  };

  return (
    <div className='flex flex-wrap gap-x-8 gap-y-4 items-center'>
      {/* OPTIONS */}
      {allOptions.map((option) => {
        const isCustom = customOptions.includes(option);

        return (
          <div key={option} className='flex items-center gap-2 min-h-[40px]'>
            <Checkbox
              checked={value.includes(option)}
              onCheckedChange={() => toggleOption(option)}
            />
            <span className='text-sm leading-none'>{option}</span>

            {isCustom && (
              <button
                type='button'
                onClick={() => removeCustomOption(option)}
                className='ml-1 text-gray-400 hover:text-red-500 flex items-center'
              >
                ✕
              </button>
            )}
          </div>
        );
      })}

      {/* OTHERS INLINE (FIXED ALIGNMENT) */}
      <div className='flex items-center gap-2 min-h-[40px]'>
        <Checkbox
          checked={showOtherInput}
          onCheckedChange={(checked) => {
            setShowOtherInput(checked);
            if (!checked) setOtherValue("");
          }}
        />

        {!showOtherInput ? (
          <span className='text-sm leading-none'>{otherLabel}</span>
        ) : (
          <>
            <Input
              className='w-64 h-10 mb-2'
              placeholder={otherPlaceholder}
              value={otherValue}
              onChange={(e) => setOtherValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCustomOption();
                }
              }}
            />

            <button
              type='button'
              onClick={addCustomOption}
              className='
            h-10 px-4
            rounded-xl
            bg-[#1B752A]
            text-white text-sm
            flex items-center justify-center
            hover:opacity-90
          '
            >
              Add
            </button>
          </>
        )}
      </div>
    </div>
  );
}

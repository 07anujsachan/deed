"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const SOCIAL_OPTIONS = [
  "LinkedIn",
  "GitHub",
  "Twitter / X",
  "Portfolio",
  "Other",
];

export default function SocialLinksSelector({ value = [], onChange }) {
  const addSocial = (platform) => {
    if (platform !== "Other" && value.some((v) => v.platform === platform))
      return;

    onChange([
      ...value,
      {
        id: Date.now() + Math.random(),
        platform,
        label: "",
        url: "",
      },
    ]);
  };

  const updateField = (id, field, val) => {
    onChange(
      value.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    );
  };

  const removeSocial = (id) => {
    onChange(value.filter((item) => item.id !== id));
  };

  return (
    <div className='space-y-4'>
      {/* Selector */}
      <div className='flex flex-wrap gap-3'>
        {SOCIAL_OPTIONS.map((platform) => (
          <Button
            key={platform}
            type='button'
            size='sm'
            variant='outline'
            onClick={() => addSocial(platform)}
            disabled={
              platform !== "Other" && value.some((v) => v.platform === platform)
            }
          >
            {platform}
          </Button>
        ))}
      </div>

      {/* Inputs */}
<div className="space-y-3">
  {value.map((item) => {
    const isOther = item.platform === "Other";

    return (
      <div
        key={item.id}
        className={
          isOther
            ? "grid grid-cols-[200px_1fr_40px] gap-3 items-center"
            : "grid grid-cols-[1fr_40px] gap-3 items-center"
        }
      >
        {/* Label (only for Other) */}
        {isOther && (
          <Input
            placeholder="Label (required)"
            value={item.label}
            onChange={(e) =>
              updateField(item.id, "label", e.target.value)
            }
            required
          />
        )}

        {/* URL (FULL WIDTH for both cases) */}
        <Input
          placeholder={
            isOther
              ? "Enter link URL"
              : `Enter ${item.platform} URL`
          }
          value={item.url}
          onChange={(e) =>
            updateField(item.id, "url", e.target.value)
          }
          className="w-full"
          required
        />

        {/* Remove */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-10 w-10"
          onClick={() => removeSocial(item.id)}
        >
          <X size={16} />
        </Button>
      </div>
    );
  })}
</div>

    </div>
  );
}

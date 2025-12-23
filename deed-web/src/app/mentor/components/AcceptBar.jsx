"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/PrimarySmallButton";

export default function AcceptBar({
  checked,
  setChecked,
  onProceed,
  isFloating,
}) {
  return (
    <motion.div
      layout='position'
      transition={{
        layout: { duration: 0.35, ease: "easeInOut" },
      }}
      className={`
        z-50 bg-white shadow-md
        px-6 md:px-8 py-6 md:py-8 mx-6
        ${
          isFloating
            ? "fixed bottom-0 max-width-4xl rounded-t-[32px]"
            : "relative max-width-auto rounded-[32px]"
        }
      `}
      style={{
        width: isFloating ? "90%" : "100%",
      }}
    >
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
        <div className='flex items-start md:items-center gap-4'>
          <label className='cursor-pointer'>
            <span
              className={`
                w-8 h-8 flex items-center justify-center rounded-xl
                border-2 transition
                ${
                  checked
                    ? "bg-[#3063DA] border-[#3063DA]"
                    : "bg-white border-gray-300"
                }
              `}
            >
              {checked && <Check size={16} className='text-white' />}
            </span>

            <input
              type='checkbox'
              checked={checked}
              onChange={() => setChecked(!checked)}
              className='hidden'
            />
          </label>

          <p className='text-sm md:text-lg max-w-2xl'>
            I have read the community guidelines and I would like to proceed
          </p>
        </div>

        <Button
          text='Take me to the form'
          variant='SecondarySmallButton'
          showRightArrow
          onClick={onProceed}
          className={`whitespace-nowrap ${
            !checked && "opacity-50 pointer-events-none"
          }`}
        />
      </div>
    </motion.div>
  );
}

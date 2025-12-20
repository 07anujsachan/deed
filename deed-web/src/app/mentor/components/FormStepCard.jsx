"use client";
import React from "react";
import { Button } from "@/components/ui/PrimarySmallButton";
import StepIndicator from "./StepIndicator";

const FormStepCard = ({
  title,
  children,
  onNext,
  onPrev,
  showPrev = true,
  nextText = "Next",
}) => {
  return (
    <div className='bg-white rounded-[32px] p-6 md:p-8 shadow-sm'>
      <StepIndicator />
      {/* TITLE */}
      {title && (
        <h2 className='text-xl md:text-2xl font-semibold mb-6'>{title}</h2>
      )}

      {/* FORM CONTENT (YOU CONTROL THIS) */}
      <div className='space-y-4'>{children}</div>

      {/* ACTIONS */}
      <div className='flex justify-between mt-8'>
        {showPrev ? (
          <Button
            text='Previous'
            variant='SecondarySmallOutlinedButton'
            onClick={onPrev}
          />
        ) : (
          <div />
        )}

        <Button
          text={nextText}
          variant='SecondarySmallButton'
          showRightArrow
          onClick={onNext}
        />
      </div>
    </div>
  );
};

export default FormStepCard;

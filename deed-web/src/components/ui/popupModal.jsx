"use client";

import { Button } from "./PrimarySmallButton";

export default function PopupModal({
  open,
  onClose,
  title,
  description,
  children,
  primaryButtonText = "OK",
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  primaryButtonArrow = "none",
}) {
  if (!open) return null;

  return (
    <div className='fixed inset-0 -top-2 z-50 flex items-center justify-center bg-black/40'>
      <div className='bg-white rounded-3xl p-8 w-[90%] max-w-lg shadow-2xl'>
        {/* Title */}
        {title && (
          <h2 className='text-2xl font-bold mb-2 text-gray-900'>{title}</h2>
        )}

        {/* Description */}
        {description && (
          <p className='text-sm text-gray-600 mb-6 leading-relaxed'>
            {description}
          </p>
        )}

        {/* Custom Content */}
        {children && <div className='mb-6'>{children}</div>}

        {/* Buttons */}
        <div className='flex gap-3'>
          {secondaryButtonText && (
            <Button
              onClick={onSecondaryClick || onClose}
              variant='SecondarySmallOutlinedButton'
              text={secondaryButtonText}
              className='w-full'
            />
          )}

          <Button
            onClick={onPrimaryClick || onClose}
            variant='SecondarySmallButton'
            text={primaryButtonText}
            className='w-full'
            arrowDirection={primaryButtonArrow}
          />
        </div>
      </div>
    </div>
  );
}

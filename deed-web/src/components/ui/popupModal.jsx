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
}) {
  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div className='bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg'>
        {/* Title */}
        {title && (
          <h2 className='text-lg font-semibold mb-2 text-center'>{title}</h2>
        )}

        {/* Description */}
        {description && (
          <p className='text-sm text-gray-600 text-center mb-4'>
            {description}
          </p>
        )}

        {/* Custom Content */}
        {children && <div className='mb-4 text-center'>{children}</div>}

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
          />
        </div>
      </div>
    </div>
  );
}

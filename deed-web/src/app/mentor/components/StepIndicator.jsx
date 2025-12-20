"use client";
import { usePathname } from "next/navigation";

const TOTAL_STEPS = 5;

export default function StepIndicator() {
  const pathname = usePathname();

  // extract number from "step-3"
  const match = pathname.match(/step-(\d+)/);
  const currentStep = match ? Number(match[1]) : 1;

  return (
    <div className='flex gap-2 mb-8'>
      {Array.from({ length: TOTAL_STEPS }).map((_, index) => {
        const stepIndex = index + 1;
        const isActive = stepIndex <= currentStep;

        return (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-all
              ${isActive ? "bg-blue-600" : "bg-gray-200"}
            `}
          />
        );
      })}
    </div>
  );
}

// app/mentor/[step]/StepClient.tsx
"use client";

import Step1 from "../steps/Step1";
import Step2 from "../steps/Step2";
import Step3 from "../steps/Step3";
import Step4 from "../steps/Step4";
import Step5 from "../steps/Step5";
import { notFound } from "next/navigation";

export default function StepClient({ step }) {
  switch (step) {
    case "step-1":
      return <Step1 />;
    case "step-2":
      return <Step2 />;
    case "step-3":
      return <Step3 />;
    case "step-4":
      return <Step4 />;
    case "step-5":
      return <Step5 />;
    default:
      return notFound();
  }
}

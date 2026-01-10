import React from "react";
import StepClient from "../steps/StepClient";


export default function StepPage({
  params,
}) {
  const { step } = React.use(params);

  return <StepClient step={step} />;
}

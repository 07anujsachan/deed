import { createSlice } from "@reduxjs/toolkit";

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState: {
    currentStep: 1,
  },
  reducers: {
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
    resetOnboarding: (state) => {
      state.currentStep = 1;
    },
  },
});

export const { setStep, resetOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const mentorSlice = createSlice({
  name: "mentor",
  initialState: {
    currentStep: 1,
    formData: {},
    isVerified: false,
  },
  reducers: {
    setMentorSession(state, action) {
      state.currentStep = action.payload.currentStep;
      state.formData = action.payload.data || {};
      state.isVerified = action.payload.isVerified;
    },
    updateFormData(state, action) {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetForm(state) {
      state.currentStep = 1;
      state.formData = {};
      state.isVerified = false;
    },
  },
});

export const { setMentorSession, updateFormData, resetForm } =
  mentorSlice.actions;
export default mentorSlice.reducer;

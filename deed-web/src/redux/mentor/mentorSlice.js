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
      state.isVerified = true;
    },
  },
});

export const { setMentorSession } = mentorSlice.actions;
export default mentorSlice.reducer;

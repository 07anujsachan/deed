import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import onboardingReducer from "./onboarding/onboardingSlice";
import { authApi } from "./auth/authApi";
import { onboardingApi } from "./onboarding/onboardingApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    onboarding: onboardingReducer,
    [authApi.reducerPath]: authApi.reducer,
    [onboardingApi.reducerPath]: onboardingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      onboardingApi.middleware
    ),
});

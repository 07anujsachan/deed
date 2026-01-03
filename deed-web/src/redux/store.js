import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { authApi } from "./auth/authApi";
import mentorReducer from "./mentor/mentorSlice";
import { mentorApi } from "./mentor/mentorApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mentor: mentorReducer,
    [authApi.reducerPath]: authApi.reducer,
    [mentorApi.reducerPath]: mentorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      mentorApi.middleware
    ),
});

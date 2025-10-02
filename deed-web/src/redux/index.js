// store/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./global.slice";
import { mentorApiSlice } from "@/features/mentor/mentorApiSlice";

const store = configureStore({
  reducer: {
    global: globalSlice,
    [mentorApiSlice.reducerPath]: mentorApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mentorApiSlice.middleware),
});

export default store;

// store/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./global.slice";

const store = configureStore({
  reducer: {
    global: globalSlice,
  },
});

export default store;

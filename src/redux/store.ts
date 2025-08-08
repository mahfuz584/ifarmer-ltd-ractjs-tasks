import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./features/slices/test";

export const store = () => {
  return configureStore({
    reducer: {
      message: messageReducer,
    },
  });
};

// Infer the type of store
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

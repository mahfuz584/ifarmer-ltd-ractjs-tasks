import { configureStore } from "@reduxjs/toolkit";
import ticTacToeSlice from "./features/slices/ticTacToeSlice";

export const store = () => {
  return configureStore({
    reducer: {
      ticTacToe: ticTacToeSlice,
    },
  });
};

// Infer the type of store
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

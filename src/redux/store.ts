import { loadGameState, saveGameState } from "@/lib/utils";
import { configureStore } from "@reduxjs/toolkit";
import ticTacToeSlice from "./features/slices/ticTacToeSlice";

const preloadedState = loadGameState();

export const store = configureStore({
  reducer: {
    ticTacToe: ticTacToeSlice,
  },
  ...(preloadedState !== undefined && {
    preloadedState: { ticTacToe: preloadedState },
  }),
});

store.subscribe(() => {
  saveGameState(store.getState().ticTacToe);
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

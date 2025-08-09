import { loadGameState, saveGameState } from "@/lib/utils";
import { configureStore } from "@reduxjs/toolkit";
import ticTacToeSlice from "./features/slices/ticTacToeSlice";
import { productApi } from "./query/productsQuery";

const preloadedState = loadGameState();

export const store = configureStore({
  reducer: {
    ticTacToe: ticTacToeSlice,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
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

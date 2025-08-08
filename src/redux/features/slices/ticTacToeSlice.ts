import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Player = {
  id: string;
  name: string;
  score: number;
};

type GameState = {
  players: Player[];
  boardSize: number;
  currentTurn: string;
  round: number;
  board: string[][];
  status: "waiting" | "playing" | "finished";
};

const initialState: GameState = {
  players: [],
  boardSize: 3,
  currentTurn: "",
  round: 1,
  board: Array(3)
    .fill("")
    .map(() => Array(3).fill("")),
  status: "waiting",
};

const ticTacToeSlice = createSlice({
  name: "ticTacToe",
  initialState,
  reducers: {
    setGameState: (state, action: PayloadAction<GameState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setGameState } = ticTacToeSlice.actions;
export default ticTacToeSlice.reducer;

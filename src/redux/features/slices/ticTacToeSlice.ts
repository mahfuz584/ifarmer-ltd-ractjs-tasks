import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Player = {
  id: string;
  name: string;
  score: number;
};

export type GameState = {
  players: Player[];
  boardSize: number;
  currentTurn: string;
  round: number;
  maxRounds: number;
  board: string[][];
  status: "waiting" | "playing" | "finished" | "matchFinished";
  winnerId: string | null;
};

const makeEmptyBoard = (n: number) =>
  Array.from({ length: n }, () => Array.from({ length: n }, () => ""));

const initialState: GameState = {
  players: [],
  boardSize: 3,
  currentTurn: "",
  round: 1,
  maxRounds: 5,
  board: makeEmptyBoard(3),
  status: "waiting",
  winnerId: null,
};

const ticTacToeSlice = createSlice({
  name: "ticTacToe",
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
      state.currentTurn = action.payload[0]?.id || "";
      state.status = "playing";
      state.round = 1;
      state.winnerId = null;
      state.board = makeEmptyBoard(state.boardSize);
      state.players.forEach((p) => (p.score = 0));
    },
    updateCell: (
      state,
      action: PayloadAction<{ row: number; col: number }>
    ) => {
      if (state.status !== "playing") return;
      const { row, col } = action.payload;
      if (state.board[row][col] !== "") return;
      const currentPlayerIndex = state.players.findIndex(
        (p) => p.id === state.currentTurn
      );
      const symbol = currentPlayerIndex === 0 ? "X" : "O";
      state.board[row][col] = symbol;
    },
    finishRound: (
      state,
      action: PayloadAction<{ winnerId: string | null }>
    ) => {
      if (action.payload.winnerId) {
        const winner = state.players.find(
          (p) => p.id === action.payload.winnerId
        );
        if (winner) winner.score += 2;
        const loser = state.players.find(
          (p) => p.id !== action.payload.winnerId
        );
        if (loser) loser.score += 1;
      }
      if (state.round >= state.maxRounds) {
        state.status = "matchFinished";
        const maxScore = Math.max(...state.players.map((p) => p.score));
        const winners = state.players.filter((p) => p.score === maxScore);
        state.winnerId = winners.length === 1 ? winners[0].id : null;
      } else {
        state.round++;
        state.status = "playing";
        state.board = makeEmptyBoard(state.boardSize);
        state.currentTurn = state.players[0]?.id || "";
      }
    },
    switchTurn: (state) => {
      if (state.status !== "playing") return;
      const currentIndex = state.players.findIndex(
        (p) => p.id === state.currentTurn
      );
      state.currentTurn =
        state.players[(currentIndex + 1) % state.players.length]?.id || "";
    },
    resetBoard: (state) => {
      if (state.status === "playing") {
        state.board = makeEmptyBoard(state.boardSize);
      }
    },
    resetMatch: (state) => {
      state.round = 1;
      state.status = "playing";
      state.winnerId = null;
      state.board = makeEmptyBoard(state.boardSize);
      state.players.forEach((p) => (p.score = 0));
      state.currentTurn = state.players[0]?.id || "";
    },
    clearLeaderboard: (state) => {
      state.players.forEach((p) => (p.score = 0));
    },
    setGameState: (_state, action: PayloadAction<GameState>) => {
      return action.payload;
    },
  },
});

export const {
  setPlayers,
  updateCell,
  finishRound,
  switchTurn,
  resetBoard,
  resetMatch,
  clearLeaderboard,
  setGameState,
} = ticTacToeSlice.actions;

export default ticTacToeSlice.reducer;
export { initialState };

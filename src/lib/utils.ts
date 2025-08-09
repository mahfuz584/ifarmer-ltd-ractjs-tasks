import { GameState } from "@/redux/features/slices/ticTacToeSlice";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const saveGameState = (state: GameState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("ticTacToeGameState", serializedState);
  } catch (e) {
    console.error("Failed to save game state", e);
  }
};

export const loadGameState = (): GameState | undefined => {
  try {
    const serializedState = localStorage.getItem("ticTacToeGameState");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Failed to load game state", e);
    return undefined;
  }
};

"use client";

import { loadGameState, saveGameState } from "@/lib/utils";
import { setGameState } from "@/redux/features/slices/ticTacToeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

const PersistGameState = () => {
  const dispatch = useAppDispatch();
  const gameState = useAppSelector((state) => state.ticTacToe);

  useEffect(() => {
    const savedState = loadGameState();
    if (savedState) {
      dispatch(setGameState(savedState));
    }
  }, [dispatch]);

  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  return null;
};

export default PersistGameState;

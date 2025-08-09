"use client";

import { checkWinner, isBoardFull } from "@/app/assignment-1/_components/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  finishRound,
  resetBoard,
  switchTurn,
  updateCell,
} from "@/redux/features/slices/ticTacToeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const GameBoard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { board, currentTurn, players, round, status } = useAppSelector(
    (state) => state.ticTacToe
  );

  const currentPlayerIndex = players.findIndex((p) => p.id === currentTurn);
  const currentPlayerName = players[currentPlayerIndex]?.name || "";

  const handleClick = (row: number, col: number) => {
    if (status !== "playing") return;
    if (board[row][col] !== "") return;

    dispatch(updateCell({ row, col }));

    const symbol = currentPlayerIndex === 0 ? "X" : "O";
    const newBoard = board.map((r, rIdx) =>
      r.map((c, cIdx) => (rIdx === row && cIdx === col ? symbol : c))
    );

    if (checkWinner(newBoard, symbol)) {
      dispatch(finishRound({ winnerId: currentTurn }));
    } else if (isBoardFull(newBoard)) {
      dispatch(finishRound({ winnerId: null }));
    } else {
      dispatch(switchTurn());
    }
  };

  const handleResetRound = () => {
    dispatch(resetBoard());
  };

  return (
    <div className="flex flex-col items-center h-full p-4 gap-12">
      <Card className="border-green-300 shadow-md flex flex-col justify-between w-full">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-gray-600">
            Game Info
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-600">
            Current Turn:
            <span className="text-green-700 font-bold ml-1">
              {currentPlayerName}
            </span>
          </p>
          <div>
            <p className="mb-5">
              Round: <span className="text-green-600">{round}</span>
            </p>
            <div className="flex gap-4">
              <Button
                onClick={handleResetRound}
                disabled={status !== "playing"}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold disabled:opacity-50"
              >
                Reset Round
              </Button>
              <Button
                onClick={() => router.push("/assignment-1/leaderboard")}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Leaderboard
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-3 border gap-4 w-80 h-80 bg-white rounded-xl shadow-lg p-6 border-green-300">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Button
              key={`${rowIndex}-${colIndex}`}
              aria-label={`Cell ${rowIndex + 1}, ${colIndex + 1}`}
              onClick={() => handleClick(rowIndex, colIndex)}
              className={cn(
                "border border-gray-300 rounded-lg flex items-center justify-center text-5xl font-bold transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer size-20 bg-white hover:bg-white",
                cell === "X" && "text-blue-600",
                cell === "O" && "text-red-600",
                cell === "" && "text-gray-300"
              )}
            >
              {cell}
            </Button>
          ))
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        {players.map((player, i) => {
          return (
            <Card key={player.id} className="w-full border-green-300 shadow-md">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-gray-600">
                  Player ({i === 0 ? "X" : "O"})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold text-green-800">
                  {player.name}
                </p>
                <p className="text-lg font-semibold text-green-700">
                  Score: {player.score}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default GameBoard;

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { clearLeaderboard } from "@/redux/features/slices/ticTacToeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const Leaderboard = () => {
  const dispatch = useAppDispatch();
  const { players } = useAppSelector((state) => state.ticTacToe);

  const handleClear = () => {
    dispatch(clearLeaderboard());
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Leaderboard</h1>
      {players.length === 0 && <p>No players available.</p>}
      <div className="space-y-4">
        {players.map((player, i) => (
          <Card key={player.id} className="border-green-300 shadow-md">
            <CardHeader>
              <CardTitle>
                Player {i + 1}: {player.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-green-700">
                Score: {player.score}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button
        onClick={handleClear}
        className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold"
      >
        Clear Leaderboard
      </Button>
    </div>
  );
};

export default Leaderboard;

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { setGameState } from "@/redux/features/slices/ticTacToeSlice";
import { useAppDispatch } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { formInputs } from "./constants";
import { PlayerFormInputs, playerSchema } from "./schema";

const PlayerSetupForm = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<PlayerFormInputs>({
    defaultValues: {
      player1: "",
      player2: "",
    },
    resolver: zodResolver(playerSchema),
  });

  const dispatch = useAppDispatch();

  const watchFields = useWatch({
    control,
    name: ["player1", "player2"],
  });

  const isDisabled = !watchFields?.[0] || !watchFields?.[1];

  const onSubmit = (data: PlayerFormInputs) => {
    const playersInfo = [
      {
        id: data.player1.toLowerCase().replace(/\s+/g, "-") + Date.now() + "-1",
        name: data.player1,
        score: 0,
      },
      {
        id: data.player2.toLowerCase().replace(/\s+/g, "-") + Date.now() + "-2",
        name: data.player2,
        score: 0,
      },
    ];

    const initialGameValue = {
      players: playersInfo,
      boardSize: 3,
      currentTurn: playersInfo[0].id,
      round: 1,
      board: Array(3)
        .fill("")
        .map(() => Array(3).fill("")),
      status: "playing" as const,
      maxRounds: 5,
      winnerId: null,
    };

    dispatch(setGameState(initialGameValue));
    router.push("/assignment-1");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="mx-auto bg-white bg-opacity-90 rounded-xl shadow-lg p-8 min-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-green-600">
          Player Setup
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {formInputs.map(({ name, label, type, placeholder }) => (
            <div key={name}>
              <label className="block text-gray-700 font-semibold mb-2">
                {label}
              </label>
              <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      id={name}
                      {...field}
                      type={type}
                      placeholder={placeholder}
                      className={cn(
                        "focus-visible:ring-1 focus-visible:ring-green-500 focus:border-green-300",
                        error && "border-red-500"
                      )}
                    />
                    {error && (
                      <p className="mt-1 text-sm text-red-600">
                        {error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          ))}
          <Button
            type="submit"
            disabled={isDisabled}
            className={cn(
              "bg-green-300 hover:bg-green-400 text-gray-800 font-semibold w-full cursor-pointer",
              isDisabled && "cursor-not-allowed"
            )}
          >
            Start the match
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PlayerSetupForm;

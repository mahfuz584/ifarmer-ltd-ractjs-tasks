import z from "zod";

export const playerSchema = z.object({
  player1: z
    .string()
    .min(2, {
      message: "Player 1 name must be at least 2 characters long",
    })
    .max(100, {
      message: "Player 1 name must be at most 100 characters long",
    }),
  player2: z
    .string()
    .min(2, {
      message: "Player 2 name must be at least 2 characters long",
    })
    .max(100, {
      message: "Player 2 name must be at most 100 characters long",
    }),
});

export type PlayerFormInputs = z.infer<typeof playerSchema>;

export function checkWinner(board: string[][], symbol: string): boolean {
  const size = board.length;

  for (let row = 0; row < size; row++) {
    if (board[row].every((cell) => cell === symbol)) return true;
  }

  for (let col = 0; col < size; col++) {
    if (board.every((row) => row[col] === symbol)) return true;
  }

  if (board.every((row, idx) => row[idx] === symbol)) return true;

  if (board.every((row, idx) => row[size - 1 - idx] === symbol)) return true;

  return false;
}

export function isBoardFull(board: string[][]): boolean {
  return board.every((row) => row.every((cell) => cell !== ""));
}

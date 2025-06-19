import { useState } from "react";
import { View, Pressable, Text } from "react-native";

export default function TicTacToe() {
  const [square, setSquare] = useState(Array(9).fill(""));
  const [xIsNext, setXIsNext] = useState(true);
  const handleClick = (i: any) => {
    if (square[i] || calculateWinner(square)) return;
    const nextSquares = square.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquare(nextSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (square.every((s) => s !== "")) {
    status = "Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const resetGame = () => {
    setSquare(Array(9).fill(""));
    setXIsNext(true);
  };
  return (
    <View className="flex-1 items-center justify-center space-y-1">
      <Text className="mb-5 text-3xl">{status}</Text>
      <View className="flex flex-row space-x-1">
        <Square value={square[0]} onSquareClick={() => handleClick(0)} />
        <Square value={square[1]} onSquareClick={() => handleClick(1)} />
        <Square value={square[2]} onSquareClick={() => handleClick(2)} />
      </View>
      <View className="flex flex-row space-x-1">
        <Square value={square[3]} onSquareClick={() => handleClick(3)} />
        <Square value={square[4]} onSquareClick={() => handleClick(4)} />
        <Square value={square[5]} onSquareClick={() => handleClick(5)} />
      </View>
      <View className="flex flex-row space-x-1">
        <Square value={square[6]} onSquareClick={() => handleClick(6)} />
        <Square value={square[7]} onSquareClick={() => handleClick(7)} />
        <Square value={square[8]} onSquareClick={() => handleClick(8)} />
      </View>
      <Pressable onPress={resetGame} className="rounded bg-blue-500 px-4 py-2">
        <Text className="text-lg font-semibold text-white">Reset Game</Text>
      </Pressable>
    </View>
  );
}

function Square(props: { value: string; onSquareClick: () => void }) {
  const { value, onSquareClick } = props;
  return (
    <Pressable
      className="h-14 w-14 flex-1 items-center justify-center bg-red-400"
      onPress={onSquareClick}
    >
      <Text className="text-2xl">{value}</Text>
    </Pressable>
  );
}

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

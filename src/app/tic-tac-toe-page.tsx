import { View, Text, Pressable } from "react-native";
import TicTacToe from "../ui/tic-tac-toe";

export default function TicTacToePage() {
  return (
    <View className="flex-1 items-center justify-center">
      <TicTacToe />
    </View>
  );
}

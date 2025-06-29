import { View, Text } from "react-native";
import Spinner from "../ui/spinner";

export default function SpinnerPage() {
  return (
    <View className="flex-1 items-center justify-center bg-pink-200">
      <Text className="mb-4 text-2xl font-bold">Loading...</Text>
      <Spinner radius={25} strokeWidth={6} />
    </View>
  );
}

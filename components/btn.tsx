import { Text, View } from "react-native";
export default function Button() {
  return (
    <View>
      <View className="flex-1 items-center justify-center bg-white">
        <View className="bg-blue-500 p-4 rounded-lg shadow-lg">
          <Text className="text-white text-lg font-bold">Hello World</Text>
        </View>
      </View>
    </View>
  );
}

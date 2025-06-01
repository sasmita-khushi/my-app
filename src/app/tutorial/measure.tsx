import { Pressable, Text, View } from "react-native";
import Animated, {
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
export default function Box() {
  const sv = useSharedValue(0);
  const myRef = useAnimatedRef();

  const animeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: sv.value }],
    };
  });

  const handlePress = () => {
    runOnUI(() => {
      sv.value = withSpring(sv.value + 0.5);
      const measurement = measure(myRef);
      console.log(measurement);
    })();
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Animated.View
        ref={myRef}
        className="h-24 w-24 rounded-xl bg-pink-400"
        style={animeStyle}
      ></Animated.View>
      <Pressable onPress={handlePress}>
        <Text className="mt-10 bg-green-400 p-2 text-2xl">Press Me</Text>
      </Pressable>
    </View>
  );
}

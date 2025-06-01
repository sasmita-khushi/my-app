import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  cancelAnimation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center">
      <Circle delay={100} />
      <Circle delay={400} />
      <Circle delay={700} />
    </View>
  );
}

function Circle(props: { delay: number; color?: string }) {
  const sv = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: sv.value }],
      opacity: interpolate(sv.value, [0, 5], [1, 0]),
      borderColor: interpolateColor(sv.value, [0, 5], ["blue", "red"]),
    };
  });

  useEffect(() => {
    sv.value = withDelay(
      props.delay,
      withRepeat(withTiming(5, { duration: 2000 }), -1, false),
    );
    return () => {
      cancelAnimation(sv);
    };
    // const timeout = setTimeout(() => {
    //   sv.value = withRepeat(withTiming(5, { duration: 2000 }), -1, false);
    // }, props.delay);
    // return () => {
    //   cancelAnimation(sv);
    //   clearTimeout(timeout);
    // };
  });
  return (
    <Animated.View
      style={[{ borderColor: "blue" }, animatedStyle]}
      className="absolute h-20 w-20 rounded-full border-2"
    ></Animated.View>
  );
}

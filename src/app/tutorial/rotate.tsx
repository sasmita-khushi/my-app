import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function app() {
  return (
    <View className="flex-1 items-start justify-center p-4">
      <Rectangle />
    </View>
  );
}

function Rectangle() {
  const sv = useSharedValue(0);
  const bg = useSharedValue("blue");

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: bg.value,
      transform: [
        { translateX: interpolate(sv.value, [0, 1], [0, 300]) },
        { rotate: `${interpolate(sv.value, [0, 1], [0, 360])}deg` },
      ],

      // backgroundColor: interpolateColor(sv.value, [0, 1], ["blue", "yellow"]),
    };
  });

  useEffect(() => {
    sv.value = withTiming(1, { duration: 2000 }, (finish) => {
      if (finish) {
        bg.value = "red";
      }
    });
  });
  return (
    <Animated.View style={animatedStyle} className="h-8 w-28"></Animated.View>
  );
}

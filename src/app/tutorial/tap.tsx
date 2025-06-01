import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min + 1) + min;
}

export default function Tap() {
  const sv = useSharedValue(1);
  const rotateSv = useSharedValue(0);
  const translateSv = useSharedValue({ x: 0, y: 0 });

  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: sv.value },
        { translateX: translateSv.value.x },
        { translateY: translateSv.value.y },
        { rotate: rotateSv.value + "deg" },
      ],
    };
  });

  const handlePress = () => {
    sv.value = withSpring(1.2);
  };

  const handlePressOut = () => {
    sv.value = withSpring(1);
    rotateSv.value = withTiming(rotateSv.value + 90, { duration: 300 });
  };

  const handleBlackPress = () => {
    let newX = randomBetween(-100, 100);
    let newY = randomBetween(-100, 100);
    translateSv.value = withTiming({ x: newX, y: newY }, { duration: 300 });
  };

  return (
    <>
      <View className="flex-1 items-center justify-center">
        <Pressable onPressIn={handlePress} onPressOut={handlePressOut}>
          <Animated.View
            style={[animStyle]}
            className="h-32 w-32 rounded-3xl bg-blue-400"
          ></Animated.View>
        </Pressable>
      </View>
      <Pressable
        className="absolute bottom-10 right-10 h-24 w-24 rounded-full bg-black"
        onPress={handleBlackPress}
      ></Pressable>
    </>
  );
}

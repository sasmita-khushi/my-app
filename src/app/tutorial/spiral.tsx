import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function SpiralPage() {
  const sv = useSharedValue({ x: 0, y: 0 });
  const context = useSharedValue({ x: 0, y: 0 });

  const redCircle = useDerivedValue(() => {
    return withSpring({ x: sv.value.x, y: sv.value.y });
  });

  const yellowCircle = useDerivedValue(() => {
    return withSpring({ x: redCircle.value.x, y: redCircle.value.y });
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      context.value = { x: sv.value.x, y: sv.value.y };
    })
    .onUpdate((event) => {
      sv.value = {
        x: context.value.x + event.translationX,
        y: context.value.y + event.translationY,
      };
    });

  const blueCircleAnimeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: sv.value.x }, { translateY: sv.value.y }],
    };
  });

  const redCircleAnimeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: redCircle.value.x },
        { translateY: redCircle.value.y },
      ],
    };
  });

  const YellowCircleAnimeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: yellowCircle.value.x },
        { translateY: yellowCircle.value.y },
      ],
    };
  });
  return (
    <MainContainer className="flex-1 items-center justify-center">
      <GestureDetector gesture={gesture}>
        <BlueCircle
          className="absolute z-30 h-10 w-10 cursor-pointer rounded-full bg-blue-500 shadow"
          style={blueCircleAnimeStyle}
        ></BlueCircle>
      </GestureDetector>
      <RedCircle
        className="absolute z-20 h-10 w-10 rounded-full bg-red-400"
        style={redCircleAnimeStyle}
      ></RedCircle>
      <YellowCircle
        className="absolute z-10 h-10 w-10 rounded-full bg-yellow-400"
        style={YellowCircleAnimeStyle}
      ></YellowCircle>
    </MainContainer>
  );
}
const MainContainer = View;
const BlueCircle = Animated.View;
const RedCircle = Animated.View;
const YellowCircle = Animated.View;

import { View, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const BOX_SIZE = 128;

export default function PanGesture() {
  const translateSv = useSharedValue({ x: 0, y: 0 });
  const context = useSharedValue({ x: 0, y: 0 });
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const bgSv = useSharedValue(0);
  const scaleSv = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      context.value = { x: translateSv.value.x, y: translateSv.value.y };
      scaleSv.value = withTiming(1.2, { duration: 300 }); // Scale up on start
      bgSv.value = withTiming(0, { duration: 300 }); // Blue
    })
    .onUpdate((event) => {
      const { translationX, translationY } = event;

      const newX = context.value.x + translationX;
      const newY = context.value.y + translationY;

      const minX = -(windowWidth / 2 - BOX_SIZE / 2);
      const maxX = windowWidth / 2 - BOX_SIZE / 2;
      const minY = -(windowHeight / 2 - BOX_SIZE / 2);
      const maxY = windowHeight / 2 - BOX_SIZE / 2;

      translateSv.value = {
        x: Math.max(minX, Math.min(maxX, newX)),
        y: Math.max(minY, Math.min(maxY, newY)),
      };
    })
    .onEnd(() => {
      if (translateSv.value.y < -BOX_SIZE / 2) {
        bgSv.value = withTiming(1, { duration: 300 }); //black
      } else if (translateSv.value.y > BOX_SIZE / 2) {
        bgSv.value = withTiming(2, { duration: 300 }); // Black
      } else {
        bgSv.value = withTiming(0, { duration: 300 }); // Blue
      }
    })
    .onFinalize(() => {
      scaleSv.value = withTiming(1, { duration: 300 }); // Scale back to normal
    });

  const animeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateSv.value.x,
        },
        { translateY: translateSv.value.y },
        { rotate: `${interpolate(scaleSv.value, [1, 1.2], [0, 45])}deg` },
        { scale: scaleSv.value },
      ],
      backgroundColor: interpolateColor(
        bgSv.value,
        [0, 1, 2],
        ["blue", "black", "white"],
      ),
    };
  });
  return (
    <Container className="flex-1">
      <WhiteArea className="flex-1 bg-white"></WhiteArea>
      <BlackArea className="flex-1 items-center bg-black">
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[animeStyle, { width: BOX_SIZE, height: BOX_SIZE }]}
            className="absolute -mt-16 rounded-3xl bg-blue-400"
          ></Animated.View>
        </GestureDetector>
      </BlackArea>
    </Container>
  );
}

const Container = View;
const WhiteArea = View;
const BlackArea = View;
const BlueBox = Animated.View;

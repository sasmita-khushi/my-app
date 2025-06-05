import { useEffect, useState } from "react";
import { GestureResponderEvent, Pressable } from "react-native";
import Animated, {
  interpolate,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const CIRCLE_SIZE = 50;
function computeScale(x: number, y: number, width: number, height: number) {
  const distance = [
    Math.hypot(x - 0, y - 0),
    Math.hypot(x - width, y - 0),
    Math.hypot(x - 0, y - height),
    Math.hypot(x - width, y - height),
  ];

  const maxDistance = Math.max(...distance);
  const scale = maxDistance / CIRCLE_SIZE / 2;
  return scale;
}

export default function MyCircle() {
  const [circles, setCircles] = useState<{ x: number; y: number }[]>([]);

  const handlePress = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    const circlesCopy = [...circles];
    circlesCopy.push({
      x: locationX - CIRCLE_SIZE / 2,
      y: locationY - CIRCLE_SIZE / 2,
    });
    setCircles(circlesCopy);
  };

  return (
    <MainContainer className="flex-1 bg-pink-100" onPressIn={handlePress}>
      {circles.map((circle, index) => (
        <Circle key={index} left={circle.x} top={circle.y} />
      ))}
    </MainContainer>
  );
}

const MainContainer = Pressable;

function Circle(props: { left: number; top: number }) {
  const scaleSv = useSharedValue(0);
  const toScale = useSharedValue(0);

  const circleAnimeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleSv.value }],
      opacity: interpolate(scaleSv.value, [0, scaleSv.value], [1, 0]),
    };
  });

  useEffect(() => {
    toScale.value = computeScale(
      props.left + CIRCLE_SIZE / 2,
      props.top + CIRCLE_SIZE / 2,
      300, // Assuming a width of 375 for the screen
      300, // Assuming a height of 667 for the screen
    );
    runOnUI(() => {
      scaleSv.value = withTiming(toScale.value, {
        duration: 300,
      });
    });
  });

  return (
    <Animated.View
      className="absolute rounded-full bg-blue-500"
      style={[
        {
          height: CIRCLE_SIZE,
          width: CIRCLE_SIZE,
          left: props.left,
          top: props.top,
        },
        circleAnimeStyle,
      ]}
    />
  );
}

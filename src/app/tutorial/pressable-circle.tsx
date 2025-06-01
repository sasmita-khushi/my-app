import { useEffect, useState } from "react";
import { GestureResponderEvent, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const CIRCLE_SIZE = 50;

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

  const circleAnimeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleSv.value }],
    };
  });

  useEffect(() => {
    scaleSv.value = withSpring(1);
  }, []);

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

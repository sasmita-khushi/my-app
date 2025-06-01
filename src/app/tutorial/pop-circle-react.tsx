import { useEffect, useState } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const CIRCLE_SIZE = 50;

export default function MyCircle() {
  const [circles, setCircles] = useState<{ x: number; y: number }[]>([]);

  const gesture = Gesture.Tap().onEnd((event) => {
    console.log("Tap at:", event.absoluteX, event.absoluteY);
    const circlesCopy = [...circles];
    circlesCopy.push({
      x: event.absoluteX - CIRCLE_SIZE / 2,
      y: event.absoluteY - CIRCLE_SIZE / 2,
    });
    setCircles(circlesCopy);
  });

  return (
    <GestureDetector gesture={gesture}>
      <View style={{ flex: 1, backgroundColor: "#fce4ec" }}>
        {circles.map((circle, index) => (
          <Circle key={index} left={circle.x} top={circle.y} />
        ))}
      </View>
    </GestureDetector>
  );
}

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
      style={[
        {
          height: CIRCLE_SIZE,
          width: CIRCLE_SIZE,
          left: props.left,
          top: props.top,
          position: "absolute",
          backgroundColor: "#3b82f6",
          borderRadius: CIRCLE_SIZE / 2,
          zIndex: 10,
        },
        circleAnimeStyle,
      ]}
    />
  );
}

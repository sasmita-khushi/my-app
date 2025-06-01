import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function hello() {
  return (
    <View className="flex-1 items-center justify-end">
      <Slider />
    </View>
  );
}

function Slider() {
  const BOX_WIDTH = 300;
  const BOX_HEIGHT = 80;

  const sv = useSharedValue(0);
  const scaleSv = useSharedValue(1);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      scaleSv.value = withSpring(1.1, {
        overshootClamping: true,
      });
    })
    .onUpdate((event) => {
      const newX =
        event.translationX < 0
          ? 0
          : event.translationX > BOX_WIDTH - BOX_HEIGHT
            ? BOX_WIDTH - BOX_HEIGHT
            : event.translationX;
      sv.value = newX;
    })
    .onEnd(() => {
      if (sv.value > BOX_WIDTH * 0.7) {
        sv.value = BOX_WIDTH - BOX_HEIGHT; // Snap to the end
      } else {
        sv.value = withSpring(0, {
          overshootClamping: true,
        }); // Snap back to the start
      }
      scaleSv.value = withSpring(1, {
        overshootClamping: true,
      });
    })
    .onFinalize(() => {
      scaleSv.value = withSpring(1);
    });

  const animeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: sv.value }],
    };
  });

  const textAnimeStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        sv.value,
        [0, BOX_WIDTH * 0.3, BOX_WIDTH - BOX_HEIGHT],
        [1, 0.1, 0],
      ),
    };
  });

  const greenTextAnimeStyle = useAnimatedStyle(() => {
    return {
      width: sv.value + BOX_HEIGHT,
    };
  });

  const InnerCircleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleSv.value }],
    };
  });

  return (
    <Holder
      className="relative mb-10 items-center justify-center overflow-hidden rounded-full bg-blue-400"
      style={[
        {
          width: BOX_WIDTH,
          height: BOX_HEIGHT,
        },
      ]}
    >
      <Animated.Text className="absolute ml-9 text-lg" style={[textAnimeStyle]}>
        Slide to answer Call
      </Animated.Text>
      <GreenBox
        className="absolute left-0 top-0 rounded-full bg-white"
        style={[{ width: 30, height: BOX_HEIGHT }, greenTextAnimeStyle]}
      >
        <GestureDetector gesture={gesture}>
          <Circle
            style={[
              animeStyle,
              { height: BOX_HEIGHT, width: BOX_HEIGHT, borderRadius: 40 },
            ]}
            className="absolute left-0 top-0 items-center justify-center bg-blue-400"
          >
            <InnerCircle
              className="absolute items-center justify-center rounded-full bg-blue-200"
              style={[{ height: 60, width: 60 }, InnerCircleAnimatedStyle]}
            >
              <Ionicons name="call-outline" size={32} color="black"></Ionicons>
            </InnerCircle>
          </Circle>
        </GestureDetector>
      </GreenBox>
    </Holder>
  );
}
const Holder = Animated.View;
const Circle = Animated.View;
const GreenBox = Animated.View;
const InnerCircle = Animated.View;

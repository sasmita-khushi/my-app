import { ScrollView, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const circleSize = 50;
const Move_speed = 1500; // ms

export default function SpatialPage() {
  const toMove = useSharedValue("B1");

  const { width, height } = useWindowDimensions();
  const startX = width / 2 - circleSize / 2;
  const startY = height / 2 - circleSize / 2;

  const sv = useSharedValue({ x: startX, y: startY });

  const blackCircle1ScaleSv = useSharedValue(1);
  const blackCircle2ScaleSv = useSharedValue(1);
  const blackCircle1OpacitySv = useSharedValue(1);
  const blackCircle2OpacitySv = useSharedValue(1);
  const blackCircle1TranslateSv = useSharedValue({ x: startX, y: startY });
  const blackCircle2TranslateSv = useSharedValue({ x: startX, y: startY });

  const panGesture = Gesture.Tap()
    .onBegin(() => {
      if (toMove.value === "B1") {
        blackCircle1ScaleSv.value = 0;
      } else if (toMove.value === "B2") {
        blackCircle2ScaleSv.value = 0;
      }
    })
    .onStart((event) => {
      if (toMove.value === "B1") {
        blackCircle1TranslateSv.value = {
          x: event.x - circleSize / 2,
          y: event.y - circleSize / 2,
        };
        blackCircle1OpacitySv.value = withTiming(1, { duration: 300 });
        blackCircle1ScaleSv.value = withTiming(1, { duration: 300 });
        blackCircle2OpacitySv.value = withTiming(0, {
          duration: Move_speed / 2,
        });

        toMove.value = "B2";
      } else if (toMove.value === "B2") {
        blackCircle2TranslateSv.value = {
          x: event.x - circleSize / 2,
          y: event.y - circleSize / 2,
        };
        blackCircle2OpacitySv.value = withTiming(1, { duration: 300 });
        blackCircle2ScaleSv.value = withTiming(1, { duration: 300 });
        blackCircle1OpacitySv.value = withTiming(0, {
          duration: Move_speed / 2,
        });
        toMove.value = "B1";
      }
      sv.value = withTiming(
        {
          x: event.x - circleSize / 2,
          y: event.y - circleSize / 2,
        },
        { duration: Move_speed },
      );
    });

  const blueAnimeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: sv.value.x }, { translateY: sv.value.y }],
    };
  });

  const b1AnimeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: blackCircle1TranslateSv.value.x },
        { translateY: blackCircle1TranslateSv.value.y },
        { scale: blackCircle1ScaleSv.value },
      ],
      opacity: blackCircle1OpacitySv.value,
    };
  });

  const b2AnimeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: blackCircle2TranslateSv.value.x },
        { translateY: blackCircle2TranslateSv.value.y },
        { scale: blackCircle2ScaleSv.value },
      ],
      opacity: blackCircle2OpacitySv.value,
    };
  });
  return (
    <GestureDetector gesture={panGesture}>
      <MainConTainer className="flex-1 bg-black">
        <BlueCircle
          className="absolute z-30 rounded-full bg-blue-400"
          style={[{ height: circleSize, width: circleSize }, blueAnimeStyle]}
        ></BlueCircle>
        <GreyCircle1
          className="absolute z-10 rounded-full bg-gray-300"
          style={[{ height: circleSize, width: circleSize }, b1AnimeStyle]}
        ></GreyCircle1>
        <GreyCircle2
          className="absolute z-20 rounded-full bg-gray-300"
          style={[
            {
              height: circleSize,
              width: circleSize,
            },
            b2AnimeStyle,
          ]}
        ></GreyCircle2>
      </MainConTainer>
    </GestureDetector>
  );
}

const MainConTainer = ScrollView;
const BlueCircle = Animated.View;
const GreyCircle1 = Animated.View;
const GreyCircle2 = Animated.View;

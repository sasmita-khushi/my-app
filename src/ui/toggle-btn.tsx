import { useEffect } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type MyToggleButtonProps = {
  toggle: boolean;
  onToggle: (value: boolean) => void;
};

export default function MyToggleButton(props: MyToggleButtonProps) {
  const BarWidth = 55;
  const BarHeight = 32;
  const circleSize = 28;
  const offset = 3;

  const sv = useSharedValue(offset);

  const move = BarWidth - circleSize - offset;

  const circleAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: sv.value }],
    };
  });

  const barAnimeStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        sv.value,
        [offset, move],
        ["#c0c1c4", "#3b82f6"],
      ),
    };
  });

  useEffect(() => {
    sv.value = withTiming(props.toggle ? move : offset, { duration: 300 });
  }, [props.toggle]);

  const handlePress = () => {
    props.onToggle(!props.toggle);
  };

  return (
    <ButtonPressable onPress={handlePress} testID="toggleButton">
      <Container>
        <Bar
          testID="bar"
          className="justify-center rounded-full"
          style={[barAnimeStyle, { height: BarHeight, width: BarWidth }]}
        >
          <Circle
            testID="circle"
            className="rounded-full bg-white shadow-sm"
            style={[circleAnimStyle, { height: circleSize, width: circleSize }]}
          />
        </Bar>
      </Container>
    </ButtonPressable>
  );
}

const Container = View;
const ButtonPressable = Pressable;
const Circle = Animated.View;
const Bar = Animated.View;

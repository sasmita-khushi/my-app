import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type propTypes = {
  isChecked: boolean;
  onChange?: () => void;
};

export default function CheckBox(props: propTypes) {
  const scaleSv = useSharedValue(0);

  const rippleCircleAnimeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleSv.value }],
      opacity: interpolate(scaleSv.value, [0, 0.5, 1], [1, 1, 0]),
      // backgroundColor: props.isChecked ? "#3b82f6" : "#c0c1c4",
    };
  });

  const handlePress = () => {
    if (props.onChange) {
      props.onChange();
    }
    scaleSv.value = 0;
    scaleSv.value = withTiming(1, { duration: 400 });
  };

  return (
    <Container
      className="h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
      onPress={handlePress}
      testID="checkBox"
    >
      <RippleCircle
        testID="rippleCircle"
        className={[
          "absolute h-10 w-10 rounded-full",
          props.isChecked ? "bg-blue-500 dark:bg-yellow-400" : "bg-gray-400",
        ].join(" ")}
        style={rippleCircleAnimeStyle}
      ></RippleCircle>
      <Box
        className={[
          "h-5 w-5 rounded-sm border-2",
          props.isChecked
            ? "border-blue-500 bg-blue-500 dark:border-yellow-400 dark:bg-yellow-400"
            : "border-gray-500 bg-white dark:bg-slate-900",
        ].join(" ")}
      >
        {props.isChecked && (
          <Ionicons
            name="checkmark-sharp"
            size={16}
            className="text-white dark:text-black"
            accessibilityLabel="checkmark-sharp"
            testID="checkmarkIcon"
          />
        )}
      </Box>
    </Container>
  );
}

const Container = Pressable;
const Box = Animated.View;
const RippleCircle = Animated.View;

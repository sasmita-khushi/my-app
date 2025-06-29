import { Easing } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type SpinnerProps = {
  radius: number;
  strokeWidth?: number;
};

export default function Spinner(props: SpinnerProps) {
  const r = props.radius;
  const strokeWidth = props.strokeWidth || 6;
  const svgSize = r * 2 + strokeWidth;
  const Circumference = 2 * Math.PI * r;

  const sv = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: sv.value,
    };
  });

  useEffect(() => {
    sv.value = withRepeat(
      withTiming(-Circumference, { duration: 800, easing: Easing.linear }),
      -1,
      false,
    );
  }, []);

  return (
    <Svg height={svgSize} width={svgSize}>
      <Circle
        cx="50%"
        cy="50%"
        r={r}
        stroke="white"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <AnimatedCircle
        cx="50%"
        cy="50%"
        r={r}
        stroke="#000"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={[Circumference / 4, (Circumference * 3) / 4]}
        animatedProps={animatedProps}
      />
    </Svg>
  );
}

import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
export default function app() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl font-thin">Make</Text>
      <MyText />
      <Text className="text-3xl font-thin">AweSoMe!</Text>
    </View>
  );
}

function MyText() {
  const sv = useSharedValue(0);

  const animatedLifeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: interpolate(sv.value, [0, 1], [0, 10]) }],
      opacity: interpolate(sv.value, [0, 0.5, 1], [0, 1, 0]),
    };
  });

  const animatedWorkStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: interpolate(sv.value, [1, 2], [0, 15]) }],
      opacity: interpolate(sv.value, [1, 1.5, 2], [0, 1, 0]),
    };
  });
  //   const animatedEverythingStyle = useAnimatedStyle(() => {
  //     return {
  //       transform: [{ translateY: interpolate(sv.value, [2, 3], [0, 15]) }],
  //       opacity: interpolate(sv.value, [2, 2.5, 3], [0, 1, 0]),
  //     };
  //   });
  useEffect(() => {
    sv.value = withRepeat(withTiming(2, { duration: 6000 }), -1, false);
  }, []);
  return (
    <>
      <Animated.View
        style={[animatedLifeStyle, { overflow: "hidden" }]}
        className="absolute flex-row items-center justify-center"
      >
        <View className="h-10 w-40 items-center justify-center bg-sky-500">
          <Text className="text-3xl font-thin text-white">LiFeStYle</Text>
        </View>
      </Animated.View>

      <Animated.View
        style={animatedWorkStyle}
        className="flex-row items-center justify-center"
      >
        <View className="h-10 w-40 items-center justify-center bg-green-500">
          <Text className="text-3xl font-thin text-white">WoRk</Text>
        </View>
      </Animated.View>

      {/* <Animated.View
        style={animatedEverythingStyle}
        className="flex-row items-center justify-center"
      >
        <View className="h-10 w-40 bg-red-500 justify-center items-center">
          <Text className="text-white text-3xl font-thin">EverYthIng</Text>
        </View>
      </Animated.View> */}
    </>
  );
}

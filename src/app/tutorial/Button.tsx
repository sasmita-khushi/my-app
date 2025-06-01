import { useState } from "react";
import { Pressable, View } from "react-native";
import Animated, { BounceOut, Keyframe } from "react-native-reanimated";

export default function Btn() {
  const [showButton, setShowButton] = useState(true);

  const handlePress = () => {
    setShowButton((prev) => !prev);
  };

  const enteringAnim = new Keyframe({
    0: {
      transform: [{ rotate: "0deg" }],
    },
    100: {
      transform: [{ rotate: "360deg" }],
    },
  });

  return (
    <View className="flex-1">
      {showButton && (
        <Animated.View
          className="absolute mb-7 h-20 w-52 rounded-lg bg-blue-500"
          entering={enteringAnim}
          exiting={BounceOut}
        ></Animated.View>
      )}
      <Pressable
        onPress={handlePress}
        className="mt-64 h-96 w-96 bg-blue-500"
      />
    </View>
  );
}

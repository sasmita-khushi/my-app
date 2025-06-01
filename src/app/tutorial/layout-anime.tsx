import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { JumpingTransition } from "react-native-reanimated";

export default function BoxPage() {
  const [num, setNum] = useState<number[]>([]);
  //[] [1] [1,2] [1,2,3] [1,2,3,4]

  const handlePress = () => {
    setNum((prev) => [...prev, prev.length + 1]);
  };

  const handleRemove = () => {
    setNum((prev) => {
      const newArr = [...prev];
      newArr.pop();
      return newArr;
    });
  };

  const removeByIndex = (index: number) => {
    setNum((prev) => {
      const newArr = [...prev];
      newArr.splice(index, 1);
      return newArr;
    });
  };
  return (
    <Container className="p-20">
      <Text className="mb-10 text-2xl font-bold">Layout Animation</Text>
      <View className="mr-10 flex-row">
        <Pressable
          onPress={handlePress}
          className="mr-10 h-10 w-32 items-center justify-center bg-blue-500"
        >
          <Text className="text-2xl font-thin text-white">Add</Text>
        </Pressable>
        <Pressable
          className="h-10 w-32 items-center justify-center bg-red-500"
          onPress={handleRemove}
        >
          <Text className="text-2xl font-thin text-white">Remove</Text>
        </Pressable>
      </View>

      <Animated.View className="mt-10" layout={JumpingTransition}>
        {num.map((e, index) => (
          <Box key={index} text={e} remove={removeByIndex} />
        ))}
      </Animated.View>
    </Container>
  );
}

const Container = View;

export function Box(props: { text: number; remove: (index: number) => void }) {
  // const rotateFrame = new Keyframe({
  //   0: {
  //     transform: [{ rotate: "0deg" }],
  //   },
  //   100: {
  //     transform: [{ rotate: "360deg" }],
  //   },
  // });

  // const rotateReverseFrame = new Keyframe({
  //   0: {
  //     transform: [{ rotate: "360deg" }],
  //   },
  //   100: {
  //     transform: [{ rotate: "0deg" }],
  //   },
  // }).duration(2000);

  return (
    <Animated.View className="relative mr-10 mt-10 h-10 w-10 items-center justify-center bg-green-400">
      <Pressable
        onPress={() => props.remove(props.text - 1)}
        className="flex-1 items-center justify-center"
      >
        <Text>{props.text}</Text>
      </Pressable>
    </Animated.View>
  );
}

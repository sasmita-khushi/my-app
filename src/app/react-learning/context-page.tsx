import React, { memo, useContext } from "react";
import { Pressable, Text, View } from "react-native";
import countContext, {
  CountContextProvider,
  useCount,
} from "../react-learning/context";

export default function ContextPage() {
  const [visible, setVisible] = React.useState(true);
  const toggleVisible = () => {
    setVisible((prev) => !prev);
  };
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Pressable onPress={toggleVisible} className="mb-2 bg-blue-500 p-2">
        <Text className="text-white">Toggle Z</Text>
      </Pressable>
      {visible && <Z />}
      <View>
        <CountContextProvider>
          <App />
        </CountContextProvider>
      </View>
    </View>
  );
}

function A() {
  console.log("A rendered");
  return (
    <View>
      <Text className="text-white"> This is A</Text>
    </View>
  );
}
const MemoA = memo(A);

function B() {
  console.log("B rendered");
  return (
    <View>
      <Text className="text-white"> This is B </Text>
      <MemoC />
    </View>
  );
}
const MemoB = memo(B);

function C() {
  console.log("C rendered");
  const { count } = useContext(countContext);
  return (
    <View>
      <Text className="text-white"> This is C count:{count}</Text>
    </View>
  );
}
const MemoC = memo(C);

function Z() {
  console.log("Z rendered");
  return (
    <View>
      <Text className="text-white"> This is Z</Text>
    </View>
  );
}

function App() {
  const { handleIncrement } = useCount();
  return (
    <View>
      <Pressable onPress={handleIncrement}>
        <Text className="bg-green-500 p-2 text-white">Increment</Text>
      </Pressable>
      <View>
        <MemoA />
        <MemoB />
      </View>
    </View>
  );
}

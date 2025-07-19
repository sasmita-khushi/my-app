import { View, Text, Button } from "react-native";
import { useContext, useState, memo } from "react";
import { countContext } from "./create-context";

export default function A() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  console.log("A Component rendered");
  return (
    <countContext.Provider value={{ count, setCount }}>
      <View>
        <Text>A Component</Text>
        <Button onPress={increment} title={`Count: ${count}`} />
        <MemoizedB />
      </View>
    </countContext.Provider>
  );
}

function B() {
  console.log("B Component rendered");
  return (
    <View>
      <Text>B Component</Text>
      <C />
    </View>
  );
}
export const MemoizedB = memo(B);

function C() {
  console.log("C Component rendered");
  const { count, setCount } = useContext(countContext);
  return (
    <View>
      <Text>C Component</Text>
      <Text>Count: {count}</Text>
      <Button title="Increment from C" onPress={() => setCount(count + 1)} />
    </View>
  );
}

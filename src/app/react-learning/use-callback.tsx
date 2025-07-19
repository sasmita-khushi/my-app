import { View, Text, Button } from "react-native";
import { useState, useCallback } from "react";
import Child from "../../ui/child";

export default function App() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(false);

  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []);

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button onPress={() => setCount(count + 1)} title="Increase Count" />
      <Button onPress={() => setOther(!other)} title="Toggle Other State" />
      <Child onClick={handleClick} />
    </View>
  );
}

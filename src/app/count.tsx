import useStore from "../store";
import { View, Text, Button } from "react-native";
import { useEffect } from "react";

export default function CountPage() {
  console.log("page render");

  const setCount = useStore((state) => state.setCount);
  useEffect(() => {
    let count = parseInt(window.localStorage.getItem("count")!, 10) || 0;
    setCount(count);
  }, [setCount]);

  return (
    <View>
      <Text>Welcome To My Page!</Text>
      <ShowCounter />
      <Increment />
      <Decrement />
    </View>
  );
}

function ShowCounter() {
  console.log("Show counter render");
  const count = useStore((state) => state.count);
  return (
    <View>
      <Text>Count :{count} </Text>
    </View>
  );
}

function Increment() {
  //const increment = useStore((state) => state.increment);
  const setCount = useStore((state) => state.setCount);

  const handleIncrement = () => {
    let count = parseInt(window.localStorage.getItem("count")!, 10) || 0;
    count++;
    localStorage.setItem("count", count.toString());
    setCount(count);
  };
  return (
    <View>
      <Button title="Increment" onPress={handleIncrement} />
    </View>
  );
}

function Decrement() {
  const setCount = useStore((state) => state.setCount);

  const handleDecrement = () => {
    let count = parseInt(window.localStorage.getItem("count")!, 10) || 0;
    count--;
    localStorage.setItem("count", count.toString());
    setCount(count);
  };
  return (
    <View>
      <Button title="Decrement" onPress={handleDecrement} />
    </View>
  );
}

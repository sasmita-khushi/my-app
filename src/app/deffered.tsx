import { View, Text, TextInput } from "react-native";
import { useState, useDeferredValue } from "react";

export default function DefferedPage() {
  const [value, setValue] = useState("");

  const deferredValue = useDeferredValue(value);

  return (
    <View className="flex-1 items-center justify-center">
      <TextInput onChangeText={setValue} className="border" />
      <Text>{value}</Text>
      <Foo value={deferredValue} />
    </View>
  );
}

function Foo(props: { value: string }) {
  const { value } = props;
  console.log("Foo rendered with value:", value);
  return (
    <View>
      <Text>{value}</Text>
    </View>
  );
}

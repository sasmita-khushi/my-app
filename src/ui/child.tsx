import { View, Text, Button } from "react-native";
import { memo } from "react";
function Child(props: { onClick: () => void }) {
  console.log("Child component rendered");
  return (
    <View>
      <Text>Child Component</Text>
      <Button onPress={props.onClick} title="Click Me" />
    </View>
  );
}

export default memo(Child);

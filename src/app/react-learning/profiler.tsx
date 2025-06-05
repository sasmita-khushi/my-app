import { Profiler } from "react";
import { View, Text } from "react-native";

export default function profiler() {
  return (
    <View>
      <Profiler id="Hello Component" onRender={logRender}>
        <Hello />
      </Profiler>
    </View>
  );
}

function Hello() {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}

function logRender(id: string, phase: string, actualDuration: number) {
  console.log(`${id} rendered during ${phase}. It took ${actualDuration}ms.`);
}

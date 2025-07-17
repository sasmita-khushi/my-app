import MyCounter from "../ui/counter";

import Timer from "../ui/clock";
import { View } from "react-native";
export default function myCounterPage() {
  return (
    <View>
      <MyCounter />
      <Timer />
    </View>
  );
}

import { useState } from "react";
import { View } from "react-native";
import MyToggleButton from "../ui/toggle-btn";

export default function ToggleButtonPage() {
  const [isOn, setIsOn] = useState(false);

  return (
    <View className="flex-1 items-center justify-center">
      <MyToggleButton toggle={isOn} onToggle={setIsOn} />
    </View>
  );
}

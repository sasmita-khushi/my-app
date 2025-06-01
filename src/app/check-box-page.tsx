import { useState } from "react";
import { View } from "react-native";
import CheckBox from "../ui/check-box";

export default function CheckBoxPage() {
  const [checked, setChecked] = useState(false);
  const toggleCheck = () => {
    setChecked((prev) => !prev);
  };

  return (
    <View>
      <CheckBox isChecked={checked} onChange={toggleCheck} />
    </View>
  );
}

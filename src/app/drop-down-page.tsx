import { View } from "react-native";
import MyDropDown from "../ui/drop-down";

const myData = ["card", "cash", "upi", "net banking", "wallet"];

export default function MyDropDownPage() {
  const handleMethodChange = (method: string) => {
    console.log("Selected method:", method);
  };

  const handleSelectItem = (value: string) => {
    console.log("Selected item:", value);
  };
  return (
    <View>
      <MyDropDown
        label="Select method here :"
        data={myData}
        onClick={handleMethodChange}
        onSelect={handleSelectItem}
      />
    </View>
  );
}

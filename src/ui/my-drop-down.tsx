import {
  View,
  TextInput,
  Text,
  Pressable,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useRef } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type MyDropDownProps = {
  label: string;
  data: string[];
};

export default function DropDown(props: MyDropDownProps) {
  const [showData, setShowData] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<TextInput>(null);

  //to toggle the dropdown visibility
  const handleShowData = () => {
    setShowData((prev) => !prev);
    if (inputRef.current) {
      console.log("inputtttt....", inputRef.current);
      inputRef.current.focus();
    }
  };

  //to handle the selection of an item from the dropdown
  const handleSelectedItem = (item: string) => {
    if (!item) return;
    setSelectedItem(item);
    setSelectedIndex(props.data.indexOf(item));
    setShowData(false);
  };

  //to handle the hover effect on the dropdown items
  const handleHoverIn = (index: number) => {
    setSelectedIndex(index);
  };

  //to handle the key press events for navigation and selection
  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    console.log("Key pressed:", e.nativeEvent.key);

    if (Platform.OS === "web") {
      e.preventDefault();
    }

    if (e.nativeEvent.key === "ArrowDown") {
      setSelectedIndex((prev) => {
        const nextIndex = prev + 1;
        return nextIndex < props.data.length ? nextIndex : 0;
      });
    } else if (e.nativeEvent.key === "ArrowUp") {
      setSelectedIndex((prev) => {
        const nextIndex = prev - 1;
        return nextIndex >= 0 ? nextIndex : props.data.length - 1;
      });
    } else if (e.nativeEvent.key === "Enter") {
      handleSelectedItem(props.data[selectedIndex]);
      setSelectedIndex(-1);
    }
  };

  return (
    <View>
      <MainContainer className="relative my-6">
        <Text className="font-open-sans mb-8">{props.label}</Text>
        <TextBoxWrapper
          className="relative cursor-pointer justify-center"
          onPress={handleShowData}
        >
          <TextInput
            editable={false}
            ref={inputRef}
            className="text-md font-open-sans absolute mb-1 mt-2 w-full rounded border border-gray-300 p-3 text-slate-900 outline-none placeholder:text-gray-400 focus:border-none focus:outline-blue-500"
            placeholder="Select an option"
            value={selectedItem}
            onKeyPress={handleKeyPress}
          />
          <Ionicons
            name={showData ? "caret-up-outline" : "caret-down-outline"}
            size={20}
            color="black"
            className="absolute mr-5 cursor-pointer self-end"
          />
        </TextBoxWrapper>
        {showData && (
          <Data
            data={props.data}
            handleSelectedItem={handleSelectedItem}
            selectedIndex={selectedIndex}
            onHoverIn={handleHoverIn}
          />
        )}
      </MainContainer>
    </View>
  );
}

function Data(props: {
  data: string[];
  handleSelectedItem: (item: string) => void;
  selectedIndex: number;
  onHoverIn: (index: number) => void;
}) {
  return (
    <PanelContainer className="w-full flex-1">
      <DataPanel
        className="absolute left-0 mt-8 w-full rounded-sm border border-gray-200 bg-white"
        entering={FadeIn}
        exiting={FadeOut}
      >
        {props.data.map((item, index) => (
          <Item
            key={index}
            className={[
              "cursor-pointer p-1 py-4 pl-4",
              index === props.selectedIndex ? "bg-blue-200" : "bg-white",
            ].join(" ")}
            onPress={() => props.handleSelectedItem(item)}
            onHoverIn={() => props.onHoverIn(index)}
          >
            <ItemText className="text-base text-gray-800">{item}</ItemText>
          </Item>
        ))}
      </DataPanel>
    </PanelContainer>
  );
}

const MainContainer = View;
const TextBoxWrapper = Pressable;
const DataPanel = Animated.View;
const PanelContainer = View;
const Item = Pressable;
const ItemText = Text;

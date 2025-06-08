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
  onClick?: (value: string) => void;
  onSelect?: (value: string) => void;
};

export default function MyDropDown(props: MyDropDownProps) {
  const [click, setClick] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<TextInput>(null);

  const toggleDropdown = () => {
    setClick((prev) => !prev);
    inputRef.current?.focus();
  };

  const handleSelectItem = (value: string) => {
    // if (!value) return;
    setSelectedValue(value);
    setSelectedIndex(props.data.indexOf(value));
    setClick(false);
    if (props.onSelect) props.onSelect(value);
  };
  const handleHoverIn = (index: number) => {
    setSelectedIndex(index);
  };

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
      handleSelectItem(props.data[selectedIndex]);
      setSelectedIndex(-1); // Reset selected index after selection
    }
  };

  return (
    <View>
      <MainContainer className="mx-5">
        <Text className="mb-2">{props.label}</Text>

        <TextBoxWrapper
          className="flex-row items-center rounded border border-gray-300 bg-white"
          onPress={toggleDropdown}
        >
          <TextInput
            editable={false}
            ref={inputRef}
            className="focus-none h-12 flex-1 text-base text-slate-900 placeholder:text-gray-400"
            placeholder="Select an option"
            value={selectedValue}
            onKeyPress={handleKeyPress}
            // onBlur={() => setClick(false)}
            //  showSoftInputOnFocus={false} // Prevents keyboard from popping up on mobile
          />
          <Ionicons
            name={click ? "caret-up-outline" : "caret-down-outline"}
            size={20}
            color="black"
            onPress={toggleDropdown}
            accessible={true}
            accessibilityLabel="Toggle dropdown"
          />
        </TextBoxWrapper>

        <Data
          click={click}
          data={props.data}
          onSelect={handleSelectItem}
          selectedIndex={selectedIndex}
          onHoverIn={handleHoverIn}
        />
      </MainContainer>
    </View>
  );
}

function Data(props: {
  click: boolean;
  data: string[];
  onSelect?: (value: string) => void;
  selectedIndex?: number;
  onHoverIn: (index: number) => void;
}) {
  const handleClick = (value: string) => {
    if (props.onSelect) {
      props.onSelect(value);
    }
  };
  return (
    props.click && (
      <View className="w-full flex-1">
        <Animated.View
          className="absolute z-10 w-full rounded-sm border border-gray-200 bg-white shadow"
          entering={FadeIn}
          exiting={FadeOut}
        >
          {props.data.map((item, index) => (
            <Pressable
              key={index}
              className={`cursor-pointer p-1 py-4 pl-4 text-black ${
                index === props.selectedIndex ? "bg-blue-200" : "bg-white"
              }`}
              onPress={() => handleClick(item)}
              onHoverIn={() => props.onHoverIn(index)}
            >
              <Text className="text-base">{item}</Text>
            </Pressable>
          ))}
        </Animated.View>
      </View>
    )
  );
}

const MainContainer = View;
const TextBoxWrapper = Pressable;

import { useEffect, useRef, useState } from "react";
import {
  Platform,
  Text,
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Pressable,
} from "react-native";

type AutoCompletePropType = {
  onChange?: (textValue: string) => void;
  onSelect: (selectedItem: any) => void;
  data: { [key: string]: any }[];
  propToBind?: string;
  id?: number | string;
  label?: string;
};

export default function MyAutoComplete(props: AutoCompletePropType) {
  const [text, setText] = useState("");
  const textRef = useRef<TextInput>(null);
  const [autoPanelVisible, setAutoPanelVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleOnChangeText = (e: string) => {
    setText(e);
    if (props.onChange) {
      props.onChange(e);
    }
  };
  useEffect(() => {
    setAutoPanelVisible(true);
  }, [props.data]);

  useEffect(() => {
    const windowClickHandler = (e: MouseEvent) => {
      if (e.target !== textRef.current) setAutoPanelVisible(false);
    };
    if (Platform.OS === "web") {
      window.addEventListener("click", windowClickHandler);
    }
    return () => {
      if (Platform.OS === "web")
        window.removeEventListener("click", windowClickHandler);
    };
  }, []);

  const handleSelect = (selectedItem: any, title: string) => {
    // console.log("Selected Item:", selectedItem);
    // console.log("Selected Title:", title);
    setText(selectedItem[title]);
    props.onSelect(selectedItem);
    setAutoPanelVisible(false);
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (e.nativeEvent.key === "Enter") {
      const selectedItem = props.data[selectedIndex];
      const title = props.propToBind || "name";

      handleSelect(selectedItem, title);
      setAutoPanelVisible(false);
      setSelectedIndex(-1);
    } else if (e.nativeEvent.key === "ArrowDown") {
      console.log("ArrowDown pressed");
      if (autoPanelVisible === false && props.data.length > 0) {
        setAutoPanelVisible(true);
        return;
      }
      setSelectedIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex < props.data.length ? nextIndex : 0;
      });
    } else if (e.nativeEvent.key === "ArrowUp") {
      if (Platform.OS === "web") e.preventDefault();
      console.log("ArrowUp pressed");
      if (autoPanelVisible === false && props.data.length > 0) {
        setAutoPanelVisible(true);
        return;
      }

      setSelectedIndex((prevIndex) => {
        const nextIndex = prevIndex - 1;
        return nextIndex >= 0 ? nextIndex : props.data.length - 1;
      });
    }
  };

  return (
    <Container className="relative">
      <Label className="text-lg font-thin">{props.label}</Label>
      <View className="relative">
        <TextInput
          ref={textRef}
          value={text}
          className="absolute mb-1 mt-2 rounded border border-gray-300 p-3"
          onChangeText={handleOnChangeText}
          onKeyPress={handleKeyPress}
        />
        {props.data.length > 0 && autoPanelVisible && (
          <AutoBox
            onSelect={handleSelect}
            typedText={text}
            selectedIndex={selectedIndex}
            data={props.data}
            propToBind={props.propToBind}
            id={props.id}
          />
        )}
      </View>
    </Container>
  );
}

function AutoBox(
  props: Pick<AutoCompletePropType, "data" | "id" | "propToBind"> & {
    typedText: string;
    selectedIndex?: number;
    onSelect: (selectedItem: any, title: string) => void;
  },
) {
  let title = props.propToBind || "name";
  let id = props.id || "id";

  return (
    <Panel className="absolute top-16 w-72 bg-slate-100">
      {props.data.map((item, index) => {
        let arr = item[title]
          .toUpperCase()
          .split(props.typedText.toUpperCase());
        return (
          <Item
            onPress={() => props.onSelect(item, title)}
            key={item[id]}
            className={[
              "w-full cursor-pointer border-b border-gray-300 p-2",
              index === props.selectedIndex ? "bg-blue-200" : "bg-slate-100",
            ].join(" ")}
          >
            <View className="flex-row">
              {arr.map((partText: string, index: number) => {
                return (
                  <Text key={index}>
                    <Text className="font-open-sans text-base text-gray-700">
                      {partText}
                    </Text>
                    {index < arr.length - 1 && (
                      <Text className="font-open-sans text-base font-bold text-blue-600">
                        {props.typedText.toUpperCase()}
                      </Text>
                    )}
                  </Text>
                );
              })}
            </View>
          </Item>
        );
      })}
    </Panel>
  );
}

const Label = Text;
const Container = View;
const Panel = View;
const Item = Pressable;

import { useEffect, useRef, useState } from "react";
import { Platform, Text, TextInput, View } from "react-native";

type AutoCompletePropType = {
  data: { [key: string]: any }[];
  propToBind?: string;
  id?: number | string;
  label?: string;
  onChange?: (textValue: string) => void;
};

export default function AutoComplete(props: AutoCompletePropType) {
  const [text, setText] = useState("");
  const textRef = useRef<TextInput>(null);
  const [autoPanelVisible, setAutoPanelVisible] = useState(false);

  const handleOnChangeText = (e: string) => {
    //console.log(e:string);\
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

  return (
    <Container className="relative">
      <Label className="text-lg font-thin">{props.label}</Label>
      <View className="relative">
        <TextInput
          ref={textRef}
          value={text}
          className="absolute mb-1 mt-2 rounded border border-gray-300 p-3"
          onChangeText={handleOnChangeText}
        />
        <AutoBox
          data={props.data}
          propToBind={props.propToBind}
          id={props.id}
        />
      </View>
    </Container>
  );
}

function AutoBox(
  props: Pick<AutoCompletePropType, "data" | "id" | "propToBind">,
) {
  let title = props.propToBind || "name";
  let id = props.id || "id";
  return (
    <Panel className="absolute top-16 bg-slate-100">
      {props.data.map((item) => {
        return (
          <Item
            key={item[id]}
            className="w-full cursor-pointer border-b border-gray-300 p-2 hover:bg-slate-300"
          >
            <ItemText className="p-2 text-lg text-black">
              {item[title]}
            </ItemText>
          </Item>
        );
      })}
    </Panel>
  );
}

const Label = Text;
const Container = View;
const Panel = View;
const Item = View;
const ItemText = Text;

import RippleView from "./ripple-view";
import { Platform, PressableProps, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { memo } from "react";

type ButtonProps = {
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  iconLeft?: boolean;
} & PressableProps;

// supports both title and children
function Button(props: ButtonProps) {
  const { className, style, children, icon, iconLeft, ...restProps } = props;
  return (
    <RippleView
      className={[
        `my-6 flex-row items-center justify-center rounded-md border border-blue-500 bg-blue-500 p-3`,
        className,
      ].join("")}
      style={style}
      {...restProps}
    >
      {iconLeft && icon && (
        <Ionicons
          name={icon}
          size={20}
          color="white"
          style={{ marginRight: 4 }}
        />
      )}
      <Text
        className={`font-open-sans text-white ${""} ${Platform.OS === "web" ? "text-base" : "text-xl"}`}
        selectable={false}
      >
        {props.title}
      </Text>
      {icon && !iconLeft && (
        <Ionicons
          name={icon}
          size={20}
          color="white"
          style={{ marginLeft: 4 }}
        />
      )}

      {children}
    </RippleView>
  );
}

export default memo(Button);

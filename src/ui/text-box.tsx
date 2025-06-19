import { memo, useCallback, useState } from "react";
import {
  TextInput,
  View,
  Text,
  TextInputProps,
  Pressable,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { Keyframe } from "react-native-reanimated";

type TextBoxProps = TextInputProps & {
  errorMessage?: string;
  label?: string;
  password?: boolean;
  togglePassword?: () => void;
  ref?: React.Ref<TextInput>;
} & TextInputProps;
// This is a simple text box component that uses the TextInput component from react-native

const errorEntering = new Keyframe({
  0: {
    transform: [{ translateY: -10 }],
    opacity: 0,
  },
  100: {
    transform: [{ translateY: 0 }],
    opacity: 1,
  },
}).duration(300);

const errorExiting = new Keyframe({
  0: {
    transform: [{ translateY: 0 }],
    opacity: 1,
  },
  100: {
    transform: [{ translateY: -10 }],
    opacity: 0,
  },
}).duration(300);

function TextBox(props: TextBoxProps) {
  const { errorMessage, label, togglePassword, onFocus, onBlur, ...rest } =
    props;
  const [isFocused, setIsFocused] = useState(false);

  //const msg = useRef<string>("");

  //msg.current = props.errorMessage ? props.errorMessage : msg.current;

  const handlePasswordVisibility = useCallback(() => {
    if (togglePassword) {
      togglePassword();
    }
  }, [togglePassword]);

  const handleFocus = useCallback(
    (e: any) => {
      setIsFocused(true);
      if (onFocus) {
        onFocus(e);
      }
    },
    [onFocus],
  );
  const handleBlur = useCallback(
    (e: any) => {
      setIsFocused(false);
      if (onBlur) {
        onBlur(e);
      }
    },
    [onBlur],
  );

  return (
    <Container className="relative my-3">
      {props.label && (
        <Label
          className="font-open-sans text-base text-gray-600"
          testID="label"
        >
          {props.label}
        </Label>
      )}
      <TextBoxWrapper className="relative flex-row items-center">
        <TextInput
          className={`font-open-sans mb-1 mt-2 flex-1 rounded border border-solid p-3 text-slate-900 placeholder:text-gray-400 focus:outline-none dark:bg-slate-950 dark:text-gray-300 dark:placeholder:text-gray-400 ${""} ${props.editable === false ? "bg-slate-100 dark:bg-slate-800" : ""} ${Platform.OS === "web" ? "text-base" : "text-xl"} ${isFocused ? "border-blue-500 dark:outline-yellow-400" : "border-gray-300 dark:border-gray-700"} `}
          placeholder="Enter Mobile Number"
          testID="textBox"
          {...rest}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {props.password && (
          <EyeIconPressable
            testID="eyeIconPressable"
            onPress={handlePasswordVisibility}
            className="absolute right-5"
          >
            <EyeIcon
              testID="eyeIcon"
              accessibilityLabel={
                props.secureTextEntry ? "eye-off-outline" : "eye-outline"
              }
              name={props.secureTextEntry ? "eye-off-outline" : "eye-outline"}
              size={24}
              className="text-gray-500 dark:text-gray-400"
            />
          </EyeIconPressable>
        )}
      </TextBoxWrapper>

      {props.errorMessage && (
        <ErrorContainer
          className={[
            "relative flex-row items-center bg-blue-300",
            // props.errorMessage ? "opacity-100" : "opacity-0",
            // props.errorMessage ? "translate-y-0" : "-translate-y-2",
          ].join("")}
          entering={errorEntering}
          exiting={errorExiting}
        >
          <ErrorMessage
            testID="errorMessage"
            className={`font-open-sans absolute left-1 top-0 text-red-600 dark:text-red-400 ${""} ${
              Platform.OS === "web" ? "text-sm" : "text-base"
            }`}
          >
            {`⚠️ ${props.errorMessage}`}
          </ErrorMessage>
        </ErrorContainer>
      )}
    </Container>
  );
}

export default memo(TextBox);

const Container = View;
const Label = Text;
const ErrorMessage = Text;
const ErrorContainer = Animated.View;
const TextBoxWrapper = View;
const EyeIcon = Ionicons;
const EyeIconPressable = Pressable;

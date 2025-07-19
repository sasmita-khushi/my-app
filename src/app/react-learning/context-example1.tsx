import React, { createContext, useContext, useState } from "react";
import { View, Text, Switch, Button } from "react-native";

const ThemeContext = createContext("light");

export default function MyApp() {
  const [theme, setTheme] = useState("light");
  const isDark = theme === "dark";

  return (
    <ThemeContext value={theme}>
      <View
        className={`flex-1 justify-center p-6 ${isDark ? "bg-black" : "bg-white"}`}
      >
        <Form />
        <View>
          <Text
            className={`text-lg ${isDark ? "text-white" : "text-black-600"}`}
          >
            Use dark mode
          </Text>
          <Switch
            value={isDark}
            onValueChange={(value) => setTheme(value ? "dark" : "light")}
          />
        </View>
      </View>
    </ThemeContext>
  );
}

function Form() {
  return (
    <Panel title="Welcome">
      <ThemedButton title="Sign up" />
      <ThemedButton title="Log in" />
    </Panel>
  );
}

type PanelProps = {
  title: string;
  children: React.ReactNode;
};

function Panel({ title, children }: PanelProps) {
  const theme = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <View
      className={`mb-5 rounded-xl p-5 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
    >
      <Text
        className={`mb-4 text-2xl font-bold ${isDark ? "text-white" : "text-black"}`}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

type ThemedButtonProps = {
  title: string;
};

function ThemedButton({ title }: ThemedButtonProps) {
  const theme = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <View
      className={`my-2 overflow-hidden rounded ${isDark ? "bg-gray-600 text-white" : "bg-gray-300 text-black"}`}
    >
      <Button
        title={title}
        color={isDark ? "#fff" : "#000"}
        onPress={() => console.log(title)}
      />
    </View>
  );
}

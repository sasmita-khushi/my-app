import React, { createContext, useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Button as RNButton,
} from "react-native";

const ThemeContext = createContext<string>("light");
type CurrentUser = { name: string } | null;
type CurrentUserContextType = {
  currentUser: CurrentUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
};
const CurrentUserContext = createContext<CurrentUserContextType | undefined>(
  undefined,
);

export default function MyApp() {
  const [theme, setTheme] = useState("light");
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
  const isDark = theme === "dark";

  return (
    <ThemeContext.Provider value={theme}>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <View className="p-4">
          <WelcomePanel />
          <View className="mt-4 flex-row items-center">
            <Text className="mr-2">Use dark mode</Text>
            <Switch
              value={isDark}
              onValueChange={(value) => setTheme(value ? "dark" : "light")}
            />
          </View>
        </View>
      </CurrentUserContext.Provider>
    </ThemeContext.Provider>
  );
}

function WelcomePanel() {
  const currentUserContext = useContext(CurrentUserContext);
  if (!currentUserContext) {
    throw new Error(
      "WelcomePanel must be used within a CurrentUserContext.Provider",
    );
  }
  const { currentUser } = currentUserContext;

  return (
    <Panel title="Welcome">
      {currentUser !== null ? <Greeting /> : <LoginForm />}
    </Panel>
  );
}

function Greeting() {
  const currentUserContext = useContext(CurrentUserContext);
  if (!currentUserContext) {
    throw new Error(
      "Greeting must be used within a CurrentUserContext.Provider",
    );
  }
  const { currentUser } = currentUserContext;
  if (!currentUser) {
    return null;
  }
  return (
    <Text className="mt-2 text-lg">You logged in as {currentUser.name}.</Text>
  );
}

type PanelProps = {
  title: string;
  children: React.ReactNode;
};

function Panel({ title, children }: PanelProps) {
  const theme = useContext(ThemeContext);
  const bgColor = theme === "dark" ? "bg-gray-800" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-black";

  return (
    <View className={`${bgColor} rounded-lg p-4 shadow-md`}>
      <Text className={`mb-2 text-xl font-bold ${textColor}`}>{title}</Text>
      {children}
    </View>
  );
}

function LoginForm() {
  const currentUserContext = useContext(CurrentUserContext);
  if (!currentUserContext) {
    throw new Error(
      "LoginForm must be used within a CurrentUserContext.Provider",
    );
  }
  const { setCurrentUser } = currentUserContext;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const canLogin = firstName.trim() !== "" && lastName.trim() !== "";

  return (
    <View className="mt-2">
      <Text className="mb-1">First name:</Text>
      <TextInput
        className="mb-2 rounded border border-gray-400 p-2"
        value={firstName}
        onChangeText={setFirstName}
      />
      <Text className="mb-1">Last name:</Text>
      <TextInput
        className="mb-2 rounded border border-gray-400 p-2"
        value={lastName}
        onChangeText={setLastName}
      />
      <Button
        disabled={!canLogin}
        onClick={() => setCurrentUser({ name: `${firstName} ${lastName}` })}
      >
        Log in
      </Button>
      {!canLogin && (
        <Text className="mt-1 text-red-500">Fill in both fields.</Text>
      )}
    </View>
  );
}
type ButtonProps = {
  children: string;
  disabled?: boolean;
  onClick: () => void;
};

function Button({ children, disabled, onClick }: ButtonProps) {
  const theme = useContext(ThemeContext);

  return (
    <RNButton
      title={children}
      disabled={disabled}
      onPress={onClick}
      color={theme === "dark" ? "#1e3a8a" : "#3b82f6"}
    />
  );
}

import React, { createContext, useContext, useState } from "react";
import { View, Text, Pressable } from "react-native";

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

type CurrentUserContextType = {
  currentUser: { name: string } | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<{ name: string } | null>>;
};

export default function MyApp() {
  const [currentUser, setCurrentUser] =
    useState<CurrentUserContextType["currentUser"]>(null);

  return (
    <CurrentUserContext value={{ currentUser, setCurrentUser }}>
      <Form />
    </CurrentUserContext>
  );
}

function Form() {
  return (
    <Panel title="Welcome">
      <LoginButton />
    </Panel>
  );
}

function LoginButton() {
  const context = useContext(CurrentUserContext);

  if (!context) {
    return null;
  }

  const { currentUser, setCurrentUser } = context;

  if (currentUser !== null) {
    return (
      <Text className="mt-4 text-lg text-green-600">
        You logged in as {currentUser.name}.
      </Text>
    );
  }

  return (
    <Button onClick={() => setCurrentUser({ name: "Advika" })}>
      Log in as Advika
    </Button>
  );
}

type PanelProps = {
  title: string;
  children: React.ReactNode;
};

function Panel({ title, children }: PanelProps) {
  return (
    <View className="rounded-xl bg-white p-4 shadow-md">
      <Text className="mb-4 text-xl font-bold">{title}</Text>
      {children}
    </View>
  );
}

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

function Button({ children, onClick }: ButtonProps) {
  return (
    <Pressable className="rounded-full bg-blue-500 px-4 py-2" onPress={onClick}>
      <Text className="text-center text-base text-white">{children}</Text>
    </Pressable>
  );
}

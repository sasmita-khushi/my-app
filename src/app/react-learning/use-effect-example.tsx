import { useState, useEffect } from "react";
import { View, Text } from "react-native";

export default function WelcomeMessage() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("Welcome, Sasmita!");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="w-60 rounded-md border-purple-300 bg-sky-300 p-5 text-center text-lg font-semibold text-purple-800">
        {message}
      </Text>
    </View>
  );
}

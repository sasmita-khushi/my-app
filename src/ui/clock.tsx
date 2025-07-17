import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Button from "./button";

export default function Timer() {
  const [time, setTime] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: number | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(new Date().toLocaleTimeString());
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };
  return (
    <View>
      <Text className="ml-10" testID="timer-text">
        Time: {time}
      </Text>
      <View className="ml-10 flex flex-row space-x-4">
        <Button
          title="Start"
          onPress={handleStart}
          className="h-10 w-32"
          testID="start-button"
        />
        <Button
          title="Stop"
          onPress={handleStop}
          className="h-10 w-32"
          testID="stop-button"
        />
      </View>
    </View>
  );
}

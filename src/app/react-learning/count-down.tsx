import { useEffect, useState, useRef } from "react";
import { View, Text, Pressable } from "react-native";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export default function StopWatch() {
  const [number, setNumber] = useState(10);
  const [isRunning, setIsRunning] = useState(true);
  const timerRef = useRef<number | null>(null);
  const [initialTime] = useState(10);

  useEffect(() => {
    if (isRunning && number > 0) {
      timerRef.current = setInterval(() => {
        setNumber((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const handleRestart = () => {
    setNumber(initialTime);
    setIsRunning(true);
  };

  const handleStop = () => {
    setNumber(0);
    setIsRunning(false);
  };

  const handlePause = () => {
    setIsRunning(false);
  };
  const handleStart = () => {
    if (number === 0) {
      setNumber(initialTime); // reset to starting value
    }
    setIsRunning(true); // always start
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text
        className={`w-60 rounded-md border-purple-300 bg-green-300 p-5 text-center text-lg font-semibold ${number === 0 ? "text-red-500" : "text-purple-800"}`}
      >
        {number === 0 ? "⏰ Time's up!" : `Countdown: ${formatTime(number)}`}
      </Text>

      <View className="flex-row space-x-5">
        {!isRunning ? (
          <Pressable
            onPress={handleStart}
            className="mt-3 w-28 rounded bg-yellow-300 p-3"
          >
            <Text className="text-center text-black">
              {" "}
              {number === 0 ? "Start" : "▶️ Resume"}{" "}
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={handlePause}
            className="mt-3 w-28 rounded bg-pink-300 p-3"
          >
            <Text className="text-center text-black"> ⏸️ Pause </Text>
          </Pressable>
        )}
        {/* <PauseButton
          className="mt-3 w-28 rounded bg-pink-300 p-3"
          onPress={handlePause}
        >
          <Text className="text-center text-black">
            {isRunning ? " ⏸️ Pause" : " ▶️ Resume"}
          </Text>
        </PauseButton> */}

        <RestartButton
          className="mt-3 w-28 rounded bg-blue-400 p-3"
          onPress={handleRestart}
        >
          <Text className="text-center text-white">Restart 🔄</Text>
        </RestartButton>

        <StopButton
          className="mt-3 w-28 rounded bg-red-400 p-3"
          onPress={handleStop}
        >
          <Text className="text-center text-black">Stop ⛔</Text>
        </StopButton>
      </View>
    </View>
  );
}

const RestartButton = Pressable;
const PauseButton = Pressable;
const StopButton = Pressable;

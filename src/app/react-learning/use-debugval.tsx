import React from "react";
import { View, Text } from "react-native"; // or from 'react' if you're on web
import useOnlineStatus from "./debug";

export default function StatusIndicator() {
  const isOnline = useOnlineStatus();

  return (
    <View>
      <Text>Status: {isOnline ? "Online 🟢" : "Offline 🔴"}</Text>
    </View>
  );
}

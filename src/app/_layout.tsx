import "../../global.css";
import { HeaderBar, Sidebar } from "../ui/web";
import { View } from "react-native";
import { Slot } from "expo-router";
import { useState } from "react";

export default function Layout() {
  return (
    <View className="dark:bg-gray-90 flex-1 bg-white">
      <Slot />
    </View>
  );
}

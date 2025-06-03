import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
export type IconName = keyof typeof Ionicons.glyphMap;

export default function HomePage() {
  //   return (
  //     <View className="flex-1 justify-center items-center">
  //       <Text>Hello!</Text>
  //       <Link href="./tutorial/tap">Go to Tap PAge</Link>
  //     </View>
  //   );
  // }
  const [gretting, setGretting] = useState("");

  useEffect(() => {
    const updateGretting = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour <= 12) {
        setGretting("Good Morning");
      } else if (currentHour >= 12 && currentHour < 17) {
        setGretting("Good Afternoon");
      } else if (currentHour >= 17 && currentHour < 21) {
        setGretting("Good Evening");
      } else {
        setGretting("Good Night");
      }
    };
    updateGretting();
    const interval = setInterval(updateGretting, 60000);
    return () => clearInterval(interval);
  }, []);

  const onPress = () => {
    alert("hii");
  };
  return (
    <View>
      <View className="mt-16 flex-row bg-blue-400">
        <View className="w-6/12 justify-end bg-red-200">
          <Text style={styles.greeting}>{gretting}</Text>
        </View>
        <View className="w-6/12 flex-row items-center justify-end bg-yellow-300 p-3">
          <MenuIcon name="notifications-outline" size={26} onPress={onPress} />
          <MenuIcon name="timer-outline" size={26} className="ml-3" />
          <MenuIcon name="settings-outline" size={26} className="ml-3" />
        </View>
      </View>

      <Link href="./tutorial/circle">
        <Text>Go to hello page</Text>
      </Link>
      <Link href="./tutorial/rotate">
        <Text>Go to rotate page</Text>
      </Link>
      <Link href="./tutorial/my-text">
        <Text>Go to my-text page</Text>
      </Link>
      <Link href="./tutorial/shake">
        <Text>Go to shake page</Text>
      </Link>
      <Link href="./tutorial/tap">
        <Text>Go to tap page</Text>
      </Link>
      <Link href="./tutorial/my-anim">
        <Text>Go to My Animation pag</Text>e
      </Link>
      <Link href="./tutorial/pan-gesture">
        <Text>Go to Pan Gesture page</Text>
      </Link>
      <Link href="./tutorial/spatial">
        <Text>Go to spatial page</Text>
      </Link>
      <Link href="./tutorial/slide">
        <Text>Go to slide page</Text>
      </Link>
      <Link href="./tutorial/pop-circle">
        <Text>Go to Pop Circle Page</Text>
      </Link>
      <Link href="./tutorial/pop-circle-react">
        <Text>Go to Pop Circle React Page</Text>
      </Link>
      <Link href="./tutorial/pressable-circle">
        <Text>Go to Pressable Circle Page</Text>
      </Link>
      <Link href="./tutorial/flip-card">
        <Text>Go to Flip-Card Page</Text>
      </Link>
      <Link href="./tutorial/spiral">
        <Text>Go to Spiral Page</Text>
      </Link>
      <Link href="./tutorial/layout-anime">
        <Text>Go to Layout Animation Page</Text>
      </Link>
      <Link href="./check-box-page">
        <Text>Go to Check Box page</Text>
      </Link>
      <Link href="./auto-complete-page">
        <Text>Go to Auto Complete page</Text>
      </Link>
      <Link href="./toggle-btn-page">
        <Text>Go to Toggle Button page</Text>
      </Link>
      <Link href="./context-page">
        <Text>Go to Context page</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 8,
  },
});

export function MenuIcon(
  props: PressableProps & { name: IconName; color?: string; size?: number },
) {
  const { name, color, size, ...rest } = props;
  return (
    <Pressable {...rest}>
      <Ionicons name={name} size={size || 26} color={color} />
    </Pressable>
  );
}

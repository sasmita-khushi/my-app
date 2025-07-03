import { View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colorScheme } from "nativewind";
import { memo, useCallback, useEffect, useState } from "react";

type IconName = "sun" | "moon" | "system";

function HeaderBar() {
  const storedColorScheme = window.localStorage.getItem("colorScheme") as
    | "dark"
    | "light";

  const initialState =
    storedColorScheme === "dark"
      ? "moon"
      : storedColorScheme === "light"
        ? "sun"
        : "system";

  const [selectedIcon, setSelectedIcon] = useState<IconName>(initialState);
  // const [count, setCount] = useState(0);
  // hello

  if (storedColorScheme) {
    colorScheme.set(storedColorScheme);
  } else {
    colorScheme.set("system");
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(colorScheme.get()!);
  }

  useEffect(() => {
    if (!storedColorScheme) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = () => {
        document.documentElement.classList.remove("dark", "light");
        document.documentElement.classList.add(colorScheme.get()!);
        // console.log("mode changed", colorScheme.get());
      };

      mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, [storedColorScheme]);

  const handleSunClick = useCallback(() => {
    colorScheme.set("light");
    window.localStorage.setItem("colorScheme", "light");
    setSelectedIcon("sun");
    // selectedIconRef.current = "sun";
    //setCount(count + 1);
  }, []);

  const handleMoonClick = useCallback(() => {
    colorScheme.set("dark");
    window.localStorage.setItem("colorScheme", "dark");
    setSelectedIcon("moon");
    // selectedIconRef.current = "moon";
    //setCount(count + 1);
  }, []);

  const handleSystemClick = useCallback(() => {
    colorScheme.set("system");
    window.localStorage.removeItem("colorScheme");
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(colorScheme.get()!);
    setSelectedIcon("system");
    // selectedIconRef.current = "system";
    // setCount(count + 1);
  }, []);

  return (
    <Container className="fixed left-0 top-0 z-20 h-12 w-full flex-row border-b border-b-gray-300 bg-white py-8 dark:border-b-gray-700 dark:bg-gray-900">
      <LeftContainer className="h-full w-1/2"></LeftContainer>
      <RightContainer className="h-full w-1/2 items-end justify-center px-10">
        <ThemeHolder className="h-10 flex-row items-center rounded-2xl px-3">
          <SunIcon
            name="sunny-outline"
            size={26}
            className={[
              "mx-3 cursor-pointer",
              selectedIcon === "sun"
                ? "text-red-600 dark:text-green-400"
                : "text-gray-800 dark:text-white",
            ].join("")}
            onPress={handleSunClick}
          />
          <MoonIcon
            name="moon-outline"
            size={26}
            className={[
              "mx-3 cursor-pointer",
              selectedIcon === "moon"
                ? "text-red-600 dark:text-green-400"
                : "text-gray-800 dark:text-white",
            ].join("")}
            onPress={handleMoonClick}
          />
          <SystemIcon
            name="laptop-outline"
            size={26}
            className={[
              "mx-3 cursor-pointer",
              selectedIcon === "system"
                ? "text-red-600 dark:text-green-400"
                : "text-gray-800 dark:text-white",
            ].join("")}
            onPress={handleSystemClick}
          />
        </ThemeHolder>
      </RightContainer>
    </Container>
  );
}

export default memo(HeaderBar);
const Container = View;
const LeftContainer = View;
const RightContainer = View;
const ThemeHolder = View;
const SunIcon = Ionicons;
const MoonIcon = Ionicons;
const SystemIcon = Ionicons;

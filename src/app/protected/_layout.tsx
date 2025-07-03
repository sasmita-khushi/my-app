import { HeaderBar, Sidebar } from "../../ui/web";
import { View } from "react-native";
import { Slot } from "expo-router";
import { useCallback, useState } from "react";

export default function Layout() {
  const [showSidebar, setShowSidebar] = useState(false);
  const handleToggleSidebar = useCallback(() => {
    setShowSidebar((prev) => !prev);
  }, []);

  return (
    <View className="flex-1 flex-row bg-white dark:bg-black">
      <HeaderBar />
      <Sidebar
        handleToggleSidebar={handleToggleSidebar}
        className={`linear transition-transform duration-500 ${showSidebar ? "translate-x-0" : "-translate-x-44"}`}
      />
      <View
        className={`overflow-scrollp-5 mt-16 flex-1 p-12 transition-all duration-500 ${showSidebar ? "ml-60" : "ml-32"}`}
      >
        <Slot />
      </View>
    </View>
  );
}

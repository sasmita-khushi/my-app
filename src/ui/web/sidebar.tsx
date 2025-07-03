import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, Pressable } from "react-native";

type SideBarProps = {
  handleToggleSidebar: () => void;
  className?: string;
};

export default function Sidebar(props: SideBarProps) {
  const { handleToggleSidebar, className } = props;
  return (
    <Pressable
      className={`${className} fixed left-0 top-0 z-30 h-full w-64 bg-blue-400 dark:bg-yellow-500`}
      onPress={handleToggleSidebar}
    >
      <View>
        <MenuIcon title="Employee" icon="menu" />
        <MenuIcon title="Employee" icon="airplane" />
        <MenuIcon title="Employee" icon="albums" />
        <MenuIcon title="Employee" icon="archive" />
      </View>
    </Pressable>
  );
}

type menuIconProps = {
  title?: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
};

function MenuIcon(props: menuIconProps) {
  return (
    <View className="mb-10 w-full flex-row items-center justify-center bg-green-600 py-3 dark:bg-red-500">
      <Ionicons name={props.icon} size={32} color="black" />
      <Text className="text-lg font-bold text-white">{props.title}</Text>
    </View>
  );
}

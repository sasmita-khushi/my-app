import { View } from "react-native";
import LoginForm from "../ui/login-form";

export default function MyLoginPage() {
  return (
    <View className="flex-1 items-center justify-center">
      <LoginForm isLoggedIn={true} />
    </View>
  );
}

import { View, TextInput, Button } from "react-native";
import React, { useState } from "react";
export default function LoginForm(props: { isLoggedIn: boolean }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    props.isLoggedIn && (
      <View>
        <TextInput
          placeholder="Enter your username"
          accessibilityLabel="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Enter your password"
          secureTextEntry
          accessibilityLabel="Password"
          value={password}
          onChangeText={setPassword}
        />
        <Button
          title="Login"
          accessibilityLabel="Login Button"
          onPress={() => console.log("Logging in...")}
        />
      </View>
    )
  );
}

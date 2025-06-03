import { use, useEffect, useState } from "react";
import { Text, View } from "react-native";

const getData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello ! Khusi");
    }, 3000);
  });
};
const promiseData = getData();

export default function B() {
  console.log("B rendered");
  const message = use(promiseData);
  console.log("after use");
  return (
    <View>
      <Text>This is Component B</Text>
      <View>
        <Text className="text-white">This is B</Text>
        <Text className="">{message}</Text>
      </View>
    </View>
  );
}

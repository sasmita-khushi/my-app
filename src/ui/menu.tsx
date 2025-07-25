import { View, Text, TouchableWithoutFeedback } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useState } from "react";
export default function Menu() {
  const [pressOn, setPressOn] = useState(false);

  const handlePress = () => {
    setPressOn(!pressOn);
  };

  return (
    <View className="flex-1">
      <View className="h-16 w-full flex-row bg-blue-300">
        <View className="h-16 w-1/2"></View>
        <View className="h-16 w-1/2 items-end justify-center pr-4">
          <Ionicons
            name="person-outline"
            size={32}
            className="mr-10 flex cursor-pointer justify-end"
            onPress={handlePress}
          />
        </View>
      </View>
      {pressOn && (
        <TouchableWithoutFeedback onPress={handlePress}>
          <View className="absolute inset-0">
            <MenuList />
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

function MenuList() {
  return (
    <TouchableWithoutFeedback>
      <Animated.View
        className="absolute right-2 mt-12 h-[550px] w-[400px] rounded-xl"
        style={{ backgroundColor: "#323336" }}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <FirstBoxConatiner className="items-center">
          <FirstBox className="my-3 h-40 w-[380px] items-center rounded-xl bg-gray-600">
            <LoginCircle className="mt-6 h-16 w-16 rounded-full bg-blue-300"></LoginCircle>
            <Text className="text-white">Sasmita</Text>
            <Text className="text-white">sasmitadehury.khushboo@gmail.com</Text>
          </FirstBox>
        </FirstBoxConatiner>
        <SecondBox>
          <View className="ml-4 flex-row">
            <Ionicons name="key-outline" size={22} color="white" />
            <Text className="ml-3 mt-1 text-white"> Password and Autofill</Text>
          </View>
          <View className="ml-4 mt-3 flex-row">
            <Ionicons name="logo-google" size={22} color="white" />
            <Text className="ml-3 mt-1 text-white">
              Manage Your Google Account
            </Text>
          </View>
          <View className="ml-4 mt-3 flex-row">
            <Ionicons name="pencil-outline" size={22} color="white" />
            <Text className="ml-3 text-white"> Customize Profile</Text>
          </View>
          <View className="ml-4 mt-3 flex-row">
            <Ionicons name="sync-outline" size={22} color="white" />
            <Text className="ml-3 mt-1 text-white"> Sync Is On</Text>
          </View>
        </SecondBox>
        <LineBreak className="mt-5 h-[1px] w-[400px] bg-white" />
        <ThirdBox>
          <View className="ml-4 mt-3 flex-row">
            <Text className="text-md ml-3 mt-1 font-bold text-white">
              Other Chrome Profile
            </Text>
          </View>
          <View className="ml-4 mt-3 flex-row">
            <Ionicons name="person-circle-outline" size={22} color="white" />
            <Text className="ml-3 mt-1 text-white">khushi</Text>
          </View>
        </ThirdBox>
        <LineBreak className="mt-5 h-[1px] w-[400px] bg-white" />
        <FourthBox>
          <View className="ml-4 mt-3 flex-row">
            <Ionicons name="person-add-outline" size={22} color="white" />
            <Text className="ml-3 mt-1 text-white">Add Chrome Profile</Text>
          </View>
          <View className="ml-4 mt-3 flex-row">
            <Ionicons name="person-circle-outline" size={22} color="white" />
            <Text className="ml-3 mt-1 text-white">Open Guest Profile</Text>
          </View>
          <View className="ml-4 mt-3 flex-row">
            <Ionicons name="settings-outline" size={22} color="white" />
            <Text className="ml-3 mt-1 text-white">Manage Chrome Profile</Text>
          </View>
        </FourthBox>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const LoginCircle = View;
const FirstBoxConatiner = View;
const FirstBox = View;
const SecondBox = View;
const ThirdBox = View;
const FourthBox = View;
const LineBreak = View;

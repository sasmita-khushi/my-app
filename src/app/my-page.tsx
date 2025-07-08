import { View, Text, Image } from "react-native";

export default function myPage() {
  return (
    <MainContainer className="flex-1 flex-row">
      <LeftContainer className="h-full w-1/2 flex-1 bg-pink-200">
        <Text className="ml-28 mt-48 w-[700px] text-center text-2xl font-thin">
          Hey!! I am Sasmita Dehury.
          <br />
          <Text>
            I love to build web and mobile applications.
            <br />I am currently working at Khushi Digital. I am a
            <br />
            full stack developer.
          </Text>
          <br />I love to learn new technologies and frameworks.
          <br /> I am currently learning
          <br />
          React Native and Expo.
        </Text>
      </LeftContainer>
      <RightContainer className="h-full w-1/2 flex-1">
        <Box className="ml-20 mt-32 h-60 w-60 items-center justify-center overflow-hidden rounded-full bg-purple-500"></Box>
      </RightContainer>
    </MainContainer>
  );
}

const MainContainer = View;
const LeftContainer = View;
const RightContainer = View;
const Box = View;

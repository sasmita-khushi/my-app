import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function FlipCardPage() {
  const sv = useSharedValue(0);

  const animStyleFront = useAnimatedStyle(() => {
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${sv.value}deg` }],
    };
  });

  const animStyleBack = useAnimatedStyle(() => {
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${sv.value + 180}deg` }],
    };
  });
  const handlePress = () => {
    sv.value = withTiming(sv.value === 0 ? 180 : 0, { duration: 1000 }); // Toggle between 0 and 180 degrees
  };

  return (
    <MainContainer className="flex-1 items-center justify-center bg-white">
      <CardContainer style={styles.cardContainer} onPress={handlePress}>
        <CardFront style={[styles.card, styles.blueCard, animStyleFront]}>
          <Text className="text-3xl">Hello Khushi</Text>
        </CardFront>
        <CardBack style={[styles.card, styles.pinkCard, animStyleBack]}>
          <Text className="text-3xl">Hello World</Text>
        </CardBack>
      </CardContainer>
    </MainContainer>
  );
}

const MainContainer = View;
const CardContainer = Pressable;
const CardFront = Animated.View;
const CardBack = Animated.View;

const styles = StyleSheet.create({
  cardContainer: {
    width: 200,
    height: 300,
    borderRadius: 10,
    position: "relative",
  },
  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 1.95,
      height: 1.95,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.6,
    elevation: 3,
  },

  blueCard: {
    backgroundColor: "lightblue",
  },
  pinkCard: {
    backgroundColor: "pink",
  },
});

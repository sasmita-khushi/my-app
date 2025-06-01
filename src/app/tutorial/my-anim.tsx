import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import generateUniqueColor from "../../../utility/color-box"; // Adjust the import path as necessary

export default function Index() {
  return (
    <MainConTainer style={styles.mainContainer}>
      <SlidingWords
        words={[
          "LifeStyle",
          "Work",
          "everything",
          "Sasmita",
          "Manas",
          "pinky",
          "nancy",
          "Ivanka",
        ]}
      />
    </MainConTainer>
  );
}

function SlidingWords(props: { words: string[] }) {
  const SLIDE_POSITION = (props.words.length + props.words.length - 1) * -50; // Initial position for sliding panel
  const colors = generateUniqueColor(props.words.length);
  //console.log("colors", colors);
  const sv = useSharedValue(SLIDE_POSITION);
  //console.log("sv", sv.value);
  const animStyle = useAnimatedStyle(() => {
    return {
      top: sv.value,
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      runOnUI(() => {
        if (sv.value === 50) {
          sv.value = SLIDE_POSITION;
        }
        sv.value = withTiming(sv.value + 100, { duration: 300 });
      })();
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <TopBox style={styles.topTextBox}>
        <TextWrapper style={[styles.box, { backgroundColor: "white" }]}>
          <Text style={[styles.heading, styles.grayText]}>MAKE</Text>
        </TextWrapper>
        <BlankView style={[styles.box]}></BlankView>

        <SlidingPanel style={[styles.slidePanel, animStyle]}>
          {props.words.map((word, index) => {
            return (
              <View key={index}>
                <TextContainer
                  style={[styles.box, { backgroundColor: "white" }]}
                >
                  <TextWrapper
                    style={[
                      styles.textWrapper,
                      ,
                      {
                        backgroundColor: colors[index],
                      },
                    ]}
                  >
                    <Text style={[styles.heading, styles.whiteText, ,]}>
                      {word}
                    </Text>
                  </TextWrapper>
                </TextContainer>

                {props.words.length - 1 === index ? null : (
                  <WhiteBox style={[styles.box]}></WhiteBox>
                )}
              </View>
            );
          })}
        </SlidingPanel>
      </TopBox>

      <BottomBox style={styles.bottomTextBox}>
        <TextWrapper style={[styles.box]}>
          <Text style={[styles.heading, styles.grayText]}>AWESOME!!!</Text>
        </TextWrapper>
      </BottomBox>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 32,
    textAlign: "center",
    textTransform: "uppercase",
  },

  box: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  topTextBox: {
    width: "100%",
    position: "relative",
    overflow: "hidden",
    zIndex: 2,
  },
  bottomTextBox: {
    width: "100%",
    zIndex: 2,
  },
  grayText: {
    fontWeight: "bold",
    color: "gray",
  },
  whiteText: {
    color: "white",
    fontWeight: "bold",
  },
  textWrapper: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    zIndex: 1,
  },
  slidePanel: {
    position: "absolute",
    width: "100%",
    left: 0,
    zIndex: -1,
  },
});

const MainConTainer = View;
const TopBox = View;
const BottomBox = View;
const TextWrapper = View;
const BlankView = View;
const SlidingPanel = Animated.View;
const WhiteBox = View;
const TextContainer = View;

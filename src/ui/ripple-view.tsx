import React, { useState, useRef, useCallback, memo } from "react";
import {
  Pressable,
  LayoutChangeEvent,
  GestureResponderEvent,
} from "react-native";

import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// A unique ID for each ripple
function generateUniqueId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// Calculates the distance to the furthest corner, which is the required radius
function calculateRadius(
  width: number,
  height: number,
  pressX: number,
  pressY: number,
) {
  const R = Math.max(
    Math.hypot(pressX, pressY),
    Math.hypot(width - pressX, pressY),
    Math.hypot(pressX, height - pressY),
    Math.hypot(width - pressX, height - pressY),
  );
  return R;
}

// The main reusable container
function RippleView(props: any) {
  const { children, style, ...restProps } = props;
  const parentDimensionRef = useRef({ width: 0, height: 0 });
  const [ripples, setRipples] = useState<
    { id: string; pressX: number; pressY: number; radius: number }[]
  >([]);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    parentDimensionRef.current = { width, height };
  }, []);

  const onPressIn = useCallback((e: GestureResponderEvent) => {
    const { locationX, locationY } = e.nativeEvent;
    // const { width, height } = parentDimensionRef.current;
    // console.log(width, height);
    if (
      parentDimensionRef.current.width === 0 ||
      parentDimensionRef.current.height === 0
    )
      return; // if parent doesn't have dimension

    const newRipple = {
      id: generateUniqueId(),
      pressX: locationX,
      pressY: locationY,
      radius: calculateRadius(
        parentDimensionRef.current.width,
        parentDimensionRef.current.height,
        locationX,
        locationY,
      ),
    };

    setRipples((prev) => [...prev, newRipple]);
  }, []);

  const onRemoveRipple = useCallback((id: string) => {
    setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
  }, []);

  return (
    <Pressable
      onPressIn={onPressIn}
      onLayout={onLayout}
      {...restProps}
      style={[{ position: "relative", overflow: "hidden" }, style as any]}
    >
      {children as any}
      {ripples.map((ripple) => (
        <Circle
          key={ripple.id}
          id={ripple.id}
          pressX={ripple.pressX}
          pressY={ripple.pressY}
          radius={ripple.radius}
          onRemove={onRemoveRipple}
        />
      ))}
    </Pressable>
  );
}

// The individual ripple circle component
function Circle(props: {
  id: string;
  pressX: number;
  pressY: number;
  radius: number;
  onRemove: (id: string) => void;
}) {
  const scale = useSharedValue(0);

  // Animate scale from 0 to 1 and fade out
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      // Start semi-transparent, then fade out completely
      opacity: interpolate(scale.value, [0, 0.7, 1], [0.5, 0.3, 0]),
    };
  });

  // Start the animation as soon as the component is created
  useState(() => {
    scale.value = withTiming(1, { duration: 700 }, (finished) => {
      if (finished) {
        runOnJS(props.onRemove)(props.id);
      }
    });
  });

  const diameter = props.radius * 2;

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: "absolute",
          // Position the circle's center at the press point
          left: props.pressX - props.radius,
          top: props.pressY - props.radius,
          width: diameter,
          height: diameter,
          borderRadius: props.radius,
          backgroundColor: "rgba(255, 255, 255, 0.8)", // A typical white ripple
        },
        animatedStyle,
      ]}
    />
  );
}

export default memo(RippleView);

import { View, StyleSheet, FlatList, useWindowDimensions } from "react-native";

import { IfNotWeb, IfWeb } from "./utils";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import { clamp } from "@/app/utils";
import { IMAGE_ZOOM_MAX, IMAGE_ZOOM_MIN } from "@/app/constants";
import { useState } from "react";

const DATA = [
  { id: 1, image: require("../../../assets/images/test/1.png") },
  { id: 2, image: require("../../../assets/images/test/2.png") },
  { id: 3, image: require("../../../assets/images/test/3.png") },
  { id: 4, image: require("../../../assets/images/test/4.png") },
  { id: 5, image: require("../../../assets/images/test/5.png") },
];

const DIR: Record<any, number> = {
  [Directions.LEFT]: 1,
  [Directions.RIGHT]: -1,
};

export function Viewer() {
  const scale = useSharedValue(IMAGE_ZOOM_MIN);
  const savedScale = useSharedValue(IMAGE_ZOOM_MIN);
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = clamp(
        savedScale.value * e.scale,
        IMAGE_ZOOM_MIN,
        IMAGE_ZOOM_MAX
      );
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      if (savedScale.value <= IMAGE_ZOOM_MIN) {
        offset.value = { x: 0, y: 0 };
        start.value = { x: 0, y: 0 };
      }
    });

  const panGesture = Gesture.Pan()
    .averageTouches(true)
    .minPointers(2)
    .simultaneousWithExternalGesture(pinchGesture)
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const [idx, setIdx] = useState(0);

  const item = DATA[idx];

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: scale.value },
      ],
    };
  });

  function onSwipe(direction: number) {
    const i = (idx + DIR[direction]) % DATA.length;
    savedScale.value = IMAGE_ZOOM_MIN;
    scale.value = IMAGE_ZOOM_MIN;
    offset.value = { x: 0, y: 0 };
    start.value = { x: 0, y: 0 };
    setIdx(i < 0 ? DATA.length - 1 : i);
  }

  const flingGestureR = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      runOnJS(onSwipe)(Directions.LEFT);
    });
  const flingGestureL = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      runOnJS(onSwipe)(Directions.RIGHT);
    });

  const composed = Gesture.Exclusive(
    Gesture.Race(pinchGesture, panGesture),
    Gesture.Race(flingGestureR, flingGestureL)
  );

  return (
    <View style={[styles.container, styles.carousel]}>
      <GestureDetector gesture={composed}>
        <Slide {...item} animatedStyles={animatedStyles} />
      </GestureDetector>
    </View>
  );
}

export function XViewer() {
  const scale = useSharedValue(IMAGE_ZOOM_MIN);
  const savedScale = useSharedValue(IMAGE_ZOOM_MIN);
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });

  const [isScrollEnabled, setScroll] = useState(true);
  const [idx, setIdx] = useState(0);
  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = clamp(
        savedScale.value * e.scale,
        IMAGE_ZOOM_MIN,
        IMAGE_ZOOM_MAX
      );
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      runOnJS(setScroll)(savedScale.value <= IMAGE_ZOOM_MIN);
      if (savedScale.value <= IMAGE_ZOOM_MIN) {
        offset.value = { x: 0, y: 0 };
        start.value = { x: 0, y: 0 };
      }
    });

  const panGesture = Gesture.Pan()
    .averageTouches(true)
    .minPointers(2)
    .simultaneousWithExternalGesture(pinchGesture)
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: scale.value },
      ],
    };
  });

  const composed = Gesture.Simultaneous(pinchGesture, panGesture);

  function onViewableItemsChanged({ viewableItems }: any) {
    if (!viewableItems.length) return;
    setIdx(viewableItems[0].index);
  }

  return (
    <View style={styles.container}>
      <IfNotWeb>
        <GestureDetector gesture={composed}>
          <Animated.FlatList
            data={DATA}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item, index }) => (
              <Slide
                {...item}
                animatedStyles={idx === index ? animatedStyles : {}}
              />
            )}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
            horizontal
            pagingEnabled
            bounces={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carousel}
            initialNumToRender={1}
            windowSize={2}
            maxToRenderPerBatch={1}
            scrollEnabled={isScrollEnabled}
          />
        </GestureDetector>
      </IfNotWeb>
      <IfWeb>
        <FlatList
          data={DATA}
          keyExtractor={({ id }) => id.toString()}
          horizontal
          pagingEnabled
          bounces={false}
          renderItem={({ item }) => <Slide {...item} />}
          contentContainerStyle={styles.carousel}
          showsHorizontalScrollIndicator={false}
        />
      </IfWeb>
    </View>
  );
}

function Slide({ image, animatedStyles }: any) {
  const { width } = useWindowDimensions();

  return (
    <Animated.View style={[{ width }]}>
      <Animated.Image
        source={image}
        style={[{ width }, animatedStyles]}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carousel: {
    justifyContent: "center",
    alignItems: "center",
  },
});

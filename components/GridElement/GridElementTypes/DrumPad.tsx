import { BodyText } from "../../Typography";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { createMidiNote } from "../../../constants/MIDI_Notes";
import { theme } from "../../../constants/theme";
import { useGridElementAtIndex } from "../../../hooks/useCurrentGridPreset";
import { useDesktopCommunication } from "../../../hooks/useDesktopCommunication";
import { useElementSize } from "../../../hooks/useElementSize";
import { TouchPoint } from "../../../types";

const NOTE_ON = true;
const NOTE_OFF = false;
const minOpacity = 0.25;

interface DrumPadProps {
  index: number;
}

const useDrumPadLevelOpacity = (props: {
  isActive: boolean;
  opacityPercent: number;
}) => {
  const { isActive, opacityPercent } = props;

  const opacity = useSharedValue(1);
  useEffect(() => {
    opacity.value = withTiming(
      isActive ? Math.max(1 - opacityPercent, minOpacity) : 1,
      {
        duration: isActive ? 0 : 100,
      }
    );
  }, [isActive, opacity, opacityPercent]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  return { animatedStyle };
};

export default function DrumPad({ index }: DrumPadProps) {
  const {
    name,
    midiNoteState: { noteNumber, velocity },
    colorState,
  } = useGridElementAtIndex(index);
  const { elementWidth, elementHeight, onLayout } = useElementSize({ index });
  const [touch, setTouch] = useState<TouchPoint | null>(null);

  const { sendMidiNote } = useDesktopCommunication();

  const getTouchPercent = useCallback(
    (touch: TouchPoint) => {
      const touchPosition = velocity.isVertical ? touch.y : touch.x;
      const dimension = velocity.isVertical ? elementHeight : elementWidth;
      return velocity.isVertical
        ? 1 - getPositionalPercent(touchPosition, dimension)
        : getPositionalPercent(touchPosition, dimension);
    },
    [elementHeight, elementWidth, velocity.isVertical]
  );

  const startTouch = useCallback(
    (touch: TouchPoint) => {
      const percent = getTouchPercent(touch);
      const velocityValue = Math.floor(127 * percent);
      sendMidiNote(createMidiNote(noteNumber, velocityValue, NOTE_ON));
    },
    [getTouchPercent, noteNumber, sendMidiNote]
  );

  const endTouch = useCallback(
    () => sendMidiNote(createMidiNote(noteNumber, 0, NOTE_OFF)),
    [noteNumber, sendMidiNote]
  );

  const gesture = Gesture.Tap()
    .maxDuration(Infinity)
    .shouldCancelWhenOutside(false)
    .onTouchesDown((event) => {
      const { allTouches: touches } = event;
      if (touches.length === 0) {
        return;
      }
      const mostRecentTouch = touches[touches.length - 1];
      runOnJS(setTouch)(mostRecentTouch);
      runOnJS(startTouch)(mostRecentTouch);
    })
    .onTouchesUp((event) => {
      if (event.numberOfTouches > 0) {
        return; // Do not end signal if there are still active touches
      }
      runOnJS(setTouch)(null);
      runOnJS(endTouch)();
    })
    .onTouchesCancelled(() => {
      runOnJS(setTouch)(null);
      runOnJS(endTouch)();
    });

  const { animatedStyle } = useDrumPadLevelOpacity({
    isActive: !!touch,
    opacityPercent: touch ? getTouchPercent(touch) : 0,
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayout}>
      <GestureDetector gesture={gesture}>
        <View
          style={[
            styles.gridElementBasePressedView,
            { backgroundColor: colorState.highlightColor },
          ]}
        >
          <Animated.View
            style={[
              styles.gridElementUnpressedView,
              { backgroundColor: colorState.primaryColor },
              animatedStyle,
            ]}
          >
            <BodyText style={{ color: colorState.highlightColor }}>
              {name}
            </BodyText>
          </Animated.View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const getPositionalPercent = (
  touchPosition: number,
  elementDimensionMax: number
) => {
  return touchPosition / elementDimensionMax;
};

const styles = StyleSheet.create({
  gridElementBasePressedView: {
    flex: 1,
  },
  gridElementUnpressedView: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  gridElementEditView: {
    flexDirection: "row",
    borderColor: theme.color.white,
  },
});

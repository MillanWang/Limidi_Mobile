import { Text } from "@rneui/themed";
import React, { useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { createMidiNote } from "../../../constants/MIDI_Notes";
import { theme } from "../../../constants/theme";
import { useGridElementAtIndex } from "../../../hooks/useCurrentGridPreset";
import { useDesktopCommunication } from "../../../hooks/useDesktopCommunication";

const NOTE_ON = true;
const NOTE_OFF = false;

interface DrumPadProps {
  index: number;
}

export default function DrumPad({ index }: DrumPadProps) {
  // Redux states
  const currentGridElementState = useGridElementAtIndex(index);
  const nameState = currentGridElementState.name;
  const noteNumberState = currentGridElementState.midiNoteState.noteNumber;
  const velocityState = currentGridElementState.midiNoteState.velocity;
  const colorState = currentGridElementState.colorState;

  const { sendMidiNote } = useDesktopCommunication();
  const [elementHeight, setElementHeight] = useState(1);
  const [elementWidth, setElementWidth] = useState(1);

  function playModeTouchStartHandler(event: any) {
    const velocity = getVelocityValue(event);
    fadeOut(Math.max(velocity / 127, 0.25)); // 25% as minimum opacity drop for really low velocities
    sendMidiNote(createMidiNote(noteNumberState, velocity, NOTE_ON));
  }

  function playModeTouchEndHandler() {
    fadeIn();
    /* No velocity on note off*/
    sendMidiNote(createMidiNote(noteNumberState, 0, NOTE_OFF));
  }

  function getVelocityValue(event: any): number {
    if (velocityState.isVertical) {
      return Math.floor(
        velocityState.floor +
          (velocityState.ceiling - velocityState.floor) *
            (1 - event.nativeEvent.locationY / elementHeight)
      );
    } else {
      return Math.floor(
        velocityState.floor +
          (velocityState.ceiling - velocityState.floor) *
            (event.nativeEvent.locationX / elementWidth)
      );
    }
  }

  function onLayout(event: any) {
    setElementHeight(event.nativeEvent.layout.height);
    setElementWidth(event.nativeEvent.layout.width);
  }

  const fadeAnim = useRef(new Animated.Value(1)).current;
  function fadeIn() {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }
  function fadeOut(velocityPercent: number) {
    Animated.timing(fadeAnim, {
      toValue: 1 - velocityPercent,
      duration: 5,
      useNativeDriver: true,
    }).start();
  }

  return (
    <>
      <View
        style={{
          ...styles.gridElementBasePressedView,
          backgroundColor: colorState.pressedColor,
        }}
        onLayout={onLayout}
      >
        <Animated.View
          style={{
            ...styles.gridElementBasePressedView,
            opacity: fadeAnim,
            backgroundColor: colorState.unpressedColor,
          }}
          onTouchStart={playModeTouchStartHandler}
          onTouchEnd={playModeTouchEndHandler}
          onTouchCancel={playModeTouchEndHandler}
          onTouchMove={() => {
            // TODO - Need to check If we are still in the element. If not, then we must run the touch and handler
          }}
        >
          <View style={styles.gridElementUnpressedView}>
            <Text style={{ color: colorState.pressedColor }}>{nameState}</Text>
          </View>
        </Animated.View>
      </View>
    </>
  );
} // end of GridElement

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

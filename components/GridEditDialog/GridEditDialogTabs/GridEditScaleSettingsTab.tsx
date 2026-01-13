import { Button, Icon } from "@rneui/themed";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { getNoteKeyFromNoteNumber } from "../../../constants/MIDI_Notes";
import { Scale } from "../../../constants/Scales";
import { useCurrentGridPreset } from "../../../hooks/useCurrentGridPreset";
import { usePresetDefault } from "../../../hooks/usePresetDefault";
import { useScrollToSelected } from "../../../hooks/useScrollToSelected";
import { useAppDispatch } from "../../../redux/hooks";
import {
  setScale,
  setStartingNote,
  setStartingOctave,
} from "../../../redux/slices/GridPresetsSlice";
import { GridThemedButton } from "../../GridThemedComponents/GridThemedButton";
import { BodyText, Label } from "../../Typography";
import { FullGridOperationButtons } from "./FullGridOperationButtons";
import { NoteSelector } from "./NoteSelector";

export function GridEditScaleSettings() {
  return (
    <View style={styles.container}>
      <ScaleRootNoteSelector />
      <ScaleSelector />
    </View>
  );
}

export function ScaleRootNoteSelector() {
  const dispatch = useAppDispatch();
  const { startingNoteNumber, scale } = useCurrentGridPreset();

  const rootNote = `Root Note: ${getNoteKeyFromNoteNumber(startingNoteNumber)}`;
  const currentOctave = Math.floor(startingNoteNumber / 12);

  const updateOctave = (isIncreasing: boolean) => () => {
    const desiredOctave = currentOctave + (isIncreasing ? 1 : -1);
    if (desiredOctave < 0 || desiredOctave > 10) return;
    dispatch(setStartingOctave(desiredOctave));
  };

  const noteSelectorHeader = (
    <View style={{}}>
      <Label>Active scale: {scale}</Label>
      <Label>{rootNote}</Label>
    </View>
  );

  return (
    <NoteSelector
      noteNumber={startingNoteNumber}
      setNoteNumber={(value) => dispatch(setStartingNote(value))}
      increaseOctave={updateOctave(true)}
      decreaseOctave={updateOctave(false)}
      header={noteSelectorHeader}
    />
  );
}

const scalesArray = Object.values(Scale);

export function ScaleSelector() {
  const dispatch = useAppDispatch();
  const { scale, gridTheme } = useCurrentGridPreset();
  const { scale: defaultScale } = usePresetDefault();
  // To choose a scale before applying it
  const [currentScale, setCurrentScale] = useState(scale);

  // Scroll to the currently selected scale on initial load
  const scrollViewRef = useScrollToSelected({
    items: scalesArray,
    selectedItem: scale,
  });

  return (
    <View style={styles.scaleManagementView}>
      <View style={styles.scaleSelector}>
        <ScrollView ref={scrollViewRef} style={styles.scaleSelectorScrollView}>
          {scalesArray.map((scalePreset, i) => (
            <Button
              buttonStyle={{
                height: 40,
                borderColor:
                  currentScale === scalePreset
                    ? gridTheme.highlightColor
                    : gridTheme.primaryColor,
                borderWidth: 2,
                backgroundColor: gridTheme.primaryColor,
              }}
              key={`ScalePreset_${scalePreset}_${i}`}
              onPress={() => setCurrentScale(scalePreset)}
            >
              <BodyText
                style={{ marginRight: "auto", color: gridTheme.highlightColor }}
              >
                {scalePreset}
              </BodyText>
              {scalePreset === scale && (
                <View style={{ marginLeft: "auto" }}>
                  <Icon name="done" color={gridTheme.highlightColor} />
                </View>
              )}
            </Button>
          ))}
          <View style={{ height: 32 }} />
        </ScrollView>
      </View>
      <View style={styles.applyScaleView}>
        <Label>Selected: {formatScaleName(currentScale)}</Label>
        <GridThemedButton
          onPress={() => dispatch(setScale(currentScale))}
          buttonStyle={{ flexWrap: "wrap" }}
        >
          Apply scale{currentScale !== scale ? "*" : ""}
        </GridThemedButton>

        <FullGridOperationButtons
          resetCallback={() => setCurrentScale(defaultScale)}
        />
      </View>
    </View>
  );
}

const formatScaleName = (name: string) => {
  const index = name.indexOf("(");
  if (index !== -1) {
    return name.substring(0, index);
  }
  return name;
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    height: "100%",
  },
  scaleManagementView: {
    flex: 1,
    height: "100%",
    flexDirection: "row",
    paddingTop: 20,
  },
  scaleSelector: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    width: "60%",
  },
  scaleSelectorScrollView: {
    width: "100%",
    flex: 1,
  },
  scaleItemText: {
    alignSelf: "center",
  },
  applyScaleView: {
    width: "40%",
    paddingLeft: 8,
    gap: 4,
  },
});

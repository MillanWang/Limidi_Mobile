import { Button, Icon, Slider } from "@rneui/themed";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { NOTE } from "../../../constants/MIDI_Notes";
import { Scale } from "../../../constants/Scales";
import { Piano } from "../../Piano";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import {
  setStartingNote,
  setScale,
  setStartingOctave,
} from "../../../redux/slices/GridPresetsSlice";
import { FullGridOperationButtons } from "./FullGridOperationButtons";
import { theme } from "../../../constants/theme";
import { IncrementorButton } from "../../IncrementorButton";

export function GridEditScaleSettings() {
  return (
    <View style={styles.container}>
      <RootNoteSelector />
      <ScaleSelector />
    </View>
  );
}

export function RootNoteSelector() {
  const dispatch = useAppDispatch();
  const gridState = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset
  );
  const startingNoteNumberState = gridState.startingNoteNumber;
  const scaleState = gridState.scale;
  const rootNote = `Root Note: ${
    Object.values(NOTE)[startingNoteNumberState % 12]
  }${Math.floor(startingNoteNumberState / 12)}`;

  const currentOctave = Math.floor(startingNoteNumberState / 12);

  const updateOctave = (isIncreasing: boolean) => () => {
    const desiredOctave = currentOctave + (isIncreasing ? 1 : -1);
    if (desiredOctave < 0 || desiredOctave > 10) return;
    dispatch(setStartingOctave(desiredOctave));
  };

  return (
    <View style={{}}>
      <View style={{ flexDirection: "row" }}>
        <View style={{}}>
          <Text style={{ color: theme.color.white }}>Scale : {scaleState}</Text>
          <Text style={{ color: theme.color.white }}>{rootNote}</Text>
        </View>

        <View
          style={{
            marginLeft: "auto",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IncrementorButton
            onPress={updateOctave(false)}
            disabled={currentOctave === 0}
          />
          <Text style={{ color: theme.color.white, width: 64, marginLeft: 8 }}>
            Octave: {currentOctave}
          </Text>
          <IncrementorButton
            onPress={updateOctave(true)}
            isPlus
            disabled={currentOctave === 10}
          />
        </View>
      </View>

      <Piano
        noteNumber={startingNoteNumberState % 12}
        setNoteNumber={(value) => dispatch(setStartingNote(value))}
      />
    </View>
  );
}
export function ScaleSelector() {
  const dispatch = useAppDispatch();
  const gridState = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset
  );

  const scaleState = gridState.scale;

  // To choose a scale before applying it
  const [currentScale, setCurrentScale] = useState(scaleState);

  return (
    <View style={styles.scaleManagementView}>
      <View style={styles.scaleSelector}>
        <ScrollView style={styles.scaleSelectorScrollView}>
          {Object.values(Scale).map((scale) => (
            <Button
              buttonStyle={{
                height: 40,
                borderColor: currentScale === scale ? "red" : undefined,
                borderWidth: 2,
              }}
              key={`ScalePreset_${scale}`}
              onPress={() => setCurrentScale(scale)}
            >
              <Text style={{ marginRight: "auto" }}>{scale}</Text>
              {scaleState === scale && (
                <View style={{ marginLeft: "auto" }}>
                  <Icon name="done" />
                </View>
              )}
            </Button>
          ))}
        </ScrollView>
      </View>
      <View style={styles.applyScaleView}>
        <Button
          onPress={() => dispatch(setScale(currentScale))}
          buttonStyle={{ flexWrap: "wrap" }}
        >
          Apply {formatScaleName(currentScale)} Scale
        </Button>

        <View style={{ marginTop: 32 }}>
          <FullGridOperationButtons />
        </View>
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
  },
  scaleManagementView: {
    flexDirection: "row",
    paddingTop: 20,
  },
  scaleSelector: {
    flexDirection: "column",
    width: "60%",
  },
  scaleSelectorScrollView: {
    width: "100 %",
  },
  scaleItem: {
    borderWidth: 1,
    height: 30,
    flexDirection: "row",
    backgroundColor: "#bbbbbb",
  },
  scaleItemText: {
    alignSelf: "center",
  },
  applyScaleView: {
    width: "40 %",
  },
});

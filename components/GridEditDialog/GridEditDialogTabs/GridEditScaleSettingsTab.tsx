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

export function GridEditScaleSettings(): JSX.Element {
  const dispatch = useAppDispatch();
  const gridState = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset
  );
  const startingNoteNumberState = gridState.startingNoteNumber;
  const scaleState = gridState.scale;

  // This useState is needed to choose a scale before applying it
  const [currentScale, setCurrentScale] = useState(scaleState);

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ color: theme.color.white }}>
          Starting Note: {Object.values(NOTE)[startingNoteNumberState % 12]}
        </Text>
        <Piano
          noteNumber={startingNoteNumberState % 12}
          setNoteNumber={(value) => {
            dispatch(setStartingNote(value));
          }}
        />
      </View>
      <View>
        <Text style={{ color: theme.color.white }}>
          Octave: {Math.floor(startingNoteNumberState / 12)}
        </Text>
        <Slider
          maximumValue={10}
          minimumValue={0}
          step={1}
          value={Math.floor(startingNoteNumberState / 12)}
          onValueChange={(value) => {
            dispatch(setStartingOctave(value));
          }}
        />
      </View>
      <View style={styles.scaleManagementView}>
        {/* Scale selector */}
        <View style={styles.scaleSelector}>
          <ScrollView style={styles.scaleSelectorScrollView}>
            {Object.values(Scale).map((scale) => (
              <Button
                buttonStyle={{
                  height: 40,
                }}
                key={`ScalePreset_${scale}`}
                onPress={() => setCurrentScale(scale)}
              >
                <Text style={{ marginRight: "auto" }}>{scale}</Text>
                {currentScale === scale && (
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
          <Text style={{ color: theme.color.white }}>
            Current Scale : {scaleState}
          </Text>
          <View style={{ marginTop: "auto" }}>
            <FullGridOperationButtons />
          </View>
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

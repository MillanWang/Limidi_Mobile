import { Button, Slider } from "@rneui/themed";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  restoreCurrentPresetToDefault,
  setColumnCount,
  setRowCount,
  setScale,
  setStartingNote,
  setStartingOctave,
  unlockAllGridElements,
} from "../../../redux/slices/GridPresetsSlice";
import { GridPreview } from "../../GridPreview";
import { Piano } from "../../Piano";
import { Scale } from "../../../constants/Scales";
import { Icon } from "@rneui/base";
import { NOTE } from "../../../constants/MIDI_Notes";
import { GridEditScaleSettings } from "./GridEditScaleSettingsTab";

export function GridEditGridSettingsTab() {
  const dispatch = useAppDispatch();
  const { columnCount, rowCount } = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset
  );

  const gridState = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset
  );
  const startingNoteNumberState = gridState.startingNoteNumber;
  const scaleState = gridState.scale;
  const [currentScale, setCurrentScale] = useState(scaleState);
  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: "row" }}>
          <GridPreview />
          <View>
            <Button
              onPress={() => dispatch(setRowCount(rowCount + 1))}
              buttonStyle={styles.gridSizeEditButtonStyle}
            >
              +
            </Button>
            <Text>Rows: {rowCount}</Text>
            <Button
              onPress={() => dispatch(setRowCount(rowCount - 1))}
              buttonStyle={styles.gridSizeEditButtonStyle}
            >
              -
            </Button>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Button
            onPress={() => dispatch(setColumnCount(columnCount - 1))}
            buttonStyle={styles.gridSizeEditButtonStyle}
          >
            -
          </Button>
          <Text>Columns: {columnCount}</Text>
          <Button
            onPress={() => dispatch(setColumnCount(columnCount + 1))}
            buttonStyle={styles.gridSizeEditButtonStyle}
          >
            +
          </Button>
        </View>
      </View>
      <GridEditScaleSettings />

      <Button
        title="Unlock All Grid Elements"
        onPress={() => dispatch(unlockAllGridElements(null))}
      />
      <Button
        title="Reset All Grid Elements"
        onPress={() => dispatch(restoreCurrentPresetToDefault(null))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  gridSizeEditButtonStyle: {
    borderRadius: 1000,
  },

  scaleManagementView: {
    flexDirection: "row",
    paddingTop: 20,
  },
  scaleSelector: {
    height: 180,
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

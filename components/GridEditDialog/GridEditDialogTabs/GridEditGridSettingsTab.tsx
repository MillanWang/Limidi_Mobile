import { Button, Slider } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  restoreCurrentPresetToDefault,
  setColumnCount,
  setRowCount,
  unlockAllGridElements,
} from "../../../redux/slices/GridPresetsSlice";
import { GridPreview } from "../../GridPreview";

export function GridEditGridSettingsTab() {
  const dispatch = useAppDispatch();
  const { columnCount, rowCount } = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset
  );

  return (
    <View style={styles.container}>
      <GridPreview />
      <Text>Number of Columns: {columnCount}</Text>
      <Slider
        maximumValue={10}
        minimumValue={1}
        step={1}
        value={columnCount}
        onValueChange={(value) => dispatch(setColumnCount(value))}
      />
      <Text>Number of Rows: {rowCount}</Text>
      <Slider
        maximumValue={10}
        minimumValue={1}
        step={1}
        value={rowCount}
        onValueChange={(value) => dispatch(setRowCount(value))}
      />

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
});

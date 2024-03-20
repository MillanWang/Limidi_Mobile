import { Button } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch } from "../../../redux/hooks";
import {
  restoreCurrentPresetToDefault,
  unlockAllGridElements,
} from "../../../redux/slices/GridPresetsSlice";
import { GridPreviewSizeSelector } from "../../GridPreview";
import { GridEditScaleSettings } from "./GridEditScaleSettingsTab";

export function GridEditGridSettingsTab() {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <GridPreviewSizeSelector />
      <GridEditScaleSettings />

      <Button
        title="Unlock All Grid Elements"
        onPress={() => dispatch(unlockAllGridElements(null))}
      />

      <Button
        title="Reset All Grid Elements"
        // TODO - This needs a confirmation modal
        onPress={() => dispatch(restoreCurrentPresetToDefault(null))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
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

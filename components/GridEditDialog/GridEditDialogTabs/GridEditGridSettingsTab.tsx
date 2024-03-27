import React from "react";
import { View } from "react-native";
import { GridPreviewSizeSelector } from "../../GridPreview";
import { GridEditScaleSettings } from "./GridEditScaleSettingsTab";

export function GridEditGridSettingsTab() {
  return (
    <View>
      <GridPreviewSizeSelector />
      <GridEditScaleSettings />
    </View>
  );
}

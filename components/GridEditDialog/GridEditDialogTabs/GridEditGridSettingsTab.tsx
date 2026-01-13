import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { GridPreviewSizeSelector } from "../../GridPreview";
import { GridEditScaleSettings } from "./GridEditScaleSettingsTab";
import { GlobalVelocityAdjustSlider } from "./GlobalVelocityAdjustSlider";
import { GridThemedButton } from "../../GridThemedComponents/GridThemedButton";
import { GridThemedIcon } from "../../GridThemedComponents/GridThemedIcon";
import { Label } from "../../Typography";

type TabType = "scale" | "velocity";

export function GridEditGridSettingsTab() {
  const [activeTab, setActiveTab] = useState<TabType>("scale");

  return (
    <View style={{ flex: 1 }}>
      <GridPreviewSizeSelector />
      <View style={{ marginTop: 16 }}>
        <View style={styles.tabContainer}>
          <GridThemedButton
            onPress={() => setActiveTab("scale")}
            unfocused={activeTab !== "scale"}
            flex
          >
            <GridThemedIcon
              type="material-community"
              name="music"
              style={{ marginRight: 4 }}
            />
            Scale
          </GridThemedButton>
          <GridThemedButton
            onPress={() => setActiveTab("velocity")}
            unfocused={activeTab !== "velocity"}
            flex
          >
            <GridThemedIcon
              type="material-community"
              name="speedometer"
              style={{ marginRight: 4 }}
            />
            Velocity
          </GridThemedButton>
        </View>
      </View>

      {activeTab === "scale" ? (
        <GridEditScaleSettings />
      ) : (
        <GlobalVelocityAdjustSlider />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});

import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { getGridSettingsSubTabA11y } from "../../../hooks/accessibilityHooks";
import { GridPreviewSizeSelector } from "../../GridPreview";
import { GridThemedButton } from "../../GridThemedComponents/GridThemedButton";
import { GridThemedIcon } from "../../GridThemedComponents/GridThemedIcon";
import { GridEditScaleSettings } from "./GridEditScaleSettingsTab";
import { GlobalVelocityAdjustSlider } from "./GlobalVelocityAdjustSlider";

type TabType = "scale" | "velocity";

const subTabs: { name: string; type: TabType; iconName: string }[] = [
  { name: "Scale", type: "scale", iconName: "music" },
  { name: "Velocity", type: "velocity", iconName: "speedometer" },
];

export function GridEditGridSettingsTab() {
  const [activeTab, setActiveTab] = useState<TabType>("scale");

  return (
    <View style={{ flex: 1 }}>
      <GridPreviewSizeSelector />
      <View style={{ marginTop: 16 }}>
        <View style={styles.tabContainer}>
          {subTabs.map((tab) => {
            const isActive = activeTab === tab.type;
            return (
              <GridThemedButton
                key={tab.type}
                onPress={() => setActiveTab(tab.type)}
                unfocused={!isActive}
                flex
                {...getGridSettingsSubTabA11y(tab.name, isActive)}
              >
                <GridThemedIcon
                  type="material-design"
                  name={tab.iconName}
                  style={{ marginRight: 4 }}
                />
                {tab.name}
              </GridThemedButton>
            );
          })}
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

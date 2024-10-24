import { Icon } from "@rneui/base";
import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../../constants/theme";
import { useCurrentGridPresetColors } from "../../hooks/useCurrentGridPreset";
import { GridThemedButton } from "../GridThemedComponents/GridThemedButton";
import NetworkConfigSettingsTab from "../NetworkConfig/NetworkConfigSettingsTab";
import { NetworkErrorIndicator } from "../NetworkConfig/NetworkErrorIndicator";
import { GridEditStyleSettingsTab } from "./GridEditDialogTabs/GridEditColorSettingsTab";
import { GridEditGridSettingsTab } from "./GridEditDialogTabs/GridEditGridSettingsTab";

const settingsTabs = [
  { name: "Scale", iconName: "musical-notes", type: "ionicon" },
  { name: "Color", iconName: "color-palette", type: "ionicon" },
  { name: "Network", iconName: "network", isNetwork: true },
];

export const GridEditMenu = () => {
  const gridTheme = useCurrentGridPresetColors();
  const [tabIndex, setTabIndex] = React.useState(0);
  return (
    <>
      <View style={styles.dialogTabSelectorContainer}>
        {settingsTabs.map((tab, i) => (
          <GridThemedButton
            onPress={() => setTabIndex(i)}
            key={`settingsTab-${i}`}
            containerStyle={{ flex: 1, borderRadius: 0 }}
            buttonStyle={{
              borderColor: gridTheme.pressedColor,
              borderRadius: 0,
              opacity: tabIndex === i ? 1 : 0.5,
              borderWidth: 1,
            }}
          >
            <TabIcon {...tab} color={gridTheme.pressedColor} />
            {tab.name}
          </GridThemedButton>
        ))}
      </View>

      <View style={styles.dialogContentContainer}>
        {tabIndex === 0 && <GridEditGridSettingsTab />}
        {tabIndex === 1 && <GridEditStyleSettingsTab />}
        {tabIndex === 2 && <NetworkConfigSettingsTab />}
      </View>
    </>
  );
};

const TabIcon = ({
  iconName,
  type,
  color,
  isNetwork,
}: {
  iconName: string;
  isNetwork?: boolean;
  type?: string;
  color: string;
}) => {
  if (isNetwork) {
    return (
      <NetworkErrorIndicator
        forceVisible
        color={color}
        style={{ marginRight: 4 }}
      />
    );
  }
  return (
    <Icon
      name={iconName}
      type={type}
      color={color}
      style={{ marginRight: 4 }}
    />
  );
};

const styles = StyleSheet.create({
  dialogTabSelectorContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    maxHeight: 40,
    flex: 1,
  },
  dialogContentContainer: {
    flex: 1,
    height: "100%",
    padding: 12,
    backgroundColor: theme.color.background,
  },
});

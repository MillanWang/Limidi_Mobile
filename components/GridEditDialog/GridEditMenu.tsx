import { Button } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../../constants/theme";
import NetworkConfigSettingsTab from "../NetworkConfig/NetworkConfigSettingsTab";
import { GridEditStyleSettingsTab } from "./GridEditDialogTabs/GridEditColorSettingsTab";
import { GridEditGridSettingsTab } from "./GridEditDialogTabs/GridEditGridSettingsTab";
import { Icon } from "@rneui/base";
import { useAppSelector } from "../../redux/hooks";
import { GridThemedButton } from "../GridThemedComponents/GridThemedButton";
import { NetworkErrorIndicator } from "../NetworkConfig/NetworkErrorIndicator";

const settingsTabs = [
  { name: "Scale", iconName: "musical-notes", type: "ionicon" },
  { name: "Color", iconName: "color-palette", type: "ionicon" },
  { name: "Network", iconName: "network", isNetwork: true },
];

export const GridEditMenu = () => {
  const { gridTheme } = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset
  );
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
              borderLeftColor:
                tabIndex !== i && i === 0
                  ? gridTheme.unpressedColor
                  : gridTheme.pressedColor,
              borderRightColor:
                tabIndex !== i && i === settingsTabs.length - 1
                  ? gridTheme.unpressedColor
                  : gridTheme.pressedColor,
              borderRadius: 0,
              borderTopColor:
                tabIndex === i
                  ? gridTheme.pressedColor
                  : gridTheme.unpressedColor,
              borderBottomColor:
                tabIndex === i
                  ? gridTheme.pressedColor
                  : gridTheme.unpressedColor,
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

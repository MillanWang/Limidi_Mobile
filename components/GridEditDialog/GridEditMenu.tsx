import { Icon } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../../constants/theme";
import { useCurrentGridPresetColors } from "../../hooks/useCurrentGridPreset";
import { GridThemedButton } from "../GridThemedComponents/GridThemedButton";
import NetworkConfigSettingsTab from "../NetworkConfig/NetworkConfigSettingsTab";
import { NetworkErrorIndicator } from "../NetworkConfig/NetworkErrorIndicator";
import { GridEditStyleSettingsTab } from "./GridEditDialogTabs/GridEditColorSettingsTab";
import { GridEditGridSettingsTab } from "./GridEditDialogTabs/GridEditGridSettingsTab";
import { Page, usePageContext } from "../../hooks/usePageContext";

const settingsTabs = [
  {
    name: "Scale",
    iconName: "musical-notes",
    type: "ionicon",
    page: Page.ScaleSettings,
  },
  {
    name: "Color",
    iconName: "color-palette",
    type: "ionicon",
    page: Page.ColorSettings,
  },
  {
    name: "Network",
    iconName: "network",
    isNetwork: true,
    page: Page.NetworkSettings,
  },
];

export const GridEditMenu = () => {
  const gridTheme = useCurrentGridPresetColors();
  const { page, goToSettings } = usePageContext();

  return (
    <>
      <View style={styles.dialogTabSelectorContainer}>
        {settingsTabs.map((tab, i) => (
          <GridThemedButton
            onPress={() => goToSettings(tab.page)}
            key={`settingsTab-${i}`}
            unfocused={page !== tab.page}
            flex
          >
            <TabIcon {...tab} color={gridTheme.highlightColor} />
            {tab.name}
          </GridThemedButton>
        ))}
      </View>

      <View style={styles.dialogContentContainer}>
        {page === Page.ScaleSettings && <GridEditGridSettingsTab />}
        {page === Page.ColorSettings && <GridEditStyleSettingsTab />}
        {page === Page.NetworkSettings && <NetworkConfigSettingsTab />}
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

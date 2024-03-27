import { Button } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../../constants/theme";
import NetworkConfigSettingsTab from "../NetworkConfig/NetworkConfigSettingsTab";
import { GridEditStyleSettingsTab } from "./GridEditDialogTabs/GridEditColorSettingsTab";
import { GridEditGridSettingsTab } from "./GridEditDialogTabs/GridEditGridSettingsTab";
import { Icon } from "@rneui/base";

const settingsTabs = [
  { name: "Scale", iconName: "musical-notes" },
  { name: "Color", iconName: "color-palette" },
  { name: "Network", iconName: "wifi" },
];

export const GridEditMenu = () => {
  const [tabIndex, setTabIndex] = React.useState(0);
  return (
    <>
      <View style={styles.dialogTabSelectorContainer}>
        {settingsTabs.map((tab, i) => (
          <Button
            onPress={() => setTabIndex(i)}
            key={`settingsTab-${i}`}
            containerStyle={{ flex: 1 }}
            buttonStyle={{
              backgroundColor: tabIndex === i ? "red" : undefined,
            }}
          >
            <TabIcon iconName={tab.iconName} />
            {tab.name}
          </Button>
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

const TabIcon = ({ iconName }: { iconName: string }) => (
  <Icon
    name={iconName}
    type="ionicon"
    color={theme.color.white}
    style={{ marginRight: 4 }}
  />
);

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

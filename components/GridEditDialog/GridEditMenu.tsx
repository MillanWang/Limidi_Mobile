import { Button } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../../constants/theme";
import NetworkConfigSettingsTab from "../NetworkConfig/NetworkConfigSettingsTab";
import { GridEditStyleSettingsTab } from "./GridEditDialogTabs/GridEditColorSettingsTab";
import { GridEditGridSettingsTab } from "./GridEditDialogTabs/GridEditGridSettingsTab";

export const GridEditMenu = () => {
  const [tabIndex, setTabIndex] = React.useState(0);
  return (
    <>
      <View style={styles.dialogTabSelectorContainer}>
        {/* TODO - Icons to support these
        Grid looking icon????
        Color palette
        Wifi
        */}
        <Button onPress={() => setTabIndex(0)}>Grid Settings</Button>
        <Button onPress={() => setTabIndex(1)}>Color Settings</Button>
        <Button onPress={() => setTabIndex(2)}>Network Settings</Button>
      </View>

      <View style={styles.dialogContentContainer}>
        {tabIndex === 0 && <GridEditGridSettingsTab />}
        {tabIndex === 1 && <GridEditStyleSettingsTab />}
        {tabIndex === 2 && <NetworkConfigSettingsTab />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  dialogTabSelectorContainer: {
    flexDirection: "row",
  },
  dialogContentContainer: {
    height: "100%",
    paddingHorizontal: 12,
    backgroundColor: theme.color.background,
  },
});

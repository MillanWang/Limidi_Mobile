import { Text } from "@rneui/themed";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { theme } from "../../constants/theme";
import { useAppSelector } from "../../redux/hooks";
import { CheckConnectionButton } from "./CheckConnectionButton";
import { ConnectionCodeScanner } from "./ConnectionCodeScanner";
import { NetworkAddressInput } from "./NetworkAddressInput";

export default function NetworkConfigSettingsTab() {
  const { gridTheme } = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset
  );

  return (
    <ScrollView>
      <View style={{ flexDirection: "row" }}></View>
      <Text style={[styles.text]}>Limidi Desktop IP Address</Text>
      <View style={styles.dialogContentContainer}>
        <NetworkAddressInput />
        <ConnectionCodeScanner />
        {/* <CheckConnectionButton /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: { color: theme.color.lightText },
  dialogTabSelectorContainer: {
    flexDirection: "row",
  },
  dialogContentContainer: {
    height: 500,
  },
  saveButtonContainer: {
    flexDirection: "row",
  },
});

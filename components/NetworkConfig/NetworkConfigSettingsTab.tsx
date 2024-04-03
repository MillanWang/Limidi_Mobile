import { Button, Dialog, Icon, Text } from "@rneui/themed";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDesktopCommunication } from "../../hooks/useDesktopCommunication";
import { AddressValidationIcon } from "./AddressValidationIcon";
import { ConnectionCodeScanner } from "./ConnectionCodeScanner";
import { NetworkAddressInput } from "./NetworkAddressInput";
import { theme } from "../../constants/theme";

export default function NetworkConfigSettingsTab() {
  const { sendHeartbeatMessage } = useDesktopCommunication();

  return (
    <ScrollView>
      <View style={{ flexDirection: "row" }}>
        <Button onPress={sendHeartbeatMessage}>Check Connection</Button>
      </View>
      <Text style={[styles.text]}>Limidi Desktop IP Address</Text>
      <View style={styles.dialogContentContainer}>
        <NetworkAddressInput />
        <ConnectionCodeScanner />
      </View>

      <View style={styles.saveButtonContainer}></View>
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

import { Button, Dialog } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDesktopCommunication } from "../../hooks/useDesktopCommunication";
import { AddressValidationText } from "./AddressValidationText";
import { ConnectionCodeScanner } from "./ConnectionCodeScanner";
import { ManualNetworkConfig } from "./ManualNetworkConfig";

export default function NetworkConfigSettingsTab() {
  const { sendHeartbeatMessage } = useDesktopCommunication();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Button onPress={() => setTabIndex(0)}>Scan QR Code</Button>
        <Button onPress={() => setTabIndex(1)}>Manual Configuration</Button>
      </View>

      <AddressValidationText />
      <View style={styles.dialogContentContainer}>
        {tabIndex === 0 && <ConnectionCodeScanner />}
        {tabIndex === 1 && <ManualNetworkConfig />}
      </View>

      <View style={styles.saveButtonContainer}>
        <Button onPress={sendHeartbeatMessage}>Check Connection</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

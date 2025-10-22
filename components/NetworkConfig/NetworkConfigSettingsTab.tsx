import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  useWebSocketContext,
  WebSocketStatus,
} from "../../hooks/useWebSocketContext";
import { GridThemedButton } from "../GridThemedComponents/GridThemedButton";
import { StyledIcon } from "../GridThemedComponents/StyledIcon";
import { BodyText } from "../Typography";
import { ConnectionCodeScanner } from "./ConnectionCodeScanner";
import { NetworkAddressInput } from "./NetworkAddressInput";

enum NetworkConfigState {
  Idle,
  ManualEntry,
  Scanning,
}

export default function NetworkConfigSettingsTab() {
  const { status } = useWebSocketContext();
  const [scannerState, setScannerState] = useState<NetworkConfigState>(
    status === WebSocketStatus.Connected
      ? NetworkConfigState.Idle
      : NetworkConfigState.Scanning
  );

  const handleScanButtonPress = () =>
    setScannerState(
      scannerState === NetworkConfigState.Scanning
        ? NetworkConfigState.Idle
        : NetworkConfigState.Scanning
    );

  const handleManualEntryButtonPress = () =>
    setScannerState(
      scannerState === NetworkConfigState.ManualEntry
        ? NetworkConfigState.Idle
        : NetworkConfigState.ManualEntry
    );

  return (
    <ScrollView>
      <StatusMessage />

      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        <GridThemedButton
          onPress={handleScanButtonPress}
          unfocused={scannerState !== NetworkConfigState.Scanning}
          flex
        >
          <QRIcon />
          Scan
        </GridThemedButton>
        <GridThemedButton
          onPress={handleManualEntryButtonPress}
          unfocused={scannerState !== NetworkConfigState.ManualEntry}
          flex
        >
          <StyledIcon name="pencil-outline" />
          Input
        </GridThemedButton>
      </View>

      <View style={styles.dialogContentContainer}>
        {NetworkConfigState.ManualEntry === scannerState && (
          <NetworkAddressInput />
        )}
        {NetworkConfigState.Scanning === scannerState && (
          <ConnectionCodeScanner
            onCancel={() => setScannerState(NetworkConfigState.Idle)}
          />
        )}
      </View>
    </ScrollView>
  );
}

const StatusMessage = () => {
  const { status } = useWebSocketContext();
  return (
    <>
      <View style={{ marginBottom: 16, minHeight: 80 }}>
        <BodyText>Status: {status}</BodyText>
        {status === WebSocketStatus.Connected ? (
          <>
            <BodyText>
              Connection to Limidi Desktop is required to use this app. Please
              check your connection and try again.
            </BodyText>
          </>
        ) : status === WebSocketStatus.Disconnected ? (
          <BodyText>
            Connection to Limidi Desktop is required to use this app. Connect by
            scanning the QR code or inputting the code.
          </BodyText>
        ) : status === WebSocketStatus.Error ? (
          <BodyText>
            Connection to Limidi Desktop is required to use this app. Please
            check your connection and try again.
          </BodyText>
        ) : status === WebSocketStatus.Connecting ? (
          <BodyText>Connecting...</BodyText>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  dialogContentContainer: {
    height: 300,
  },
});

const QRIcon = () => <StyledIcon name="qr-code-sharp" />;

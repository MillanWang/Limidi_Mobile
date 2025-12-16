import { Icon } from "@rneui/themed";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, ScrollView, StyleSheet, View } from "react-native";
import { theme } from "../../constants/theme";
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

const SpinWrapper = ({
  children,
  spin,
}: {
  children: React.ReactNode;
  spin?: boolean;
}) => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!spin) {
      return;
    }

    let looping: Animated.CompositeAnimation | null = null;
    rotation.setValue(0);
    looping = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    looping.start();

    return () => {
      looping && looping.stop();
    };
  }, [rotation, spin]);

  if (!spin) {
    return <>{children}</>;
  }

  const spinStyle = {
    transform: [
      {
        rotate: rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
  };

  return <Animated.View style={spinStyle}>{children}</Animated.View>;
};

const StatusIcon = () => {
  const { status } = useWebSocketContext();

  const { iconName, color, spin } = useMemo(() => {
    switch (status) {
      case WebSocketStatus.Connected:
        return { iconName: "checkmark", color: theme.color.white };
      case WebSocketStatus.Connecting:
        return { iconName: "sync", color: "yellow", spin: true };
      case WebSocketStatus.Disconnected:
      case WebSocketStatus.Error:
      default:
        return { iconName: "close", color: "red" };
    }
  }, [status]);

  return (
    <SpinWrapper spin={spin}>
      <Icon name={iconName} type="ionicon" color={color} />
    </SpinWrapper>
  );
};

const StatusMessage = () => {
  const { status } = useWebSocketContext();

  return (
    <>
      <View style={{ marginBottom: 16, minHeight: 80 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <StatusIcon /> <BodyText>{status}</BodyText>
        </View>
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

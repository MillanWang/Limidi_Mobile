import { Button, Icon, Text } from "@rneui/themed";
import { Camera, CameraView } from "expo-camera";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../../constants/theme";
import { useDesktopCommunication } from "../../hooks/useDesktopCommunication";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setBaseAddress } from "../../redux/slices/HttpCommunicationsSlice";
import { isValidIpWithPort } from "./AddressValidationIcon";
import { GridThemedButton } from "../GridThemedComponents/GridThemedButton";
import { CheckConnectionButton } from "./CheckConnectionButton";
import { useCurrentGridPresetColors } from "../../hooks/useCurrentGridPreset";

export function ConnectionCodeScanner() {
  const dispatch = useAppDispatch();
  const { sendHeartbeatMessage } = useDesktopCommunication();
  const [hasPermission, setHasPermission] = useState(false);
  const [scanData, setScanData] = useState<string | undefined>("<No scan yet>");

  useEffect(() => {
    (async () => {
      const getCameraPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      };

      getCameraPermissions();
    })();
  }, []);

  if (!hasPermission) {
    return (
      <View>
        <Text style={{ color: theme.color.lightText }}>
          Enable camera permissions to scan Limidi Desktop QR code
        </Text>
      </View>
    );
  }
  const handleBarCodeScanned = (result: { type: string; data: string }) => {
    if (result.type === "org.iso.QRCode") {
      setScanData(result.data);
      if (isValidIpWithPort(result.data)) {
        dispatch(setBaseAddress({ baseAddress: result.data }));
        setTimeout(() => sendHeartbeatMessage(), 1000);
      }
    }
  };

  return (
    <View>
      {scanData !== undefined ? (
        <View style={{ flexDirection: "row", gap: 8 }}>
          <GridThemedButton onPress={() => setScanData(undefined)}>
            <QRIcon />
            Scan
          </GridThemedButton>
          <CheckConnectionButton />
        </View>
      ) : (
        <>
          <View style={{ height: "80%" }}>
            <CameraView
              onBarcodeScanned={scanData ? undefined : handleBarCodeScanned}
              style={{ ...StyleSheet.absoluteFillObject }}
              barcodeScannerSettings={{
                barcodeTypes: ["qr", "pdf417"],
              }}
            />
            <View style={{ display: "flex", flexDirection: "row" }}>
              <GridThemedButton onPress={() => setScanData("")}>
                <BackIcon /> Cancel
              </GridThemedButton>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const QRIcon = () => <StyledIcon name="qr-code-sharp" />;
const BackIcon = () => <StyledIcon name="arrow-back-outline" />;
const StyledIcon = ({ name }: { name: string }) => {
  const gridTheme = useCurrentGridPresetColors();
  return (
    <Icon
      name={name}
      type="ionicon"
      color={gridTheme.pressedColor}
      style={{ marginRight: 8 }}
    />
  );
};

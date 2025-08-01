import { Icon, Text } from "@rneui/themed";
import { Camera, CameraView } from "expo-camera";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../../constants/theme";
import { useCurrentGridPresetColors } from "../../hooks/useCurrentGridPreset";
import { useAppDispatch } from "../../redux/hooks";
import { setBaseAddress } from "../../redux/slices/HttpCommunicationsSlice";
import { GridThemedButton } from "../GridThemedComponents/GridThemedButton";
import { isValidIpWithPort } from "./AddressValidationIcon";
import { CheckConnectionButton } from "./CheckConnectionButton";

export function ConnectionCodeScanner() {
  const dispatch = useAppDispatch();
  const [hasPermission, setHasPermission] = useState(false);
  const [canAskAgain, setCanAskAgain] = useState(false);
  const [scanData, setScanData] = useState<string | undefined>("<No scan yet>");

  const getCameraPermissions = async () => {
    const { status, canAskAgain } =
      await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
    setCanAskAgain(canAskAgain);
  };
  useEffect(() => {
    (async () => {
      await getCameraPermissions();
    })();
  }, []);

  if (!hasPermission) {
    return (
      <View>
        <Text style={{ color: theme.color.lightText }}>
          Go to settings and enable camera permissions to scan the Limidi
          Desktop QR code
        </Text>
        {canAskAgain && (
          <View style={{ flexDirection: "row", gap: 8, marginTop: 16 }}>
            <GridThemedButton onPress={getCameraPermissions} borderless>
              <CameraIcon />
              Request Camera Permission
            </GridThemedButton>
          </View>
        )}
      </View>
    );
  }
  const handleBarCodeScanned = (result: { type: string; data: string }) => {
    if (result.type === "qr") {
      if (isValidIpWithPort(result.data)) {
        setScanData(result.data);
        dispatch(setBaseAddress({ baseAddress: result.data }));
      } else {
      }
    }
  };

  return (
    <View>
      {scanData !== undefined ? (
        <View style={{ flexDirection: "row", gap: 8 }}>
          <GridThemedButton onPress={() => setScanData(undefined)} borderless>
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
                barcodeTypes: ["qr"],
              }}
            />
            <View style={{ display: "flex", flexDirection: "row" }}>
              <GridThemedButton onPress={() => setScanData(undefined)}>
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
const CameraIcon = () => <StyledIcon name="camera-outline" />;
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

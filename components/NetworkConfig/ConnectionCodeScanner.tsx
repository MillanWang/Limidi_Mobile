import { Icon } from "@rneui/themed";
import { BodyText, TypographyKind } from "../Typography";
import { Camera, CameraView } from "expo-camera";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../../constants/theme";
import { useAppDispatch } from "../../redux/hooks";
import { setBaseAddress } from "../../redux/slices/HttpCommunicationsSlice";
import { GridThemedButton } from "../GridThemedComponents/GridThemedButton";
import { StyledIcon } from "../GridThemedComponents/StyledIcon";
import { isValidIpWithPort } from "./AddressValidationIcon";

export function ConnectionCodeScanner(props: { onCancel: () => void }) {
  const { onCancel } = props;
  const dispatch = useAppDispatch();

  const [hasScanError, setHasScanError] = useState(false);

  const { hasPermission, canAskAgain, getCameraPermissions } =
    useCameraPermissions();

  const handleBarCodeScanned = useCallback(
    (result: { type: string; data: string }) => {
      if (result.type === "qr") {
        if (isValidIpWithPort(result.data)) {
          dispatch(setBaseAddress({ baseAddress: result.data }));
          onCancel();
          setHasScanError(false);
        } else {
          setHasScanError(true);
        }
      }
    },
    [dispatch, onCancel, setHasScanError]
  );

  if (!hasPermission) {
    return (
      <View>
        <BodyText>
          Go to settings and enable camera permissions to scan the Limidi
          Desktop QR code
        </BodyText>
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

  return (
    <View style={{ height: "100%" }}>
      <CameraView
        onBarcodeScanned={handleBarCodeScanned}
        style={{ ...StyleSheet.absoluteFillObject }}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />
      <View style={{ display: "flex", flexDirection: "row" }}>
        {hasScanError && <InvalidScanMessage />}
      </View>
    </View>
  );
}

const BackIcon = () => <StyledIcon name="arrow-back-outline" />;
const CameraIcon = () => <StyledIcon name="camera-outline" />;

const useCameraPermissions = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [canAskAgain, setCanAskAgain] = useState(false);

  const getCameraPermissions = useCallback(async () => {
    const { status, canAskAgain } =
      await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
    setCanAskAgain(canAskAgain);
  }, []);

  useEffect(() => {
    (async () => {
      await getCameraPermissions();
    })();
  }, []);

  return { hasPermission, canAskAgain, getCameraPermissions };
};

const InvalidScanMessage = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: theme.color.background,
      }}
    >
      <Icon
        name="alert-circle"
        type="ionicon"
        color={theme.color.warningText}
      />
      <BodyText kind={TypographyKind.WARNING}>
        {"Invalid scan. Try again"}
      </BodyText>
    </View>
  );
};

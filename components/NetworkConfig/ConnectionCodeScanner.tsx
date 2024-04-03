import { Button, Icon, Text } from "@rneui/themed";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../../constants/theme";
import { useDesktopCommunication } from "../../hooks/useDesktopCommunication";
import { useAppDispatch } from "../../redux/hooks";
import { setBaseAddress } from "../../redux/slices/HttpCommunicationsSlice";
import { isValidIpWithPort } from "./AddressValidationIcon";

export function ConnectionCodeScanner() {
  const dispatch = useAppDispatch();
  const { sendHeartbeatMessage } = useDesktopCommunication();
  const [hasPermission, setHasPermission] = useState(false);
  const [scanData, setScanData] = useState<string | undefined>("<No scan yet>");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
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
        <Button onPress={() => setScanData(undefined)}>
          Scan <QRIcon />
        </Button>
      ) : (
        <>
          <View style={{ height: "80%" }}>
            <BarCodeScanner
              type="back"
              onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
              style={{ ...StyleSheet.absoluteFillObject }}
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            />
          </View>
        </>
      )}
    </View>
  );
}

const QRIcon = () => (
  <Icon name="qr-code-sharp" type="ionicon" color={theme.color.lightText} />
);

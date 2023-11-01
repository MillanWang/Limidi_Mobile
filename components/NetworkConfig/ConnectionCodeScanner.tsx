import { Button, Icon, Text } from "@rneui/themed";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDesktopCommunication } from "../../hooks/useDesktopCommunication";
import { useAppDispatch } from "../../redux/hooks";
import { setBaseAddress } from "../../redux/slices/HttpCommunicationsSlice";
import { isValidIpWithPort } from "./AddressValidationText";

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
                <Text>No permissions</Text>
            </View>
        );
    }
    const handleBarCodeScanned = (result: { type: string; data: string }) => {
        if (result.type === "org.iso.QRCode") {
            setScanData(result.data);
            if (isValidIpWithPort(result.data)) {
                dispatch(setBaseAddress({ baseAddress: result.data }));
                sendHeartbeatMessage();
            }
        }
    };

    return (
        <View>
            {scanData !== undefined ? (
                <>
                    <Icon name="qr-code-sharp" type="ionicon" />
                    <Text>Scan the QR code in Limidi Desktop</Text>
                    <Text>Scan result: {scanData}</Text>
                    <Button onPress={() => setScanData(undefined)}>Open Scanner</Button>
                </>
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

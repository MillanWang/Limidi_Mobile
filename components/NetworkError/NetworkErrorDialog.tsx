import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Button, Dialog, Icon, Text } from "@rneui/themed";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setMostRecentNetworkFixTime } from "../../redux/slices/HttpCommunicationsSlice";
import { useDesktopCommunication } from "../../hooks/useDesktopCommunication";
import { BarCodeScanner } from "expo-barcode-scanner";

interface NetworkErrorDialogProps {
    isModalOpen: boolean;
    setIsModalOpen(isModalOpen: boolean): void;
}

export default function NetworkErrorDialog({ isModalOpen, setIsModalOpen }: NetworkErrorDialogProps) {
    const { sendHeartbeatMessage } = useDesktopCommunication();
    const dispatch = useAppDispatch();

    const checkConnection = () => {
        sendHeartbeatMessage().then((response) => {
            if (JSON.stringify(response) === "GOOD RESPONSE") {
                dispatch(setMostRecentNetworkFixTime({ mostRecentNetworkFixTime: Date.now() }));
            }
        });
    };
    return (
        <Dialog isVisible={isModalOpen}>
            <View style={styles.dialogTabSelectorContainer}>
                <Text>Disconnected from Limidi Desktop</Text>
            </View>

            <View style={styles.dialogContentContainer}>
                <ConnectionCodeScanner />
            </View>

            <View style={styles.saveButtonContainer}>
                <Button onPress={checkConnection}>Check Connection</Button>
                <Button onPress={() => setIsModalOpen(false)}>Close Modal</Button>
            </View>
        </Dialog>
    );
}

export function ConnectionCodeScanner() {
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

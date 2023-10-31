import { Button, Dialog, Icon, Input, Text } from "@rneui/themed";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDesktopCommunication } from "../../hooks/useDesktopCommunication";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setBaseAddress } from "../../redux/slices/HttpCommunicationsSlice";

interface NetworkConfigDialogProps {
    isModalOpen: boolean;
    setIsModalOpen(isModalOpen: boolean): void;
}

export default function NetworkConfigDialog({ isModalOpen, setIsModalOpen }: NetworkConfigDialogProps) {
    const { sendHeartbeatMessage } = useDesktopCommunication();
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Dialog isVisible={isModalOpen}>
            <View style={{ flexDirection: "row" }}>
                <Button onPress={() => setTabIndex(0)}>Scan QR Code</Button>
                <Button onPress={() => setTabIndex(1)}>Manual Configuration</Button>
            </View>

            <ConditionalInvalidAddressFormatText />
            <View style={styles.dialogContentContainer}>
                {tabIndex === 0 && <ConnectionCodeScanner />}
                {tabIndex === 1 && <ManualNetworkConfig />}
            </View>

            <View style={styles.saveButtonContainer}>
                <Button onPress={sendHeartbeatMessage}>Check Connection</Button>
                <Button onPress={() => setIsModalOpen(false)}>Close Modal</Button>
            </View>
        </Dialog>
    );
}

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

export function ManualNetworkConfig() {
    const { baseAddress } = useAppSelector((state) => state.httpCommunicationsReducer.httpCommunicationInfo);
    const dispatch = useAppDispatch();

    return (
        <View>
            <Text>Enter IP address and port as shown in Limidi Desktop</Text>
            <Input keyboardType="number-pad" defaultValue={baseAddress} onChangeText={(baseAddress) => dispatch(setBaseAddress({ baseAddress }))} />
            <Text>Example: "192.168.0.21:4848"</Text>
        </View>
    );
}

export function ConditionalInvalidAddressFormatText() {
    const { baseAddress } = useAppSelector((state) => state.httpCommunicationsReducer.httpCommunicationInfo);

    return <View>{isValidIpWithPort(baseAddress) ? <Text>Valid format</Text> : <Text>Error: "{baseAddress}" is not a valid format</Text>}</View>;
}

function isValidIpWithPort(addr: string) {
    function isValidIPAddress(ipAddress: string): boolean {
        const segments = ipAddress.split(".");
        if (segments.length !== 4) return false;

        for (const segment of segments) {
            const num = parseInt(segment, 10);
            if (isNaN(num) || num < 0 || num > 255) return false;
        }
        return true;
    }

    function isValidPort(portNumber: number) {
        return !isNaN(portNumber) && portNumber > 0 && portNumber < 65535;
    }

    if (addr === undefined) return false;

    const parts = addr.split(":");
    return parts.length === 2 && isValidIPAddress(parts[0]) && isValidPort(parseInt(parts[1], 10));
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

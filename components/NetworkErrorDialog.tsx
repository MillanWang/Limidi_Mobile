import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Button, Dialog, Text } from "@rneui/themed";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setMostRecentNetworkFixTime } from "../redux/slices/HttpCommunicationsSlice";
import { useDesktopCommunication } from "../hooks/useDesktopCommunication";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera, CameraType } from "expo-camera";

const MIN_TIME_BETWEEN_FIX = 5000;

export default function NetworkErrorDialog() {
    const { sendHeartbeatMessage } = useDesktopCommunication();
    const dispatch = useAppDispatch();
    const { mostRecentNetworkFailTime, mostRecentNetworkFixTime } = useAppSelector((state) => state.httpCommunicationsReducer);
    const isVisible = mostRecentNetworkFailTime - mostRecentNetworkFixTime > MIN_TIME_BETWEEN_FIX;

    const fix = () => dispatch(setMostRecentNetworkFixTime({ mostRecentNetworkFixTime: Date.now() }));
    return (
        <Dialog isVisible={isVisible}>
            <View style={styles.dialogTabSelectorContainer}>
                <Text>Disconnected from Limidi Desktop</Text>
            </View>

            <View style={styles.dialogContentContainer}>
                <ConnectionCodeScanner />
            </View>

            <View style={styles.saveButtonContainer}>
                <Button onPress={fix}>Temporary fix</Button>
            </View>
        </Dialog>
    );
}

export function ConnectionCodeScanner() {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanData, setScanData] = useState<string | undefined>(undefined);

    console.log(scanData);

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
        setScanData(result.data);
        console.log(result.type);
        console.log(result.data);
    };

    // BRUH HOW DOES THIS STILL SCAN WHEN INVISIBLE???

    return (
        <View>
            <Text>hey</Text>
            <Camera type={CameraType.back}>
                <View
                // style={styles.buttonContainer}
                >
                    <BarCodeScanner type="back" onBarCodeScanned={scanData ? undefined : handleBarCodeScanned} />
                </View>
            </Camera>
            {scanData && <Button onPress={() => setScanData(undefined)}>scanAgain</Button>}
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

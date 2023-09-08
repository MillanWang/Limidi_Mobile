import React from "react";
import { StyleSheet, View } from "react-native";

import { Button, Dialog, Text } from "@rneui/themed";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setMostRecentNetworkFixTime } from "../redux/slices/HttpCommunicationsSlice";
import { useDesktopCommunication } from "../hooks/useDesktopCommunication";

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
                <Text>YOOO</Text>
            </View>

            <View style={styles.saveButtonContainer}>
                <Button onPress={fix}>Temporary fix</Button>
            </View>
        </Dialog>
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

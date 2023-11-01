import { Button, Dialog } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDesktopCommunication } from "../../hooks/useDesktopCommunication";
import { AddressValidationText } from "./AddressValidationText";
import { ConnectionCodeScanner } from "./ConnectionCodeScanner";
import { ManualNetworkConfig } from "./ManualNetworkConfig";

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

            <AddressValidationText />
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

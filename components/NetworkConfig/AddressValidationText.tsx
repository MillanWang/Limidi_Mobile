import { Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppSelector } from "../../redux/hooks";

export function AddressValidationText() {
    const { baseAddress } = useAppSelector((state) => state.httpCommunicationsReducer.httpCommunicationInfo);

    return <View>{isValidIpWithPort(baseAddress) ? <Text>Valid format</Text> : <Text>Error: "{baseAddress}" is not a valid format</Text>}</View>;
}

export function isValidIpWithPort(addr: string) {
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

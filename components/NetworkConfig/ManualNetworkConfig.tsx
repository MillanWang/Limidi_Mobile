import { Button, Dialog, Icon, Input, Text } from "@rneui/themed";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDesktopCommunication } from "../../hooks/useDesktopCommunication";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setBaseAddress } from "../../redux/slices/HttpCommunicationsSlice";

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

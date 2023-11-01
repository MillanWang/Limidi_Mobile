import { Icon, Switch } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import GridEditDialog, { GridEditDialogProps } from "../../components/GridEditDialog/GridEditDialog";
import { GridLayoutPresetButtons } from "../GridLayoutPresetButtons";
import { NetworkConfigButton } from "../NetworkConfig/NetworkConfigButton";

export interface GridSettingsButtonProps {
    //extends GridEditDialogProps {
    isPlayMode: boolean;
    // setIsPlayMode(isPlayMode: boolean): void;
}

export function GridSettingsButton({ isPlayMode }: GridSettingsButtonProps) {
    const [showGridEditDialog, setShowGridEditDialog] = useState(false);
    return (
        <>
            {!isPlayMode && (
                <View>
                    <Icon name="settings" color="#ffffff" onPress={() => setShowGridEditDialog(true)} />
                    <Text style={{ color: "#ffffff" }}>SETTINGS</Text>
                </View>
            )}

            <GridEditDialog isVisible={showGridEditDialog} setIsVisible={setShowGridEditDialog} />
        </>
    );
}

const styles = StyleSheet.create({
    headerOptions: {
        flexDirection: "row",
        alignItems: "center",
    },
    modeTextIndicator: {
        margin: 5,
        // color: "#ffffff",
    },
});

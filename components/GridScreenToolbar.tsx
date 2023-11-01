import { Button } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GridSettingsButton } from "./GridEditDialog/GridSettingsButton";
import { GridLayoutPresetButtons } from "./GridLayoutPresetButtons";
import { NetworkConfigButton } from "./NetworkConfig/NetworkConfigButton";

export interface GridScreenToolbarProps {
    isPlayMode: boolean;
    setIsPlayMode(isPlayMode: boolean): void;
}

export function GridScreenToolbar({ isPlayMode, setIsPlayMode }: GridScreenToolbarProps) {
    return (
        <View style={styles.headerOptions}>
            <View style={{ flexDirection: "row" }}>
                <Button onPress={() => setIsPlayMode(!isPlayMode)}>
                    <View style={{ flexDirection: "column" }}>
                        <Text style={{ ...styles.modeTextIndicator, color: "#ffffff" }}>{!isPlayMode ? "PLAY" : "EDIT"}</Text>
                    </View>
                </Button>
            </View>

            <GridSettingsButton isPlayMode={isPlayMode} />
            <NetworkConfigButton isEditMode={!isPlayMode} />
            <GridLayoutPresetButtons />
        </View>
    );
}

const styles = StyleSheet.create({
    headerOptions: {
        flexDirection: "row",
        alignItems: "center",
    },
    modeTextIndicator: {
        // margin: 5,
        // color: "#ffffff",
    },
});

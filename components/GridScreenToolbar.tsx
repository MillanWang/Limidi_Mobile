import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Icon, Switch } from "@rneui/themed";
import GridEditDialog, { GridEditDialogProps } from "../components/GridEditDialog/GridEditDialog";
import { GridLayoutButtons } from "./GridLayoutPresetButtons";
import NetworkErrorDialog from "./NetworkErrorDialog";

export interface GridScreenToolbarProps extends GridEditDialogProps {
    isPlayMode: boolean;
    setIsPlayMode(isPlayMode: boolean): void;
}
export function GridScreenToolbar({ isPlayMode, setIsPlayMode, isVisible, setIsVisible }: GridScreenToolbarProps) {
    return (
        <View style={styles.headerOptions}>
            <Switch
                onChange={() => {
                    setIsPlayMode(!isPlayMode);
                }}
                value={!isPlayMode}
            ></Switch>
            <Text style={styles.playOrEditText}>{isPlayMode ? "PLAY" : "EDIT"}</Text>

            {!!!isPlayMode && (
                // Settings icon
                <View>
                    <Icon
                        name="settings"
                        color="#ffffff"
                        onPress={() => {
                            setIsVisible(true);
                        }}
                    />
                </View>
            )}

            <GridLayoutButtons />

            {/* Settings dialog */}
            <GridEditDialog isVisible={isVisible} setIsVisible={setIsVisible} />

            <NetworkErrorDialog />
        </View>
    );
}

const styles = StyleSheet.create({
    headerOptions: {
        flexDirection: "row",
        alignItems: "center",
    },
    playOrEditText: {
        marginLeft: 5,
        color: "#ffffff",
    },
});

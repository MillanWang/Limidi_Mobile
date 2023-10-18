import { Icon, Switch } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GridEditDialog, { GridEditDialogProps } from "../components/GridEditDialog/GridEditDialog";
import { GridLayoutPresetButtons } from "./GridLayoutPresetButtons";
import { NetworkConfigButton } from "./NetworkConfig/NetworkConfigButton";

export interface GridScreenToolbarProps extends GridEditDialogProps {
    isPlayMode: boolean;
    setIsPlayMode(isPlayMode: boolean): void;
}
export function GridScreenToolbar({ isPlayMode, setIsPlayMode, isVisible, setIsVisible }: GridScreenToolbarProps) {
    const getTextColor = (isEnabled: boolean) => (isEnabled ? "#ffffff" : "#888888");

    return (
        <View style={styles.headerOptions}>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ ...styles.modeTextIndicator, color: getTextColor(isPlayMode) }}>{"PLAY"}</Text>
                <Switch
                    onChange={() => setIsPlayMode(!isPlayMode)}
                    value={!isPlayMode}
                    thumbColor={"green"}
                    color="red"
                    trackColor={{ false: "#ffffff", true: "#ffffff" }}
                >
                    <Text style={{ color: getTextColor(!isPlayMode) }}>{"Yes"}</Text>
                </Switch>
                <Text style={{ ...styles.modeTextIndicator, color: getTextColor(!isPlayMode) }}>{"EDIT"}</Text>
            </View>

            {!isPlayMode && (
                <View>
                    {/* TODO - This should be it's own compoennt carrying its dialog */}
                    <Icon name="settings" color="#ffffff" onPress={() => setIsVisible(true)} />
                    <Text style={{ color: "#ffffff" }}>SETTINGS</Text>
                </View>
            )}

            <NetworkConfigButton isEditMode={!isPlayMode} />

            <GridLayoutPresetButtons />

            {/* Settings dialog */}
            <GridEditDialog isVisible={isVisible} setIsVisible={setIsVisible} />
        </View>
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

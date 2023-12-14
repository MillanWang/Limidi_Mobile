import { Icon } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import GridEditDialog from "../../components/GridEditDialog/GridEditDialog";
import { Button } from "@rneui/themed";
import { styles } from "../GridScreenToolbar";

export interface GridSettingsButtonProps {
    isPlayMode: boolean;
}

export function GridSettingsButton({ isPlayMode }: GridSettingsButtonProps) {
    const [showGridEditDialog, setShowGridEditDialog] = useState(false);
    return (
        <>
            {!isPlayMode && (
                <View style={{ borderColor: "red", borderWidth: 2 }} onTouchEndCapture={() => setShowGridEditDialog(true)}>
                    <Icon name="settings" color="#ffffff" size={16} />
                    <Text style={styles.modalButtonText}>SETTINGS</Text>
                </View>
            )}

            <GridEditDialog isVisible={showGridEditDialog} setIsVisible={setShowGridEditDialog} />
        </>
    );
}

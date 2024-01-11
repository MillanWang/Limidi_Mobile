import { Button } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GridLayoutPresetButtons } from "./GridLayoutPresetButtons";
import { NetworkErrorIndicator } from "./NetworkConfig/NetworkErrorIndicator";

export interface GridScreenToolbarProps {
  isPlayMode: boolean;
  setIsPlayMode(isPlayMode: boolean): void;
  isFullGridEditMode: boolean;
  setIsFullGridEditMode(isPlayMode: boolean): void;
}

export function GridScreenToolbar({
  isPlayMode,
  setIsPlayMode,
  isFullGridEditMode,
  setIsFullGridEditMode,
}: GridScreenToolbarProps) {
  const togglePlayMode = () => {
    setIsPlayMode(!isPlayMode);
    setIsFullGridEditMode(false);
  };

  return (
    <View style={styles.headerOptions}>
      <View style={{ flexDirection: "row" }}>
        <Button onPress={togglePlayMode}>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ ...styles.modeTextIndicator, color: "#ffffff" }}>
              {!isPlayMode ? "PLAY" : "EDIT"}
            </Text>
          </View>
        </Button>
      </View>

      {!isPlayMode && (
        <Button onPress={() => setIsFullGridEditMode(!isFullGridEditMode)}>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ ...styles.modeTextIndicator, color: "#ffffff" }}>
              {!isFullGridEditMode ? "SETTINGS" : "GRID"}
            </Text>
          </View>
        </Button>
      )}

      <NetworkErrorIndicator isEditMode={!isPlayMode} />
      <GridLayoutPresetButtons />
    </View>
  );
}

export const styles = StyleSheet.create({
  headerOptions: {
    flexDirection: "row",
    alignItems: "center",
  },
  modeTextIndicator: {
    // margin: 5,
    // color: "#ffffff",
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
  },
  modalButtonIcon: {
    color: "#FFFFFF",
    fontSize: 12,
  },
});

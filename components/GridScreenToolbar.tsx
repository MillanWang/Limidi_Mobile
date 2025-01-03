import { Icon } from "@rneui/themed";
import { Button } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../constants/theme";
import { useCurrentGridPresetColors } from "../hooks/useCurrentGridPreset";
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
  const gridTheme = useCurrentGridPresetColors();

  const togglePlayMode = () => {
    setIsPlayMode(!isPlayMode);
    setIsFullGridEditMode(false);
  };

  return (
    <View style={styles.headerOptions}>
      <View style={{ flexDirection: "row" }}>
        <Button
          onPress={togglePlayMode}
          style={{ borderRadius: 0 }}
          containerStyle={{ borderRadius: 0 }}
          buttonStyle={{
            backgroundColor: gridTheme.unpressedColor,
            borderColor: isPlayMode
              ? gridTheme.unpressedColor
              : gridTheme.pressedColor,
            borderWidth: 1,
            borderRadius: 0,
          }}
        >
          <Icon
            name={isPlayMode ? "construct-outline" : "play"}
            color={gridTheme.pressedColor}
            type="ionicon"
          />
        </Button>
      </View>

      {!isPlayMode && (
        <Button
          onPress={() => setIsFullGridEditMode(!isFullGridEditMode)}
          style={{ borderRadius: 0 }}
          containerStyle={{ borderRadius: 0 }}
          buttonStyle={{
            backgroundColor: gridTheme.unpressedColor,
            borderColor: gridTheme.pressedColor,
            borderWidth: 1,
            borderRadius: 0,
          }}
        >
          <Icon
            name={isFullGridEditMode ? "grid-outline" : "settings-outline"}
            color={gridTheme.pressedColor}
            type="ionicon"
          />
          <View style={{ flexDirection: "column" }}></View>
        </Button>
      )}

      <View style={styles.rightSideIconsContainer}>
        <NetworkErrorIndicator style={{ marginRight: 16 }} />
        <GridLayoutPresetButtons />
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  headerOptions: {
    flexDirection: "row",
    alignItems: "center",
  },
  modeTextIndicator: {},
  modalButtonText: {
    color: theme.color.white,
    fontSize: 10,
  },
  modalButtonIcon: {
    color: theme.color.white,
    fontSize: 12,
  },

  rightSideIconsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flexGrow: 1,
  },
});

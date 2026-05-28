import { Icon } from "@rneui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { theme } from "../constants/theme";
import {
  getPlayButtonA11y,
  getSettingsButtonA11y,
} from "../hooks/accessibilityHooks";
import { useCurrentGridPresetColors } from "../hooks/useCurrentGridPreset";
import { GridLayoutPresetButtons } from "./GridLayoutPresetButtons";
import { NetworkErrorIndicator } from "./NetworkConfig/NetworkErrorIndicator";
import { Page, usePageContext } from "../hooks/usePageContext";

// Header bar

export function GridScreenToolbar() {
  const gridTheme = useCurrentGridPresetColors();
  const { togglePlayMode, toggleSettings, page, isInSettings } =
    usePageContext();
  const isPlayMode = page === Page.Play;

  return (
    <View style={styles.headerOptions}>
      <TouchableOpacity
        onPress={togglePlayMode}
        {...getPlayButtonA11y(isPlayMode)}
        style={styles.iconButton}
      >
        <Icon
          name={isPlayMode ? "construct-outline" : "play"}
          color={gridTheme.highlightColor}
          type="ionicon"
        />
      </TouchableOpacity>

      {!isPlayMode && (
        <TouchableOpacity
          onPress={toggleSettings}
          {...getSettingsButtonA11y(isInSettings)}
          style={styles.iconButton}
        >
          <Icon
            name={isInSettings ? "grid-outline" : "settings-outline"}
            color={gridTheme.highlightColor}
            type="ionicon"
          />
        </TouchableOpacity>
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
  iconButton: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 8,
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

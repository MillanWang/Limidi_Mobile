import { Button } from "@rneui/themed";
import React from "react";
import { StyleSheet } from "react-native";
import {
  useCurrentGridElementPresetColors,
  useCurrentGridPresetColors,
} from "../hooks/useCurrentGridPreset";

export const IncrementorButton = (props: {
  onPress: () => void;
  isPlus?: boolean;
  disabled?: boolean;
  index?: number;
}) => {
  const { onPress, isPlus, disabled, index } = props;
  const gridTheme =
    index !== undefined
      ? useCurrentGridElementPresetColors(index)
      : useCurrentGridPresetColors();

  const titleStyle = {
    ...styles.titleStyle,
    color: gridTheme.pressedColor,
  };

  return (
    <Button
      disabled={disabled}
      type="clear"
      onPress={onPress}
      buttonStyle={{
        ...styles.gridSizeEditButtonStyle,
        borderColor: gridTheme.pressedColor,
      }}
      disabledStyle={{ ...styles.gridSizeEditButtonDisabledStyle }}
      titleStyle={titleStyle}
      disabledTitleStyle={titleStyle}
    >
      {isPlus ? "+" : "-"}
    </Button>
  );
};

export const styles = StyleSheet.create({
  gridSizeEditButtonStyle: {
    borderRadius: 1000,
    borderWidth: 1,
    height: 30,
    width: 30,
    padding: 0,

    justifyContent: "center",
    alignItems: "center",
  },
  titleStyle: {
    fontSize: 12,
    fontFamily: "monospace",
  },
  gridSizeEditButtonDisabledStyle: {
    opacity: 0.33,
  },
});

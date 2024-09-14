import { Button } from "@rneui/base";
import React from "react";
import { StyleSheet } from "react-native";
import { theme } from "../constants/theme";

export const IncrementorButton = (props: {
  onPress: () => void;
  isPlus?: boolean;
  disabled?: boolean;
}) => {
  const { onPress, isPlus, disabled } = props;
  return (
    <Button
      disabled={disabled}
      type="clear"
      onPress={onPress}
      buttonStyle={styles.gridSizeEditButtonStyle}
      disabledStyle={styles.gridSizeEditButtonDisabledStyle}
      titleStyle={styles.titleStyle}
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
    borderColor: "grey",
  },
});

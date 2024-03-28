import { Button } from "@rneui/base";
import React from "react";
import { styles } from "./GridPreview";

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
    >
      {isPlus ? "+" : "-"}
    </Button>
  );
};

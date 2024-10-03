import { Button, ButtonProps } from "@rneui/themed";
import React from "react";
import { useCurrentGridPresetColors } from "../../hooks/useCurrentGridPresetColors";

export const GridThemedButton = (props: ButtonProps) => {
  const gridTheme = useCurrentGridPresetColors();

  return (
    <Button
      {...props}
      titleStyle={{
        color: gridTheme.pressedColor,
        ...(props.titleStyle as any),
      }}
      buttonStyle={{
        backgroundColor: gridTheme.unpressedColor,
        ...(props.buttonStyle as any),
      }}
    />
  );
};

import { Button, ButtonProps } from "@rneui/themed";
import React from "react";
import {
  useCurrentGridElementPresetColors,
  useCurrentGridPresetColors,
} from "../../hooks/useCurrentGridPreset";

export const GridThemedButton = (props: ButtonProps & { index?: number }) => {
  const gridTheme =
    props.index !== undefined
      ? useCurrentGridElementPresetColors(props.index)
      : useCurrentGridPresetColors();

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

import { Button, ButtonProps } from "@rneui/themed";
import React from "react";
import {
  useCurrentGridElementPresetColors,
  useCurrentGridPresetColors,
} from "../../hooks/useCurrentGridPreset";

export const GridThemedButton = (
  props: ButtonProps & {
    index?: number;
    borderless?: boolean;
    unfocused?: boolean;
    flex?: boolean;
  }
) => {
  const { pressedColor, unpressedColor } =
    props.index !== undefined
      ? useCurrentGridElementPresetColors(props.index)
      : useCurrentGridPresetColors();

  const borderStyle = props.borderless
    ? {}
    : { borderColor: pressedColor, borderWidth: 1, borderRadius: 0 };

  return (
    <Button
      {...props}
      titleStyle={{
        color: pressedColor,
        ...(props.titleStyle as any),
      }}
      buttonStyle={{
        backgroundColor: unpressedColor,
        ...borderStyle,

        ...(props.buttonStyle as any),
      }}
      containerStyle={{
        borderRadius: 0,
        opacity: props.unfocused ? 0.5 : 1,
        ...(props.flex ? { flex: 1 } : {}),
        ...(props.containerStyle as any),
      }}
    />
  );
};

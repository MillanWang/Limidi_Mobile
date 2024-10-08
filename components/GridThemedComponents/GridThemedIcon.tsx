import { Icon, IconProps } from "@rneui/themed";
import React from "react";
import {
  useCurrentGridElementPresetColors,
  useCurrentGridPresetColors,
} from "../../hooks/useCurrentGridPreset";

export const GridThemedIcon = (
  props: IconProps & { invert?: boolean; color?: string; index?: number }
) => {
  const gridTheme =
    props.index !== undefined
      ? useCurrentGridElementPresetColors(props.index)
      : useCurrentGridPresetColors();

  const color =
    props.color ??
    (props.invert ? gridTheme.unpressedColor : gridTheme.pressedColor);

  return <Icon color={color} {...props} />;
};

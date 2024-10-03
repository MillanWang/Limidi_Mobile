import { Icon, IconProps } from "@rneui/themed";
import React from "react";
import { useCurrentGridPresetColors } from "../../hooks/useCurrentGridPresetColors";

export const GridThemedIcon = (props: IconProps & { invert?: boolean }) => {
  const gridTheme = useCurrentGridPresetColors();

  const color = props.invert
    ? gridTheme.unpressedColor
    : gridTheme.pressedColor;

  return <Icon color={color} {...props} />;
};

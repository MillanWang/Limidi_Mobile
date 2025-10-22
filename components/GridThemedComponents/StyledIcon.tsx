import { Icon } from "@rneui/themed";
import React from "react";
import { useCurrentGridPresetColors } from "../../hooks/useCurrentGridPreset";

export const StyledIcon = ({ name }: { name: string }) => {
  const gridTheme = useCurrentGridPresetColors();
  return (
    <Icon
      name={name}
      type="ionicon"
      color={gridTheme.highlightColor}
      style={{ marginRight: 8 }}
    />
  );
};

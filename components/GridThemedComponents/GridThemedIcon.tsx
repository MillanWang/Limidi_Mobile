import { Icon, IconProps } from "@rneui/themed";
import React from "react";
import { useAppSelector } from "../../redux/hooks";

export const GridThemedIcon = (props: IconProps & { type?: string }) => {
  const { gridTheme } = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset
  );

  return <Icon color={gridTheme.pressedColor} {...props} />;
};

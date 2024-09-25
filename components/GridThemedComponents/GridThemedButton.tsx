import { Button, ButtonProps } from "@rneui/themed";
import React from "react";
import { useAppSelector } from "../../redux/hooks";

export const GridThemedButton = (props: ButtonProps) => {
  const gridTheme = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset.gridTheme
  );

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

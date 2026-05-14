import { Button, ButtonProps } from "@rneui/themed";
import React, { ReactNode } from "react";
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
  },
) => {
  const { highlightColor, primaryColor } =
    props.index !== undefined
      ? useCurrentGridElementPresetColors(props.index)
      : useCurrentGridPresetColors();

  const borderStyle = props.borderless
    ? {}
    : { borderColor: highlightColor, borderWidth: 1, borderRadius: 0 };

  // RNE v5's ButtonProps inherits PressableProps where children may be a
  // function-as-child; the underlying Button only accepts a ReactNode, so
  // we narrow before forwarding.
  const { children, ...rest } = props;

  return (
    <Button
      {...rest}
      titleStyle={{
        color: highlightColor,
        ...(props.titleStyle as any),
      }}
      buttonStyle={{
        backgroundColor: primaryColor,
        ...borderStyle,

        ...(props.buttonStyle as any),
      }}
      containerStyle={{
        borderRadius: 0,
        opacity: props.unfocused ? 0.5 : 1,
        ...(props.flex ? { flex: 1 } : {}),
        ...(props.containerStyle as any),
      }}
    >
      {children as ReactNode}
    </Button>
  );
};

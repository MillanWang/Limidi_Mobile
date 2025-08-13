import { ButtonProps } from "@rneui/themed";
import React from "react";
import { useWebSocketContext } from "../../hooks/useWebSocketContext";
import { GridThemedButton } from "../GridThemedComponents/GridThemedButton";
import { NetworkErrorIndicator } from "./NetworkErrorIndicator";

export const CheckConnectionButton = (props: ButtonProps) => {
  const { tryConnection } = useWebSocketContext();
  return (
    <GridThemedButton onPress={tryConnection} borderless {...props}>
      <NetworkErrorIndicator
        style={{ marginRight: 8 }}
        useGridThemeColors
        forceVisible
      />
      Recheck
    </GridThemedButton>
  );
};

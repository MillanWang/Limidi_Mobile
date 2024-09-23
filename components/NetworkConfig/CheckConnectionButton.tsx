import { ButtonProps } from "@rneui/themed";
import React from "react";
import { useDesktopCommunication } from "../../hooks/useDesktopCommunication";
import { GridThemedButton } from "../GridThemedComponents/GridThemedButton";
import { NetworkErrorIndicator } from "./NetworkErrorIndicator";

export const CheckConnectionButton = (props: ButtonProps) => {
  const { sendHeartbeatMessage } = useDesktopCommunication();
  return (
    <GridThemedButton onPress={sendHeartbeatMessage} {...props}>
      <NetworkErrorIndicator style={{ marginRight: 8 }} useGridThemeColors />
      Check Connection
    </GridThemedButton>
  );
};

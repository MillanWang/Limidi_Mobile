import { Icon, IconProps } from "@rneui/themed";
import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { theme } from "../../constants/theme";
import { useCurrentGridPresetColors } from "../../hooks/useCurrentGridPreset";
import {
  useWebSocketContext,
  WebSocketStatus,
} from "../../hooks/useWebSocketContext";

interface NetworkConfigButtonProps {
  forceVisible?: boolean;
  useGridThemeColors?: boolean;
}

export const NetworkErrorIndicator = ({
  forceVisible,
  useGridThemeColors,
  ...iconProps
}: NetworkConfigButtonProps & Partial<IconProps>) => {
  const gridTheme = useCurrentGridPresetColors();
  const { status, tryConnection } = useWebSocketContext();

  const isButtonVisible = forceVisible || status !== WebSocketStatus.OPEN;

  const color = useMemo(() => {
    if (useGridThemeColors) {
      return gridTheme.pressedColor;
    }

    switch (status) {
      case WebSocketStatus.OPEN:
        return theme.color.white;
      case WebSocketStatus.CONNECTING:
        return "yellow";
      default:
        return "red";
    }
  }, [status]);

  const iconName = useMemo(() => {
    if (WebSocketStatus.OPEN === status) {
      return "wifi";
    }
    return "wifi-off";
  }, [status]);

  if (!isButtonVisible) {
    return null;
  }

  return (
    <TouchableOpacity onPress={tryConnection}>
      <Icon size={24} name={iconName} color={color} {...iconProps} />
    </TouchableOpacity>
  );
};

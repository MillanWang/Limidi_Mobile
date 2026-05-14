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

  const isButtonVisible = forceVisible || status !== WebSocketStatus.Connected;

  const color = useMemo(() => {
    if (useGridThemeColors) {
      return gridTheme.highlightColor;
    }

    switch (status) {
      case WebSocketStatus.Connected:
        return theme.color.white;
      case WebSocketStatus.Connecting:
        return theme.color.warningText;
      default:
        return theme.color.errorText;
    }
  }, [status]);

  const iconName = useMemo(() => {
    if (WebSocketStatus.Connected === status) {
      return "wifi";
    }
    return "wifi-off";
  }, [status]);

  const a11yLabel =
    status === WebSocketStatus.Connected
      ? "Connected to desktop. Tap to reconnect."
      : status === WebSocketStatus.Connecting
        ? "Connecting to desktop."
        : "Disconnected from desktop. Tap to retry.";

  if (!isButtonVisible) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={tryConnection}
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
    >
      <Icon size={24} name={iconName} color={color} {...iconProps} />
    </TouchableOpacity>
  );
};

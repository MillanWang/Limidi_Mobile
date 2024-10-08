import { Icon, IconProps } from "@rneui/themed";
import React from "react";
import { theme } from "../../constants/theme";
import { useCurrentGridPresetColors } from "../../hooks/useCurrentGridPreset";
import { useAppSelector } from "../../redux/hooks";

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

  const { mostRecentNetworkFailTime, mostRecentNetworkFixTime } =
    useAppSelector((state) => state.httpCommunicationsReducer);

  const hasRecentError = mostRecentNetworkFailTime > mostRecentNetworkFixTime;
  const isButtonVisible = forceVisible || hasRecentError;

  if (!isButtonVisible) {
    return null;
  }

  const color = useGridThemeColors
    ? gridTheme.pressedColor
    : hasRecentError
    ? "red"
    : theme.color.white;

  return (
    <>
      <Icon
        size={24}
        name={hasRecentError ? "wifi-off" : "wifi"}
        color={color}
        {...iconProps}
      />
    </>
  );
};

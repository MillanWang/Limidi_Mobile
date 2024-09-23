import { Icon, IconProps } from "@rneui/themed";
import React from "react";
import { theme } from "../../constants/theme";
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
  const {
    httpCommunicationsReducer: {
      mostRecentNetworkFailTime,
      mostRecentNetworkFixTime,
    },
    gridPresetsReducer: {
      currentGridPreset: { gridTheme },
    },
  } = useAppSelector((state) => state);

  useGridThemeColors;
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

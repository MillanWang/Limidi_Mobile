import { Icon, IconProps } from "@rneui/themed";
import React, { useMemo } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import {
  useCurrentGridElementPresetColors,
  useCurrentGridPresetColors,
  useGridElementAtIndex,
} from "../../hooks/useCurrentGridPreset";
import { useElementSize } from "../../hooks/useElementSize";

const DEFAULT_ICON_MAX_SIZE = 40;
const DEFAULT_ICON_MIN_SIZE = 20;

export const useGridCcIconSize = () => {
  const { elementWidth, elementHeight } = useElementSize();

  return useMemo(() => {
    const elementSmallestDimension = Math.min(elementWidth, elementHeight);
    const elementBasedIconSize = Math.floor(elementSmallestDimension * 0.2);
    return Math.max(DEFAULT_ICON_MIN_SIZE, Math.min(DEFAULT_ICON_MAX_SIZE, elementBasedIconSize));
  }, [elementWidth, elementHeight]);
};

export const GridThemedIcon = (
  props: IconProps & { invert?: boolean; color?: string; index?: number },
) => {
  const gridTheme =
    props.index !== undefined
      ? useCurrentGridElementPresetColors(props.index)
      : useCurrentGridPresetColors();

  const color = props.color ?? (props.invert ? gridTheme.primaryColor : gridTheme.highlightColor);

  return <Icon color={color} {...props} />;
};

export const ControlChangeIcon = (props: {
  index: number;
  name?: string;
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  const { index, name, containerStyle } = props;
  const safeIconName = name ?? useSafeIconName({ index });
  const iconSize = useGridCcIconSize();

  const { colorState } = useGridElementAtIndex(index);
  const color = colorState.highlightColor;
  return (
    <View
      style={{
        height: iconSize,
        width: iconSize,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: color,
        ...(containerStyle as any),
      }}
    >
      <GridThemedIcon
        index={index}
        invert
        name={safeIconName}
        type="ionicon"
        size={iconSize * 0.7}
      />
    </View>
  );
};

const useSafeIconName = ({ index }: { index: number }) => {
  const {
    controlChangeState: { xAxisControlIndex, yAxisControlIndex, iconName },
  } = useGridElementAtIndex(index);
  return useMemo(
    () => getSafeIconName(iconName, xAxisControlIndex, yAxisControlIndex),
    [iconName, xAxisControlIndex, yAxisControlIndex],
  );
};

const getSafeIconName = (
  iconName: string,
  xAxisControlIndex: number,
  yAxisControlIndex: number,
) => {
  if (iconName) {
    return iconName;
  } else if (xAxisControlIndex > 0 && yAxisControlIndex > 0) {
    // XY default
    return "move";
  } else if (yAxisControlIndex > 0) {
    // Vertical default
    return "swap-vertical";
  } else if (xAxisControlIndex > 0) {
    // Horizontal default
    return "swap-horizontal";
  }
  return "move";
};

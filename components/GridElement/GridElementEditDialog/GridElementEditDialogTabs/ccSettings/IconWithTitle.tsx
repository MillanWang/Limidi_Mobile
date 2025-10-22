import { Text } from "@rneui/themed";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ioniconIconNameAliases } from "../../../../../constants/IconNames";
import { theme } from "../../../../../constants/theme";
import {
  useCurrentGridElementPresetColors,
  useCurrentGridPresetColors,
} from "../../../../../hooks/useCurrentGridPreset";
import { GridThemedIcon } from "../../../../GridThemedComponents/GridThemedIcon";

const iconContainerSize = 45;
interface IconWithTitleProps {
  name: string;
  width?: number;

  index?: number;
}

/*
In the middle of adding custom color overrides here so that they can be thened to a specific elements color config

*/

export const IconWithTitle = ({ name, width, index }: IconWithTitleProps) => {
  const backgroundColor =
    index !== undefined
      ? useCurrentGridElementPresetColors(index).highlightColor
      : useCurrentGridPresetColors().highlightColor;

  const getFormattedIconName = useGetFormattedIconName();
  const formattedName = useMemo(() => getFormattedIconName(name), [name]);

  return (
    <View style={{ alignItems: "center", width }}>
      <View
        style={{
          backgroundColor,
          height: iconContainerSize,
          width: iconContainerSize,
          justifyContent: "center",
          borderRadius: 100, //Big enough to be a circle
        }}
      >
        <GridThemedIcon
          name={name}
          type="ionicon"
          invert={true}
          index={index}
        />
      </View>
      <Text style={{ color: backgroundColor ?? theme.color.lightText }}>
        {formattedName}
      </Text>
    </View>
  );
};

export const useGetFormattedIconName = () => (name: string) => {
  const noPrefixname =
    ioniconIconNameAliases[name] ??
    name.replaceAll("logo-", "").replaceAll("ios-", "").replaceAll("-", " ");

  return noPrefixname.charAt(0).toUpperCase() + noPrefixname.slice(1);
};

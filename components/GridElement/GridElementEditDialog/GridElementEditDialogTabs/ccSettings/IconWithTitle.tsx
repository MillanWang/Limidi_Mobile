import React, { useMemo } from "react";
import { View } from "react-native";
import { ioniconIconNameAliases } from "../../../../../constants/IconNames";
import { theme } from "../../../../../constants/theme";
import {
  useCurrentGridElementPresetColors,
  useCurrentGridPresetColors,
} from "../../../../../hooks/useCurrentGridPreset";
import { ControlChangeIcon } from "../../../../GridThemedComponents/GridThemedIcon";
import { BodyText } from "../../../../Typography";

interface IconWithTitleProps {
  name: string;
  width?: number;
  index: number;
}

export const IconWithTitle = ({ name, width, index }: IconWithTitleProps) => {
  const backgroundColor =
    index !== undefined
      ? useCurrentGridElementPresetColors(index).highlightColor
      : useCurrentGridPresetColors().highlightColor;

  const getFormattedIconName = useGetFormattedIconName();
  const formattedName = useMemo(() => getFormattedIconName(name), [name]);

  return (
    <View style={{ alignItems: "center", width }}>
      <ControlChangeIcon index={index} name={name} />
      <BodyText style={{ color: backgroundColor ?? theme.color.lightText }}>
        {formattedName}
      </BodyText>
    </View>
  );
};

export const useGetFormattedIconName = () => (name: string) => {
  const noPrefixname =
    ioniconIconNameAliases[name] ??
    name.replaceAll("logo-", "").replaceAll("ios-", "").replaceAll("-", " ");

  return noPrefixname.charAt(0).toUpperCase() + noPrefixname.slice(1);
};

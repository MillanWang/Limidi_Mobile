import { Text } from "@rneui/themed";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ioniconIconNameAliases } from "../../../../../constants/IconNames";
import { theme } from "../../../../../constants/theme";
import { useCurrentGridPresetColors } from "../../../../../hooks/useCurrentGridPresetColors";
import { GridThemedIcon } from "../../../../GridThemedComponents/GridThemedIcon";

const iconContainerSize = 50;
interface IconWithTitleProps {
  name: string;
  width?: number;
}

export const IconWithTitle = ({ name, width }: IconWithTitleProps) => {
  const backgroundColor = useCurrentGridPresetColors().pressedColor;

  const formattedName = useMemo(() => {
    const noPrefixname =
      ioniconIconNameAliases[name] ??
      name.replaceAll("logo-", "").replaceAll("ios-", "").replaceAll("-", " ");

    return noPrefixname.charAt(0).toUpperCase() + noPrefixname.slice(1);
  }, [name]);

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
        <GridThemedIcon name={name} type="ionicon" invert={true} />
      </View>
      <Text style={{ color: theme.color.lightText }}>{formattedName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  lockSwitchView: {
    flexDirection: "row",
    alignItems: "center",
  },
});

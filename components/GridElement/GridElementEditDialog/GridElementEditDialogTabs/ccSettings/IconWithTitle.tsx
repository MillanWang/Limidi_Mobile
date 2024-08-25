import { Icon, Text } from "@rneui/themed";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ioniconIconNameAliases } from "../../../../../constants/IconNames";
import { theme } from "../../../../../constants/theme";

interface IconWithTitleProps {
  name: string;
  backgroundColor: string;
  iconColor: string;
  width?: number;
}
export const IconWithTitle = ({
  name,
  width,
  backgroundColor,
  iconColor,
}: IconWithTitleProps) => {
  const formattedName = useMemo(() => {
    const noPrefixname =
      ioniconIconNameAliases[name] ??
      name.replaceAll("logo-", "").replaceAll("ios-", "").replaceAll("-", " ");

    return noPrefixname.charAt(0).toUpperCase() + noPrefixname.slice(1);
  }, [name]);

  const iconContainerSize = 50;

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
        <Icon name={name} type="ionicon" color={iconColor} />
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

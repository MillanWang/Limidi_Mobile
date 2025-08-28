import { Text } from "@rneui/themed";
import React, { useCallback } from "react";
import { View } from "react-native";
import { theme } from "../../../../../constants/theme";
import { useCurrentGridPresetColors } from "../../../../../hooks/useCurrentGridPreset";
import { GridThemedButton } from "../../../../GridThemedComponents/GridThemedButton";
import { GridThemedIcon } from "../../../../GridThemedComponents/GridThemedIcon";
import { ControlChangeIndexSelector } from "../ccSettings/ControlChangeIndexSelector";
import {
  ControlChangeDirection,
  useControlChangeIndexController,
} from "../useControlChangeIndexController";
import { ControlChangeSettingsPanelProps } from "./ControlChangeSettingsPanel";

export const ControlChangeIndexSettings = ({
  index,
}: ControlChangeSettingsPanelProps) => {
  const { mode } = useControlChangeIndexController({ index });
  const gridTheme = useCurrentGridPresetColors();

  const unidirectionalButtonList = [
    {
      text: "Horizontal",
      enum: ControlChangeDirection.Horizontal,
      iconName: "swap-horizontal",
      onPress: mode.setHorizontal,
    },
    {
      text: "Vertical",
      enum: ControlChangeDirection.Vertical,
      iconName: "swap-vertical",
      onPress: mode.setVertical,
    },
    {
      text: "XY ",
      enum: ControlChangeDirection.XY,
      iconName: "move",
      onPress: mode.setXY,
    },
  ];

  const isXY = mode.current === ControlChangeDirection.XY;
  const showVerticalControlChangeIndexSelector =
    mode.current === ControlChangeDirection.Vertical || isXY;
  const showHorizontalControlChangeIndexSelector =
    mode.current === ControlChangeDirection.Horizontal || isXY;

  return (
    <>
      <View style={{ marginBottom: 12 }}>
        <Text style={{ color: theme.color.white }}>Orientation:</Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 4,
            width: "100%",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          {unidirectionalButtonList.map((element, i) => (
            <GridThemedButton
              index={index}
              unfocused={mode.current !== element.enum}
              flex
              titleStyle={{ fontSize: 16 }}
              onPress={element.onPress}
              title={element.text}
              key={`button_${element.text}_${i}`}
            >
              <GridThemedIcon
                index={index}
                name={element.iconName}
                type="ionicon"
                style={{ marginRight: 4 }}
              />
              {element.text}
            </GridThemedButton>
          ))}
        </View>
      </View>

      {showHorizontalControlChangeIndexSelector && (
        <View>
          <Text style={{ color: theme.color.white }}>
            {`${isXY ? "Horizontal " : ""}MIDI CC Index:`}
          </Text>
          <ControlChangeIndexSelector index={index} isVertical={false} />
        </View>
      )}

      {showVerticalControlChangeIndexSelector && (
        <View>
          <Text style={{ color: theme.color.white }}>
            {`${isXY ? "Vertical " : ""}MIDI CC Index:`}
          </Text>
          <ControlChangeIndexSelector index={index} isVertical />
        </View>
      )}
    </>
  );
};

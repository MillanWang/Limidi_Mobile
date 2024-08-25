import { Button, Icon, Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { theme } from "../../../../../constants/theme";
import { ControlChangeIndexSelector } from "../ccSettings/ControlChangeIndexSelector";
import { ControlChangeSettingsPanelProps } from "./ControlChangeSettingsPanel";
import {
  ControlChangeDirection,
  useControlChangeIndexController,
} from "../useControlChangeIndexController";

export const ControlChangeIndexSettings = ({
  index,
}: ControlChangeSettingsPanelProps) => {
  const { mode } = useControlChangeIndexController({ index });

  const modeButtonList = [
    {
      text: "Horizontal",
      enum: ControlChangeDirection.horizontal,
      iconName: "swap-horizontal",
      onPress: mode.setHorizontal,
    },
    {
      text: "Vertical",
      enum: ControlChangeDirection.vertical,
      iconName: "swap-vertical",
      onPress: mode.setVertical,
    },
    {
      text: "XY Bidirectional",
      enum: ControlChangeDirection.xy,
      iconName: "move",
      onPress: mode.setXY,
    },
  ];

  const isXY = mode.current === ControlChangeDirection.xy;
  const showVerticalControlChangeIndexSelector =
    mode.current === ControlChangeDirection.vertical || isXY;
  const showHorizontalControlChangeIndexSelector =
    mode.current === ControlChangeDirection.horizontal || isXY;

  return (
    <>
      <View style={{ marginBottom: 12 }}>
        <Text style={{ color: theme.color.white }}>Orientation</Text>
        <View style={{ flexDirection: "row", gap: 12 }}>
          {modeButtonList.map((element, i) => (
            <Button
              buttonStyle={{
                backgroundColor:
                  mode.current === element.enum ? "black" : "blue",
              }}
              onPress={element.onPress}
              title={element.text}
              key={`button_${element.text}_${i}`}
            >
              <Icon name={element.iconName} type="ionicon" />
            </Button>
          ))}
        </View>
      </View>

      {showHorizontalControlChangeIndexSelector && (
        <View>
          <Text style={{ color: theme.color.white }}>
            {`${isXY ? "Horizontal " : ""}MIDI CC Index`}
          </Text>
          <ControlChangeIndexSelector index={index} isVertical={false} />
        </View>
      )}
      {showVerticalControlChangeIndexSelector && (
        <View>
          <Text style={{ color: theme.color.white }}>
            {`${isXY ? "Vertical " : ""}MIDI CC Index`}
          </Text>
          <ControlChangeIndexSelector index={index} isVertical />
        </View>
      )}
    </>
  );
};

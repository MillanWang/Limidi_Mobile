import { Button, Icon, Text } from "@rneui/themed";
import React, { useCallback } from "react";
import { View } from "react-native";
import { theme } from "../../../../../constants/theme";
import { ControlChangeIndexSelector } from "../ccSettings/ControlChangeIndexSelector";
import { ControlChangeSettingsPanelProps } from "./ControlChangeSettingsPanel";
import {
  ControlChangeDirection,
  useControlChangeIndexController,
} from "../useControlChangeIndexController";
import { GridThemedButton } from "../../../../GridThemedComponents/GridThemedButton";
import { GridThemedIcon } from "../../../../GridThemedComponents/GridThemedIcon";
import { useAppSelector } from "../../../../../redux/hooks";

export const ControlChangeIndexSettings = ({
  index,
}: ControlChangeSettingsPanelProps) => {
  const { mode } = useControlChangeIndexController({ index });
  const gridTheme = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset.gridTheme
  );
  const modeButtonList = [
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
      text: "XY Bidirectional",
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

  const getButtonStyle = useCallback(
    (isEnabled: boolean, index: number) => {
      return {
        borderWidth: 1,
        borderColor:
          isEnabled || true ? gridTheme.pressedColor : gridTheme.unpressedColor,
        opacity: isEnabled ? 1 : 0.33,
        borderRadius: 0,
      };
    },
    [gridTheme]
  );

  return (
    <>
      <View style={{ marginBottom: 12 }}>
        <Text style={{ color: theme.color.white }}>Orientation:</Text>
        <View style={{ flexDirection: "row", marginTop: 4 }}>
          {modeButtonList.map((element, i) => (
            <GridThemedButton
              buttonStyle={getButtonStyle(mode.current === element.enum, i)}
              containerStyle={{ borderRadius: 0 }}
              onPress={element.onPress}
              title={element.text}
              key={`button_${element.text}_${i}`}
            >
              <GridThemedIcon
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

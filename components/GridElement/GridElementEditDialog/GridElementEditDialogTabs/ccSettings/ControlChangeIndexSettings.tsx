import { Label } from "../../../../Typography";
import React from "react";
import { View } from "react-native";
import { getCcDirectionA11y } from "../../../../../hooks/accessibilityHooks";
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
        <Label>Orientation:</Label>
        <View
          style={{
            flexDirection: "row",
            marginTop: 4,
            width: "100%",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          {unidirectionalButtonList.map((element, i) => {
            const isActive = mode.current === element.enum;
            return (
              <GridThemedButton
                key={`button_${element.text}_${i}`}
                index={index}
                unfocused={!isActive}
                flex
                titleStyle={{ fontSize: 16 }}
                onPress={element.onPress}
                title={element.text}
                {...getCcDirectionA11y(element.enum, isActive)}
              >
                <GridThemedIcon
                  index={index}
                  name={element.iconName}
                  type="ionicon"
                  style={{ marginRight: 4 }}
                />
                {element.text}
              </GridThemedButton>
            );
          })}
        </View>
      </View>

      {showHorizontalControlChangeIndexSelector && (
        <View>
          <Label>{`${isXY ? "Horizontal " : ""}MIDI CC Index:`}</Label>
          <ControlChangeIndexSelector index={index} isVertical={false} />
        </View>
      )}

      {showVerticalControlChangeIndexSelector && (
        <View>
          <Label>{`${isXY ? "Vertical " : ""}MIDI CC Index:`}</Label>
          <ControlChangeIndexSelector index={index} isVertical />
        </View>
      )}
    </>
  );
};

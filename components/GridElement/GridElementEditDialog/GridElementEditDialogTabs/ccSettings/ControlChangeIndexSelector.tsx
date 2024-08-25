import { Button, Input } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { theme } from "../../../../../constants/theme";
import { useControlChangeIndexController } from "../useControlChangeIndexController";

export const ControlChangeIndexSelector = (props: {
  index: number;
  isVertical: boolean;
}) => {
  const { index, isVertical } = props;
  const { horizontalIndex, verticalIndex } = useControlChangeIndexController({
    index,
  });

  const indexController = isVertical ? verticalIndex : horizontalIndex;
  const canDecrement = indexController.value > 0;
  const canIncrement = indexController.value < 127;

  return (
    <View style={{ flexDirection: "row" }}>
      <Input
        leftIcon={
          <Button
            title="-"
            onPress={indexController.decrement}
            disabled={!canDecrement}
          />
        }
        keyboardType="numeric"
        value={`${indexController.value}`}
        style={{ color: theme.color.lightText }}
        onChange={(e) => {
          const value = e.nativeEvent.text;
          if (isIntegerBetween0And127(value)) {
            indexController.set(Number(value));
          } else if (value === "") {
            indexController.set(0);
          }
        }}
        rightIcon={
          <Button
            title="+"
            onPress={indexController.increment}
            disabled={!canIncrement}
          />
        }
      />
    </View>
  );
};

function isIntegerBetween0And127(input: string): boolean {
  // Check if the input string is a valid integer and not a decimal
  const num = Number(input);
  const isInteger = /^\d+$/.test(input);

  // Ensure the conversion to number is valid, within the specified range, and not a decimal
  return isInteger && Number.isInteger(num) && num >= 0 && num <= 127;
}

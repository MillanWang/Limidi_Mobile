import { Button, Input } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { theme } from "../../../../../constants/theme";
import { useControlChangeIndexController } from "../useControlChangeIndexController";
import { IncrementorButton } from "../../../../IncrementorButton";

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
    <View
      style={{
        maxWidth: 180,
      }}
    >
      <Input
        containerStyle={{ paddingLeft: 4 }}
        leftIcon={
          <IncrementorButton
            isPlus={false}
            onPress={indexController.decrement}
            disabled={!canDecrement}
          />
        }
        inputStyle={{ color: theme.color.lightText, marginLeft: 8 }}
        keyboardType="numeric"
        value={`${indexController.value}`}
        onChange={(e) => {
          const value = e.nativeEvent.text;
          if (isIntegerBetween0And127(value)) {
            indexController.set(Number(value));
          } else if (value === "") {
            indexController.set(0);
          }
        }}
        rightIcon={
          <IncrementorButton
            isPlus
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

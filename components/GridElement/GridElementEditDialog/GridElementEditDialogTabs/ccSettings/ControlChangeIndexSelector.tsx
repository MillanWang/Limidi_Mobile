import { Input, Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { theme } from "../../../../../constants/theme";
import { GridThemedIcon } from "../../../../GridThemedComponents/GridThemedIcon";
import { IncrementorButton } from "../../../../IncrementorButton";
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
  const otherIndicesWithMatchingCcIndex =
    indexController.otherIndicesWithMatchingCcIndex;
  const canDecrement = indexController.value > 0;
  const canIncrement = indexController.value < 127;

  const defaultCcIndex = index * 2 + (isVertical ? 1 : 0);
  const currentCcIndexIsDefault = indexController.value === defaultCcIndex;

  const hasIndexCollision = otherIndicesWithMatchingCcIndex.length > 0;
  const indexCollisionWarningMessage = hasIndexCollision
    ? `Not unique\n(${otherIndicesWithMatchingCcIndex.slice(0, 3).join(", ")}${
        otherIndicesWithMatchingCcIndex.length > 3 ? ", ..." : ""
      })`
    : "";

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ maxWidth: 180, flex: 1 }}>
        <Input
          containerStyle={{ paddingLeft: 4, marginBottom: 0 }}
          leftIcon={
            <IncrementorButton
              index={index}
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
              index={index}
              isPlus
              onPress={indexController.increment}
              disabled={!canIncrement}
            />
          }
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: -28,
          alignItems: "center",
        }}
      >
        <GridThemedIcon
          style={{ opacity: currentCcIndexIsDefault ? 0 : 1, marginRight: 8 }}
          index={index}
          onPress={() => {
            if (!currentCcIndexIsDefault) {
              indexController.set(defaultCcIndex);
            }
          }}
          name={"refresh-outline"}
          type="ionicon"
        />
        <GridThemedIcon
          style={{ opacity: hasIndexCollision ? 1 : 0, marginRight: 8 }}
          name={"warning-outline"}
          color={theme.color.warningText}
          type="ionicon"
        />

        <Text style={{ color: theme.color.warningText }}>
          {indexCollisionWarningMessage}
        </Text>
      </View>
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

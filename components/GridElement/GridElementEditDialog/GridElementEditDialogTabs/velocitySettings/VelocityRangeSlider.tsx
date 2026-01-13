import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { BodyText } from "../../../../Typography";

const markerSize = 40;
const labelTextStyle = {
  position: "absolute",
  top: markerSize / 2 - 38,
  textAlign: "center",
  width: markerSize,
  pointerEvents: "none",
} as const;

export interface VelocityRangeSliderProps {
  floor: number;
  ceiling: number;
  primaryColor: string;
  highlightColor: string;
  onValuesChange: (floor: number, ceiling: number) => void;
  containerStyle?: ViewStyle;
}

export const VelocityRangeSlider = ({
  floor,
  ceiling,
  primaryColor,
  highlightColor,
  onValuesChange,
  containerStyle,
}: VelocityRangeSliderProps) => {
  const handleValuesChange = (values: number[]) => {
    onValuesChange(values[0], values[1]);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <MultiSlider
        isMarkersSeparated
        allowOverlap
        enableLabel
        customLabel={({
          oneMarkerValue,
          twoMarkerValue,
          oneMarkerLeftPosition,
          twoMarkerLeftPosition,
        }) => {
          const isClose =
            Math.abs(Number(oneMarkerValue) - Number(twoMarkerValue)) < 16;

          return (
            <View style={{ position: "absolute", width: "100%", zIndex: 5 }}>
              {isClose ? (
                <BodyText
                  style={{
                    ...labelTextStyle,
                    color: highlightColor,
                    width: markerSize * 2,
                    left:
                      (oneMarkerLeftPosition + twoMarkerLeftPosition) / 2 -
                      markerSize,
                  }}
                >
                  {oneMarkerValue === twoMarkerValue
                    ? oneMarkerValue
                    : `${oneMarkerValue} - ${twoMarkerValue}`}
                </BodyText>
              ) : (
                <>
                  <BodyText
                    style={{
                      ...labelTextStyle,
                      color: highlightColor,
                      left: oneMarkerLeftPosition - markerSize / 2,
                    }}
                  >
                    {oneMarkerValue}
                  </BodyText>
                  <BodyText
                    style={{
                      ...labelTextStyle,
                      color: highlightColor,
                      left:
                        (oneMarkerLeftPosition +
                          twoMarkerLeftPosition -
                          markerSize) /
                        2,
                    }}
                  >
                    -
                  </BodyText>
                  <BodyText
                    style={{
                      ...labelTextStyle,
                      color: highlightColor,
                      left: twoMarkerLeftPosition - markerSize / 2,
                    }}
                  >
                    {twoMarkerValue}
                  </BodyText>
                </>
              )}
            </View>
          );
        }}
        values={[floor, ceiling]}
        onValuesChange={handleValuesChange}
        min={0}
        max={127}
        step={1}
        trackStyle={{
          backgroundColor: primaryColor,
          borderWidth: 0.5,
          borderColor: highlightColor,
          height: 4,
        }}
        selectedStyle={{
          borderColor: primaryColor,
          backgroundColor: highlightColor,
        }}
        markerStyle={{
          borderColor: highlightColor,
          backgroundColor: primaryColor,
          height: markerSize,
          width: markerSize,
        }}
        pressedMarkerStyle={{
          borderColor: primaryColor,
          backgroundColor: highlightColor,
          height: markerSize + 8,
          width: markerSize + 8,
          zIndex: 1000,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
  },
});

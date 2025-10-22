import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { useGridElementAtIndex } from "../../../../../hooks/useCurrentGridPreset";
import { useAppDispatch } from "../../../../../redux/hooks";
import {
  setGridElementVelocityCeiling,
  setGridElementVelocityFloor,
} from "../../../../../redux/slices/GridPresetsSlice";

export const VelocityAdjustSlider = (props: { index: number }) => {
  const { index } = props;
  const {
    midiNoteState: { velocity },
    colorState: { unpressedColor, pressedColor },
  } = useGridElementAtIndex(index);

  const dispatch = useAppDispatch();

  const setVelocityFloor = (velocity: number) =>
    dispatch(setGridElementVelocityFloor({ index: index, floor: velocity }));

  const setVelocityCeiling = (velocity: number) =>
    dispatch(
      setGridElementVelocityCeiling({ index: index, ceiling: velocity })
    );

  return (
    <View style={{ padding: 16, alignItems: "center" }}>
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
                <Text
                  style={{
                    ...labelTextStyle,
                    color: pressedColor,
                    width: markerSize * 2,
                    left:
                      (oneMarkerLeftPosition + twoMarkerLeftPosition) / 2 -
                      markerSize,
                  }}
                >
                  {oneMarkerValue === twoMarkerValue
                    ? oneMarkerValue
                    : `${oneMarkerValue} - ${twoMarkerValue}`}
                </Text>
              ) : (
                <>
                  <Text
                    style={{
                      ...labelTextStyle,
                      color: pressedColor,
                      left: oneMarkerLeftPosition - markerSize / 2,
                    }}
                  >
                    {oneMarkerValue}
                  </Text>
                  <Text
                    style={{
                      ...labelTextStyle,
                      color: pressedColor,
                      left:
                        (oneMarkerLeftPosition +
                          twoMarkerLeftPosition -
                          markerSize) /
                        2,
                    }}
                  >
                    -
                  </Text>
                  <Text
                    style={{
                      ...labelTextStyle,
                      color: pressedColor,
                      left: twoMarkerLeftPosition - markerSize / 2,
                    }}
                  >
                    {twoMarkerValue}
                  </Text>
                </>
              )}
            </View>
          );
        }}
        values={[velocity.floor, velocity.ceiling]}
        onValuesChange={(e) => {
          setVelocityFloor(e[0]);
          setVelocityCeiling(e[1]);
        }}
        min={0}
        max={127}
        step={1}
        trackStyle={{
          backgroundColor: unpressedColor,
          borderWidth: 0.5,
          borderColor: pressedColor,
          height: 4,
        }}
        selectedStyle={{
          borderColor: unpressedColor,
          backgroundColor: pressedColor,
        }}
        markerStyle={{
          borderColor: pressedColor,
          backgroundColor: unpressedColor,
          height: markerSize,
          width: markerSize,
        }}
        pressedMarkerStyle={{
          borderColor: unpressedColor,
          backgroundColor: pressedColor,
          height: markerSize + 8,
          width: markerSize + 8,
          zIndex: 1000,
        }}
      />
    </View>
  );
};

const markerSize = 40;
const labelTextStyle = {
  position: "absolute",
  top: markerSize / 2 - 34,
  textAlign: "center",
  width: markerSize,
  pointerEvents: "none",
} as const;

import React from "react";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { setGridElementVelocityIsVertical } from "../../../../../redux/slices/GridPresetsSlice";
import { GridThemedButton } from "../../../../GridThemedComponents/GridThemedButton";
import { GridThemedIcon } from "../../../../GridThemedComponents/GridThemedIcon";

export const VelocityDirectionSelector = ({ index }: { index: number }) => {
  const dispatch = useAppDispatch();
  const isVertical = useAppSelector(
    (state) =>
      state.gridPresetsReducer.currentGridPreset.gridElements[index]
        .midiNoteState.velocity.isVertical
  );

  const gridTheme = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset.gridTheme
  );
  const setVelocityVertical = () => {
    dispatch(setGridElementVelocityIsVertical({ index, isVertical: true }));
  };
  const setVelocityHorizontal = () => {
    dispatch(setGridElementVelocityIsVertical({ index, isVertical: false }));
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          marginTop: 4,
          width: "100%",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <GridThemedButton
          onPress={setVelocityVertical}
          containerStyle={{
            borderRadius: 0,
            flex: 1,
            borderWidth: 1,
            borderColor: gridTheme.pressedColor,
            opacity: isVertical ? 1 : 0.5,
          }}
        >
          <GridThemedIcon name="swap-vertical" type="ionicon" /> Vertical
        </GridThemedButton>
        <GridThemedButton
          onPress={setVelocityHorizontal}
          containerStyle={{
            borderRadius: 0,
            flex: 1,
            borderWidth: 1,
            borderColor: gridTheme.pressedColor,
            opacity: !isVertical ? 1 : 0.5,
          }}
        >
          <GridThemedIcon name="swap-horizontal" type="ionicon" /> Horizontal
        </GridThemedButton>
      </View>
    </>
  );
};

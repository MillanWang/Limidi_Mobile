import React from "react";
import { View } from "react-native";
import {
  useCurrentGridElementPresetColors,
  useGridElementAtIndex,
} from "../../../../../hooks/useCurrentGridPreset";
import { useAppDispatch } from "../../../../../redux/hooks";
import { setGridElementVelocityIsVertical } from "../../../../../redux/slices/GridPresetsSlice";
import { GridThemedButton } from "../../../../GridThemedComponents/GridThemedButton";
import { GridThemedIcon } from "../../../../GridThemedComponents/GridThemedIcon";

export const VelocityDirectionSelector = ({ index }: { index: number }) => {
  const dispatch = useAppDispatch();
  const isVertical =
    useGridElementAtIndex(index).midiNoteState.velocity.isVertical;

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
          index={index}
          onPress={setVelocityVertical}
          unfocused={!isVertical}
          flex
        >
          <GridThemedIcon name="swap-vertical" type="ionicon" index={index} />
          {" Vertical"}
        </GridThemedButton>
        <GridThemedButton
          index={index}
          onPress={setVelocityHorizontal}
          unfocused={isVertical}
          flex
        >
          <GridThemedIcon name="swap-horizontal" type="ionicon" index={index} />
          {" Horizontal"}
        </GridThemedButton>
      </View>
    </>
  );
};

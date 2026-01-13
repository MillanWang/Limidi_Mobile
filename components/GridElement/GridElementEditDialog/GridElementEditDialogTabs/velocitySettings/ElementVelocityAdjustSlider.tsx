import React from "react";
import { useGridElementAtIndex } from "../../../../../hooks/useCurrentGridPreset";
import { useAppDispatch } from "../../../../../redux/hooks";
import {
  setGridElementVelocityCeiling,
  setGridElementVelocityFloor,
} from "../../../../../redux/slices/GridPresetsSlice";
import { VelocityRangeSlider } from "./VelocityRangeSlider";

export const ElementVelocityAdjustSlider = (props: { index: number }) => {
  const { index } = props;
  const {
    midiNoteState: { velocity },
    colorState: { primaryColor, highlightColor },
  } = useGridElementAtIndex(index);

  const dispatch = useAppDispatch();

  const handleValuesChange = (floor: number, ceiling: number) => {
    dispatch(setGridElementVelocityFloor({ index, floor }));
    dispatch(setGridElementVelocityCeiling({ index, ceiling }));
  };

  return (
    <VelocityRangeSlider
      floor={velocity.floor}
      ceiling={velocity.ceiling}
      primaryColor={primaryColor}
      highlightColor={highlightColor}
      onValuesChange={handleValuesChange}
    />
  );
};

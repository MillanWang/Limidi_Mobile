import { Icon } from "@rneui/themed";
import React from "react";
import { theme } from "../constants/theme";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setPresetIndex } from "../redux/slices/GridPresetsSlice";

// List of the preset icons. They only exist up to 6, which feels like a reasonable amount of presets
const PRESET_ICON_NAMES = ["one", "two", "3", "4", "5", "6"];

export function GridLayoutPresetButtons() {
  const dispatch = useAppDispatch();
  const currentPresetIndex = useAppSelector(
    (state) => state.gridPresetsReducer.currentPresetIndex
  );

  const setPresetIndexFunction = (presetIndex: number) => {
    return () => dispatch(setPresetIndex({ index: presetIndex }));
  };

  return (
    <>
      {PRESET_ICON_NAMES.map((iconNameString, presetIndex) => {
        return (
          <Icon
            key={`PresetButtonIcon_${presetIndex}`}
            name={`looks-${iconNameString}`} // Defines which icon is used
            color={
              currentPresetIndex === presetIndex ? theme.color.white : "#888888"
            }
            onPress={setPresetIndexFunction(presetIndex)}
          />
        );
      })}
    </>
  );
}

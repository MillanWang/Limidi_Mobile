import { Icon } from "@rneui/themed";
import React from "react";
import { useCurrentGridPresetColors } from "../hooks/useCurrentGridPreset";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setPresetIndex } from "../redux/slices/GridPresetsSlice";
import { TouchableOpacity } from "react-native";

// List of the preset icons. They only exist up to 6, which feels like a reasonable amount of presets
const PRESET_ICON_NAMES = ["one", "two", "3", "4", "5", "6"];

export function GridLayoutPresetButtons() {
  const dispatch = useAppDispatch();
  const { currentPresetIndex } = useAppSelector(
    (state) => state.gridPresetsReducer
  );

  const gridTheme = useCurrentGridPresetColors();

  const setPresetIndexFunction = (presetIndex: number) => {
    return () => dispatch(setPresetIndex({ index: presetIndex }));
  };

  return (
    <>
      {PRESET_ICON_NAMES.map((iconNameString, presetIndex) => {
        return (
          <TouchableOpacity onPress={setPresetIndexFunction(presetIndex)}>
            <Icon
              key={`PresetButtonIcon_${presetIndex}`}
              name={`looks-${iconNameString}`} // Defines which icon is used
              color={gridTheme.pressedColor}
              style={{ opacity: currentPresetIndex === presetIndex ? 1 : 0.3 }}
            />
          </TouchableOpacity>
        );
      })}
    </>
  );
}

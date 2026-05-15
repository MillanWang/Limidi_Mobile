import { Icon } from "@rneui/themed";
import React from "react";
import { TouchableOpacity } from "react-native";
import { getPresetButtonA11y } from "../hooks/accessibilityHooks";
import { useCurrentGridPresetColors } from "../hooks/useCurrentGridPreset";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setPresetIndex } from "../redux/slices/GridPresetsSlice";

// List of the preset icons. They only exist up to 6, which feels like a reasonable amount of presets
const PRESET_ICON_NAMES = ["one", "two", "3", "4", "5", "6"];

export function GridLayoutPresetButtons() {
  const dispatch = useAppDispatch();
  const { currentPresetIndex } = useAppSelector(
    (state) => state.gridPresetsReducer,
  );
  const gridTheme = useCurrentGridPresetColors();

  const setPresetIndexFunction = (presetIndex: number) => {
    return () => dispatch(setPresetIndex({ index: presetIndex }));
  };

  return (
    <>
      {PRESET_ICON_NAMES.map((iconNameString, presetIndex) => {
        const isSelected = currentPresetIndex === presetIndex;
        return (
          <TouchableOpacity
            onPress={setPresetIndexFunction(presetIndex)}
            key={`PresetButtonIcon_${presetIndex}`}
            {...getPresetButtonA11y(presetIndex, isSelected)}
          >
            <Icon
              name={`looks-${iconNameString}`} // Defines which icon is used
              color={gridTheme.highlightColor}
              style={{ opacity: isSelected ? 1 : 0.3 }}
            />
          </TouchableOpacity>
        );
      })}
    </>
  );
}

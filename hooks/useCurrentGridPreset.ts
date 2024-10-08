import { useAppSelector } from "../redux/hooks";

export const useCurrentGridPreset = () => {
  const currentGridPreset = useAppSelector((state) => {
    return state.gridPresetsReducer.gridPresets[
      state.gridPresetsReducer.currentPresetIndex
    ];
  });
  return currentGridPreset;
};

export const useCurrentGridPresetColors = () => {
  const currentGridPreset = useCurrentGridPreset();
  return currentGridPreset.gridTheme;
};

export const useGridElementAtIndex = (index: number) => {
  const currentGridPreset = useCurrentGridPreset();
  return currentGridPreset.gridElements[index];
};

export const useCurrentGridElementPresetColors = (index: number) => {
  const currentGridElement = useGridElementAtIndex(index);
  return currentGridElement.colorState;
};

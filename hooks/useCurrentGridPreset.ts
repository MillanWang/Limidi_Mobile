import { useAppSelector } from "../redux/hooks";

export const useCurrentGridPreset = () => {
  const currentGridPreset = useAppSelector((state) => {
    return state.gridPresetsReducer.gridPresets[
      state.gridPresetsReducer.currentPresetIndex
    ];
  });
  return currentGridPreset;
};

export const useGridElementAtIndex = (index: number) => {
  const currentGridPreset = useCurrentGridPreset();
  return currentGridPreset.gridElements[index];
};

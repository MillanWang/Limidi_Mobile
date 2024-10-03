import { useAppSelector } from "../redux/hooks";

export const useCurrentGridPreset = () => {
  // TODO - Remove the redundant preset storage and get the current preset from here
  //   const currentPresetIndex = useAppSelector(
  //     (state) => state.gridPresetsReducer.currentPresetIndex
  //   );

  const currentGridPreset = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset
  );
  return currentGridPreset;
};

export const useGridElementAtIndex = (index: number) => {
  const currentGridPreset = useCurrentGridPreset();
  return currentGridPreset.gridElements[index];
};

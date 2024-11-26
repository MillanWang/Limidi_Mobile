import { useAppSelector } from "../redux/hooks";
import { defaultPresets } from "../redux/slices/GridPresetsSlice";

export const usePresetDefault = () => {
  const currentGridPresetIndex = useAppSelector(
    (state) => state.gridPresetsReducer.currentPresetIndex
  );
  return defaultPresets[currentGridPresetIndex];
};

import { useAppSelector } from "../redux/hooks";

export const useCurrentGridPresetColors = () => {
  const currentGridPreset = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset
  );
  return currentGridPreset.gridTheme;
};

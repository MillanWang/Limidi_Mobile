import { useCurrentGridPreset } from "./useCurrentGridPreset";

export const useCurrentGridPresetColors = () => {
  const currentGridPreset = useCurrentGridPreset();
  return currentGridPreset.gridTheme;
};

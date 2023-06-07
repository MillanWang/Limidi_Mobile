import { GridState } from "./GridState";

export interface GridPresetsState {
    currentPresetIndex: number,
    currentGridPreset: GridState,
    gridPresets: GridState[],
}
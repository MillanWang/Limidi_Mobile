import { Scale } from "../../constants/Scales";
import { GridElementColorState } from "./GridElement/GridElementColorState";
import { GridElementState } from "./GridElement/GridElementState";

export interface GlobalVelocityState {
  floor: number;
  ceiling: number;
}

export interface GridState {
  columnCount: number;
  rowCount: number;
  startingNoteNumber: number;
  scale: Scale;
  gridElements: GridElementState[];
  gridTheme: GridElementColorState;
  globalVelocity: GlobalVelocityState;
}

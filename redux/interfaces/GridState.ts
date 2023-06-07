
import { Scale } from "../../constants/Scales";
import { GridElementState } from "./GridElement/GridElementState";

export interface GridState {
    columnCount: number,
    rowCount: number,
    startingNoteNumber: number,
    scale: Scale,
    gridElements: GridElementState[],
}
import { GridElementState } from "./GridElement/GridElementState";

export interface GridState {
    startingNoteNumber: number,
    columnCount: number,
    rowCount: number,
    gridElements: GridElementState[],
}
import { useMemo } from "react";
import { isNoteLabelStandard } from "../constants/MIDI_Notes";
import { GridElementState } from "../redux/interfaces/GridElement/GridElementState";
import { GridState } from "../redux/interfaces/GridState";
import { ScaleService } from "../services/ScaleService";
import {
  useCurrentGridPreset,
  useGridElementAtIndex,
} from "./useCurrentGridPreset";

export const useIsGridElementDirty = (elementIndex: number): boolean => {
  const grid = useCurrentGridPreset();
  const gridElement = useGridElementAtIndex(elementIndex);

  return useMemo(() => {
    return isGridElementDirty(gridElement, elementIndex, grid);
  }, [gridElement, grid, elementIndex]);
};

/**
 * Determines if a grid element is "dirty" (has been modified from its default state).
 * An element is considered dirty if it satisfies any of the following:
 * 1. The name is not standard (doesn't match the expected note label)
 * 2. The note number doesn't fit the current scale (would be changed by rescaleGridElements)
 * 3. The color is different from the grid's color
 *
 * @param gridElement - The grid element to check
 * @param elementIndex - The index of the element in the grid's gridElements array
 * @param grid - The grid state containing scale, startingNoteNumber, and gridTheme
 * @returns true if the element is dirty, false otherwise
 */
export function isGridElementDirty(
  gridElement: GridElementState,
  elementIndex: number,
  grid: GridState
): boolean {
  const { colorState } = gridElement;
  const { gridTheme } = grid;
  if (
    colorState.primaryColor !== gridTheme.primaryColor ||
    colorState.highlightColor !== gridTheme.highlightColor
  ) {
    return true;
  }

  const {
    midiNoteState: { velocity },
  } = gridElement;
  if (
    !velocity.isVertical ||
    velocity.floor !== grid.globalVelocity.floor ||
    velocity.ceiling !== grid.globalVelocity.ceiling
  ) {
    return true;
  }

  if (!gridElement.isMidiNote) {
    const { xAxisControlIndex, yAxisControlIndex } =
      gridElement.controlChangeState;
    if (xAxisControlIndex > 0 && xAxisControlIndex !== elementIndex * 2) {
      return true;
    }
    if (yAxisControlIndex > 0 && yAxisControlIndex !== elementIndex * 2 + 1) {
      return true;
    }
    return false;
  }

  const {
    midiNoteState: { noteNumber },
    name,
  } = gridElement;

  if (gridElement.isMidiNote) {
    const scaleService = new ScaleService();
    scaleService.setScale(grid.scale);
    scaleService.setStartingNoteNumber(grid.startingNoteNumber);

    let expectedNoteNumber = scaleService.getNextNoteNumber();
    for (let i = 0; i < elementIndex; i++) {
      expectedNoteNumber = scaleService.getNextNoteNumber();
    }

    if (noteNumber !== expectedNoteNumber) {
      return true;
    }
  }

  return !isNoteLabelStandard(noteNumber, name);
}

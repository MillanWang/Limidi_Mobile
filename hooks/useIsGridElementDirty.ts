import { useCallback, useMemo } from "react";
import {
  getNoteKeyFromNoteNumber,
  isNoteLabelStandard,
} from "../constants/MIDI_Notes";
import { useAppDispatch } from "../redux/hooks";
import { GridElementState } from "../redux/interfaces/GridElement/GridElementState";
import { GridState } from "../redux/interfaces/GridState";
import {
  setGridElementControlChangeXIndex,
  setGridElementControlChangeYIndex,
  setGridElementhighlightColor,
  setGridElementName,
  setGridElementNote,
  setGridElementOctave,
  setGridElementprimaryColor,
  setGridElementVelocityCeiling,
  setGridElementVelocityFloor,
  setGridElementVelocityIsVertical,
} from "../redux/slices/GridPresetsSlice";
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

/**
 * Hook that returns a callback to reset a grid element to its default state.
 * This will make the element no longer "dirty" by resetting all properties
 * to match the grid's default values.
 *
 * @param elementIndex - The index of the element to reset
 * @returns A callback function that resets the element
 */
export const useResetGridElement = (elementIndex: number): (() => void) => {
  const dispatch = useAppDispatch();
  const grid = useCurrentGridPreset();
  const { isMidiNote } = useGridElementAtIndex(elementIndex);

  return useCallback(() => {
    // Reset colors to grid theme
    const { primaryColor, highlightColor } = grid.gridTheme;
    dispatch(setGridElementprimaryColor({ index: elementIndex, primaryColor }));
    dispatch(
      setGridElementhighlightColor({ index: elementIndex, highlightColor })
    );

    // Reset velocity to global velocity
    const { floor, ceiling } = grid.globalVelocity;
    dispatch(setGridElementVelocityFloor({ index: elementIndex, floor }));
    dispatch(setGridElementVelocityCeiling({ index: elementIndex, ceiling }));
    dispatch(
      setGridElementVelocityIsVertical({
        index: elementIndex,
        isVertical: true,
      })
    );

    if (isMidiNote) {
      // Reset MIDI note to expected scale position
      const scaleService = new ScaleService();
      scaleService.setScale(grid.scale);
      scaleService.setStartingNoteNumber(grid.startingNoteNumber);

      let expectedNoteNumber = scaleService.getNextNoteNumber();
      for (let i = 0; i < elementIndex; i++) {
        expectedNoteNumber = scaleService.getNextNoteNumber();
      }

      // Set octave first, then note (to avoid octave preservation in setGridElementNote)
      const expectedOctave = Math.floor(expectedNoteNumber / 12);
      const expectedNote = expectedNoteNumber % 12;
      dispatch(
        setGridElementOctave({
          index: elementIndex,
          newNoteOctave: expectedOctave,
        })
      );
      dispatch(
        setGridElementNote({ index: elementIndex, newNoteNumber: expectedNote })
      );
      const name = getNoteKeyFromNoteNumber(expectedNoteNumber);
      dispatch(setGridElementName({ index: elementIndex, name }));
    } else {
      // Reset control change indices to defaults
      const xAxisControlIndex = (elementIndex * 2) % 128;
      const yAxisControlIndex = (elementIndex * 2 + 1) % 128;
      dispatch(
        setGridElementControlChangeXIndex({
          index: elementIndex,
          xAxisControlIndex,
        })
      );
      dispatch(
        setGridElementControlChangeYIndex({
          index: elementIndex,
          yAxisControlIndex,
        })
      );
    }
  }, [dispatch, grid, isMidiNote, elementIndex]);
};

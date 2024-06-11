import {
  getNoteKeyFromNoteNumber,
  isNoteLabelStandard,
} from "../../constants/MIDI_Notes";
import { ScaleService } from "../../services/ScaleService";
import { GridState } from "../interfaces/GridState";

export function rescaleGridElements(grid: GridState) {
  const { scale, startingNoteNumber, gridElements } = grid;
  const scaleService = new ScaleService(); // TODO - Consider the possibility of replacing scaleService with a hook
  scaleService.setScale(scale);
  scaleService.setStartingNoteNumber(startingNoteNumber);

  for (let currentGridElement of gridElements) {
    const currentNoteNumber = scaleService.getNextNoteNumber();
    if (!currentGridElement.isLocked) {
      if (
        isNoteLabelStandard(
          currentGridElement.midiNoteState.noteNumber,
          currentGridElement.name
        )
      ) {
        // If the name has been changed, then don't overwrite it when rescaling
        currentGridElement.name = `${getNoteKeyFromNoteNumber(
          currentNoteNumber
        )}`;
      }
      currentGridElement.midiNoteState.noteNumber = currentNoteNumber;
    }
  }

  return grid;
}

import { getNoteKeyFromNoteNumber } from "../../constants/MIDI_Notes";
import { Scale, ScaleService } from "../../services/ScaleService";
import { GridElementState } from "../interfaces/GridElement/GridElementState";
import { GridState } from "../interfaces/GridState";

export function rescaleGridElements(grid: GridState) {
    const { scale, startingNoteNumber, gridElements } = grid;
    const scaleService = new ScaleService(); // TODO - Consider the possibility of replacing scaleService with a hook
    scaleService.setScale(scale);
    scaleService.setCurrentNoteNumber(startingNoteNumber);

    for (let currentGridElement of gridElements) {
        const currentNoteNumber = scaleService.getNextNoteNumber();
        if (!currentGridElement.isLocked) {
            currentGridElement.name = `${getNoteKeyFromNoteNumber(currentNoteNumber)}`;
            currentGridElement.midiState.noteNumber = currentNoteNumber;
        }
    }

    return grid;
}
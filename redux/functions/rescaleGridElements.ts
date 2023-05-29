import { getNoteKeyFromNoteNumber } from "../../constants/MIDI_Notes";
import { Scale, ScaleService } from "../../services/ScaleService";
import { GridElementState } from "../interfaces/GridElement/GridElementState";

export function rescaleGridElements(scale: Scale, startingNoteNumber: number, gridElements: GridElementState[]): void {
    const scaleService = new ScaleService();
    scaleService.setScale(scale);
    scaleService.setCurrentNoteNumber(startingNoteNumber);

    for (let currentGridElement of gridElements) {
        const currentNoteNumber = scaleService.getNextNoteNumber();
        if (!currentGridElement.isLocked) {
            currentGridElement.name = `${getNoteKeyFromNoteNumber(currentNoteNumber)}`;
            currentGridElement.midiState.noteNumber = currentNoteNumber;
        }
    }
}

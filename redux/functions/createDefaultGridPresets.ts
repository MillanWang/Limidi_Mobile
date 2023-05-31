import { ColorPreset, DEFAULT, FROST, GRAPE, HULK, LAVA, SLIME } from "../../constants/Colors";
import { getNoteKeyFromNoteNumber } from "../../constants/MIDI_Notes";
import { Scale } from "../../services/ScaleService";
import { ScaleService } from "../../services/ScaleService";
import { GridElementState } from "../interfaces/GridElement/GridElementState";
import { GridPresetsState } from "../interfaces/GridPresetsState";
import { GridState } from "../interfaces/GridState";
import { rescaleGridElements } from "./rescaleGridElements";

function createGridElements(scale: Scale, colorPreset: ColorPreset): GridElementState[] {
    const scaleService = new ScaleService();
    scaleService.setScale(scale);
    const allGridElements: GridElementState[] = [];

    //Make a state for all possible GridElements. 12rows*12Columns is the biggest possible grid
    for (let i = 0; i < 12 * 12; i++) {
        const currentNoteNumber = scaleService.getNextNoteNumber()
        allGridElements.push(
            {
                name: `${getNoteKeyFromNoteNumber(currentNoteNumber)}`,
                midiState: {
                    noteNumber: currentNoteNumber,
                    velocity: { floor: 64, ceiling: 127, isVertical: true, },
                },
                colorState: {
                    pressedColor: colorPreset.pressedColor,
                    unpressedColor: colorPreset.unpressedColor,
                },
                isLocked: false,
            });
    }
    return allGridElements;
}


export const defaultPreset1: GridState = rescaleGridElements({
    columnCount: 4,
    rowCount: 4,
    startingNoteNumber: 60, //C5
    scale: Scale.Chromatic,
    gridElements: createGridElements(Scale.Chromatic, DEFAULT),
});

export const defaultPreset2: GridState = rescaleGridElements({
    columnCount: 5,
    rowCount: 5,
    startingNoteNumber: 48, //C4
    scale: Scale.Ionian,
    gridElements: createGridElements(Scale.Ionian, FROST),
});

export const defaultPreset3: GridState = rescaleGridElements({
    columnCount: 6,
    rowCount: 6,
    startingNoteNumber: 36, //C3
    scale: Scale.Dorian,
    gridElements: createGridElements(Scale.Dorian, GRAPE),
});

export const defaultPreset4: GridState = rescaleGridElements({
    columnCount: 7,
    rowCount: 7,
    startingNoteNumber: 24, //C2
    scale: Scale.Phrygian,
    gridElements: createGridElements(Scale.Phrygian, SLIME),
});

export const defaultPreset5: GridState = rescaleGridElements({
    columnCount: 2,
    rowCount: 2,
    startingNoteNumber: 36, //C3
    scale: Scale.Mixolydian,
    gridElements: createGridElements(Scale.Mixolydian, LAVA),
});

export const defaultPreset6: GridState = rescaleGridElements({
    columnCount: 3,
    rowCount: 3,
    startingNoteNumber: 60, //C5
    scale: Scale.Aeolian,
    gridElements: createGridElements(Scale.Aeolian, HULK),
});



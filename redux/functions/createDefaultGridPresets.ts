import { ColorPreset, DEFAULT, FROST, GRAPE, HULK, LAVA, SLIME } from "../../constants/Colors";
import { getNoteKeyFromNoteNumber } from "../../constants/MIDI_Notes";
import { Scale } from "../../services/ScaleService";
import { ScaleService } from "../../services/ScaleService";
import { GridElementState } from "../interfaces/GridElement/GridElementState";
import { GridPresetsState } from "../interfaces/GridPresetsState";
import { GridState } from "../interfaces/GridState";

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


export const defaultPreset1: GridState = {
    startingNoteNumber: 60, //C5
    columnCount: 4,
    rowCount: 4,
    gridElements: createGridElements(Scale.Chromatic, DEFAULT),
};

export const defaultPreset2: GridState = {
    startingNoteNumber: 60, //C5
    columnCount: 5,
    rowCount: 5,
    gridElements: createGridElements(Scale.Ionian, FROST),
};

export const defaultPreset3: GridState = {
    startingNoteNumber: 60, //C5
    columnCount: 6,
    rowCount: 6,
    gridElements: createGridElements(Scale.Dorian, GRAPE),
};

export const defaultPreset4: GridState = {
    startingNoteNumber: 60, //C5
    columnCount: 7,
    rowCount: 7,
    gridElements: createGridElements(Scale.Phrygian, SLIME),
};

export const defaultPreset5: GridState = {
    startingNoteNumber: 60, //C5
    columnCount: 2,
    rowCount: 2,
    gridElements: createGridElements(Scale.Mixolydian, LAVA),
};

export const defaultPreset6: GridState = {
    startingNoteNumber: 60, //C5
    columnCount: 3,
    rowCount: 3,
    gridElements: createGridElements(Scale.Aeolian, HULK),
};



import { Scale } from "../constants/Scales";

export const DEFAULT_NOTE_NUMBER = 60;// Default C5

const CHROMATIC_SCALE_STEPS = [1]; // Needed as a default outside of the map

const SCALE_STEP_MAP = new Map<Scale, number[]>();
SCALE_STEP_MAP.set(Scale.Chromatic, CHROMATIC_SCALE_STEPS);
SCALE_STEP_MAP.set(Scale.Ionian, [2, 2, 1, 2, 2, 2, 1]);
SCALE_STEP_MAP.set(Scale.Dorian, [2, 1, 2, 2, 2, 1, 2]);
SCALE_STEP_MAP.set(Scale.Phrygian, [1, 2, 2, 2, 1, 2, 2]);
SCALE_STEP_MAP.set(Scale.Lydian, [2, 2, 2, 1, 2, 2, 1]);
SCALE_STEP_MAP.set(Scale.Mixolydian, [2, 2, 1, 2, 2, 1, 2]);
SCALE_STEP_MAP.set(Scale.Aeolian, [2, 1, 2, 2, 1, 2, 2]);
SCALE_STEP_MAP.set(Scale.Locrian, [1, 2, 2, 1, 2, 2, 2]);


const MAX_MIDI_NOTE_NUMBER = 120;

export class ScaleService {
    private currentNoteCycle: number[];
    private originalNoteCycle: number[];
    private currentNoteNumber: number;
    private bassNote: number;

    constructor() {
        this.currentNoteCycle = CHROMATIC_SCALE_STEPS;
        this.originalNoteCycle = CHROMATIC_SCALE_STEPS;
        this.currentNoteNumber = DEFAULT_NOTE_NUMBER;
        this.bassNote = DEFAULT_NOTE_NUMBER;
    };

    public getNextNoteNumber(): number { // TODO: Figure out how to modulus this so that note numbers don't go past the ceiling
        const currentStep = this.currentNoteCycle.shift() ?? 1;
        this.currentNoteCycle.push(currentStep);

        const noteBeforeBoost = this.currentNoteNumber;
        this.currentNoteNumber += currentStep;

        // Loop back to the bass notes if the autoscaling goes too high
        if (this.currentNoteNumber > MAX_MIDI_NOTE_NUMBER) {
            this.currentNoteNumber = this.bassNote;
            this.currentNoteCycle = this.originalNoteCycle;
        }

        return noteBeforeBoost;
    }

    public setScale(scale: Scale): void {
        // To reset scale cycle, the user shall pass in the current scale
        // Clone the array so that the original step patterns are note disturbed
        this.currentNoteCycle = [...(SCALE_STEP_MAP.get(scale) ?? CHROMATIC_SCALE_STEPS)];
        this.originalNoteCycle = [...(SCALE_STEP_MAP.get(scale) ?? CHROMATIC_SCALE_STEPS)];
    }

    public setStartingNoteNumber(noteNumber: number): void {
        this.currentNoteNumber = noteNumber;
        this.bassNote = noteNumber % 12;
    }

}

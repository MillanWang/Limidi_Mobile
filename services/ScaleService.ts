
export enum Scale {
    Chromatic = "Chromatic",
    Ionian = "Ionian (Major)",
    Dorian = "Dorian",
    Phrygian = "Phrygian",
    Lydian = "Lydian",
    Mixolydian = "Mixolydian",
    Aeolian = "Aeolian (Minor)",
    Locrian = "Locrian"
}

export const DEFAULT_NOTE_NUMBER = 60;// Default C5
const CHROMATIC_SCALE_STEPS = [1];

const SCALE_STEP_MAP = new Map<Scale, number[]>();
SCALE_STEP_MAP.set(Scale.Chromatic, CHROMATIC_SCALE_STEPS);
SCALE_STEP_MAP.set(Scale.Ionian, [2, 2, 1, 2, 2, 2, 1]);
SCALE_STEP_MAP.set(Scale.Dorian, [2, 1, 2, 2, 2, 1, 2]);
SCALE_STEP_MAP.set(Scale.Phrygian, [1, 2, 2, 2, 1, 2, 2]);
SCALE_STEP_MAP.set(Scale.Lydian, [2, 2, 2, 1, 2, 2, 1]);
SCALE_STEP_MAP.set(Scale.Mixolydian, [2, 2, 1, 2, 2, 1, 2]);
SCALE_STEP_MAP.set(Scale.Aeolian, [2, 1, 2, 2, 1, 2, 2]);
SCALE_STEP_MAP.set(Scale.Locrian, [1, 2, 2, 1, 2, 2, 2]);

export class ScaleService {

    private currentNoteCycle: number[];
    private currentNoteNumber: number;

    constructor() {
        this.currentNoteCycle = CHROMATIC_SCALE_STEPS;
        this.currentNoteNumber = DEFAULT_NOTE_NUMBER;
    };

    public getNextNoteNumber(): number {
        const currentStep = this.currentNoteCycle.shift() ?? 1;
        this.currentNoteCycle.push(currentStep);

        const noteBeforeBoost = this.currentNoteNumber;
        this.currentNoteNumber += currentStep;

        return noteBeforeBoost;
    }

    public setScale(scale: Scale): void {
        // To reset scale cycle, the user shall pass in the current scale
        // Clone the array so that the original step patterns are note disturbed
        this.currentNoteCycle = [...(SCALE_STEP_MAP.get(scale) ?? CHROMATIC_SCALE_STEPS)];
    }

    public setCurrentNoteNumber(noteNumber: number): void {
        this.currentNoteNumber = noteNumber;
    }

}

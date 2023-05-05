export enum NOTE {
    C = "C",
    Db = "C# / Db",
    D = "D",
    Eb = "D# / Eb",
    E = "E",
    F = "F",
    Gb = "F# / Gb",
    G = "G",
    Ab = "G# / Ab",
    A = "A",
    Bb = "A# / Bb",
    B = "B"
}

export function getNoteKeyFromNoteNumber(noteNumber: number): string {
    return `${Object.keys(NOTE)[noteNumber % 12]}${Math.floor(noteNumber / 12)}`;
}

export interface MidiMessageProps {
    noteNumber: number, // 0-120
    velocity: number, // 0-127
    isNoteOn: boolean
}

export function createMidiMessage(noteNumber: number, velocity: number, isNoteOn: boolean): MidiMessageProps {
    return {
        noteNumber: noteNumber,
        velocity: velocity,
        isNoteOn: isNoteOn,
    };
} //TODO : Backend shall expect notenumber instead of separate note and octave. 
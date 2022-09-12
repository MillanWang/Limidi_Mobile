export enum NOTE {
    C = "C",
    Db = "Db/C#",
    D = "D",
    Eb = "Eb/D#",
    E = "E",
    F = "F",
    Gb = "Gb/F#",
    G = "G",
    Ab = "Ab/G#",
    A = "A",
    Bb = "Bb/A#",
    B = "B"
}

export function getNoteKeyFromNoteNumber(noteNumber: number): string {
    return `${Object.keys(NOTE)[noteNumber % 12]}${Math.floor(noteNumber / 12)}`;
}

export interface MidiMessageProps {
    note: string,
    octave: number, // 0-10
    velocity: number, // 0-127
    isNoteOn: boolean
}

export function createMidiMessage(noteNumber: number, octave: number, velocity: number, isNoteOn: boolean): MidiMessageProps {
    return {
        note: Object.keys(NOTE)[noteNumber],
        octave: octave,
        velocity: velocity,
        isNoteOn: isNoteOn,
    };
}
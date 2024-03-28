export enum NOTE {
  C = "C",
  Db = "Db",
  D = "D",
  Eb = "Eb",
  E = "E",
  F = "F",
  Gb = "Gb",
  G = "G",
  Ab = "Ab",
  A = "A",
  Bb = "Bb",
  B = "B",
}

export function getNoteKeyFromNoteNumber(noteNumber: number): string {
  return `${Object.keys(NOTE)[noteNumber % 12]}${Math.floor(noteNumber / 12)}`;
}

export interface MidiNoteProps {
  noteNumber: number; // 0-120
  velocity: number; // 0-127
  isNoteOn: boolean;
}

export function createMidiNote(
  noteNumber: number,
  velocity: number,
  isNoteOn: boolean
): MidiNoteProps {
  return {
    noteNumber: noteNumber,
    velocity: velocity,
    isNoteOn: isNoteOn,
  };
}

export interface MidiControlChangeProps {
  controlIndex: number; // 0-127
  level: number; // 0-127
}

export function createMidiControlChange(
  controlIndex: number,
  level: number
): MidiControlChangeProps {
  return {
    controlIndex: controlIndex,
    level: Math.max(0, Math.min(127, level)),
  };
}

export interface GridElementMidiNoteState {
    noteNumber: number,
    velocity: {
        floor: number,
        ceiling: number,
        isVertical: boolean,
    },
}
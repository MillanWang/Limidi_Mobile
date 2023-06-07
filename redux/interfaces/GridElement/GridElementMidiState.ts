export interface GridElementMidiState {
    noteNumber: number,
    velocity: {
        floor: number,
        ceiling: number,
        isVertical: boolean,
    },
}
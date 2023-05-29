import { GridElementColorState } from "./GridElementColorState";
import { GridElementMidiState } from "./GridElementMidiState";

export interface GridElementState {
    name: string,
    midiState: GridElementMidiState,
    colorState: GridElementColorState,
    isLocked: boolean,
}
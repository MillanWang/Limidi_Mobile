import { GridElementColorState } from "./GridElementColorState";
import { GridElementMidiControlState } from "./GridElementMidiControlChangeState";
import { GridElementMidiNoteState } from "./GridElementMidiNoteState";

export interface GridElementState {
  name: string;

  midiNoteState: GridElementMidiNoteState;
  controlChangeState: GridElementMidiControlState;
  colorState: GridElementColorState;

  isMidiNote: boolean;
  isLocked: boolean;
}

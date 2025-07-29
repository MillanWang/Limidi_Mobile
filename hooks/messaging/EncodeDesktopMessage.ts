import { Buffer } from "buffer";
import { WrapperMessage, MidiNote, ControlChange } from "./proto_bundle";
import type {
  MidiControlChangeProps,
  MidiNoteProps,
} from "../../constants/MIDI_Notes";

global.Buffer = Buffer;

export const encodeMidiNote = ({
  noteNumber,
  velocity,
  isNoteOn,
}: MidiNoteProps) => {
  const midiNote = MidiNote.create({
    noteNumber,
    velocity,
    isNoteOn,
  });

  const wrapper = WrapperMessage.create({ midiNote });
  return WrapperMessage.encode(wrapper).finish();
};

export const encodeControlChange = ({
  controlIndex,
  level,
}: MidiControlChangeProps) => {
  const controlChange = ControlChange.create({
    controlIndex,
    level,
  });

  const wrapper = WrapperMessage.create({ controlChange });
  return WrapperMessage.encode(wrapper).finish();
};

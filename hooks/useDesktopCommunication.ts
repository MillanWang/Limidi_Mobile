import { MidiControlChangeProps, MidiNoteProps } from "../constants/MIDI_Notes";
import {
  encodeControlChange,
  encodeMidiNote,
} from "./messaging/EncodeDesktopMessage";
import { useWebSocketContext } from "./useWebSocketContext";

export function useDesktopCommunication() {
  const { sendMessage } = useWebSocketContext();

  async function sendMidiNote(props: MidiNoteProps) {
    const encoded = encodeMidiNote(props);
    sendMessage(encoded);
  }

  async function sendMidiControlChange(props: MidiControlChangeProps) {
    if (props.controlIndex < 0) return;
    const encoded = encodeControlChange(props);
    sendMessage(encoded);
  }

  return {
    sendMidiNote,
    sendMidiControlChange,
  };
}

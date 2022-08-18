import { MidiMessageProps } from '../constants/MIDI_Notes';
import { DesktopAppCommunicationsProps } from '../constants/Communications';

//Some 2 tier functional programming shall need to be done here TODO 

export const sendMidiMessage = async (desktopAppCommunicationsProps: DesktopAppCommunicationsProps, midiMessageProps: MidiMessageProps) => {
    const { ip, port } = desktopAppCommunicationsProps;
    const { note, octave, velocity, isNoteOn } = midiMessageProps;
    fetch(`http://${ip}:${port}/MIDI_Input/?note=${note}&octave=${octave}&velocity=${velocity}&isNoteOn=${isNoteOn}`);
    return;
};
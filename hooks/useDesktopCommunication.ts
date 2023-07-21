import { MidiControlChangeProps, MidiNoteProps } from '../constants/MIDI_Notes';
import { useAppSelector } from '../redux/hooks';

export function useDesktopCommunication() {

    const httpCommunicationInfo = useAppSelector(state => state.httpCommunicationsReducer.httpCommunicationInfo);

    async function sendMidiNote(midiNoteProps: MidiNoteProps) {
        const { noteNumber, velocity, isNoteOn } = midiNoteProps;
        fetch(`http://${httpCommunicationInfo.ip}:${httpCommunicationInfo.port}/MidiNote/?noteNumber=${noteNumber}&velocity=${velocity}&isNoteOn=${isNoteOn}`,
            {
                method: 'GET',
            }
        ).then((response) => {
            if (!response.ok) {
                console.log(`${Date.now()} ${response.status} MIDI note fault`);
            }
        });
    }

    async function sendMidiControlChange(midiControlChangeProps: MidiControlChangeProps) {
        const { controlIndex, level } = midiControlChangeProps;
        if (controlIndex < 0) return;
        fetch(`http://${httpCommunicationInfo.ip}:${httpCommunicationInfo.port}/MidiControlChange/?controlIndex=${controlIndex}&level=${level}`,
            {
                method: 'GET',
            }
        ).then((response) => {
            if (!response.ok) {
                console.log(`${Date.now()} ${response.status} MIDI control change fault`);
            }
        });
    }

    // FUNCTION SKELETONS - TODO WHEN DESKTOP UPDATE IS IN
    async function getMidiOutputDevices(): Promise<string[]> { return ['TODO', 'Index in returned array is the device ID']; }


    return {
        sendMidiNote: sendMidiNote,
        sendMidiControlChange: sendMidiControlChange,
        getMidiOutputDevices: getMidiOutputDevices,
    };
}
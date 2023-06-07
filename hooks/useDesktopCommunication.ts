import { MidiMessageProps } from '../constants/MIDI_Notes';
import { useAppSelector } from '../redux/hooks';

export function useDesktopCommunication() {

    const httpCommunicationInfo = useAppSelector(state => state.httpCommunicationsReducer.httpCommunicationInfo);

    async function sendMidiMessage(midiMessageProps: MidiMessageProps) {
        const { noteNumber, velocity, isNoteOn } = midiMessageProps;
        fetch(`http://${httpCommunicationInfo.ip}:${httpCommunicationInfo.port}/MidiInput/?noteNumber=${noteNumber}&velocity=${velocity}&isNoteOn=${isNoteOn}`,
            {
                method: 'GET',
            }
        ).then((response) => {
            if (!response.ok) {
                console.log(`${Date.now()} ${response.status} MIDI Input fault`);
            }
        });
    }

    // FUNCTION SKELETONS - TODO WHEN DESKTOP UPDATE IS IN
    async function getMidiOutputDevices(): Promise<string[]> { return ['TODO', 'Index in returned array is the device ID']; }


    return [
        sendMidiMessage,
        getMidiOutputDevices,
    ];
}
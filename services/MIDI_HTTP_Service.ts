import { MidiMessageProps } from '../constants/MIDI_Notes';

export interface HttpCommunicationInfo {
    ip: string;
    port: string;
    midiDeviceID: string;
}

export class MIDI_HTTP_Service {

    static async sendMidiMessage(httpCommunicationInfo: HttpCommunicationInfo, midiMessageProps: MidiMessageProps): Promise<void> {
        const { note, octave, velocity, isNoteOn } = midiMessageProps;

        fetch(`http://${httpCommunicationInfo.ip}:${httpCommunicationInfo.port}/MIDI_Input/?note=${note}&octave=${octave}&velocity=${velocity}&isNoteOn=${isNoteOn}`,
            {
                method: 'GET',
            }
        ).then((response) => {
            if (!response.ok) {
                console.log(`${Date.now()} MIDI Input fault`);
                console.log(response.text());
                console.log(response.status);
            }
        });
    }

    // FUNCTION SKELETONS - TODO WHEN DESKTOP UPDATE IS IN
    async getMidiOutputDevices(): Promise<string[]> { return ['TODO', 'Index in returned array is the device ID']; }
};
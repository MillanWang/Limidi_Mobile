import { MidiMessageProps } from '../constants/MIDI_Notes';

export class MIDI_HTTP_Service {
    private ip: string;
    private port: string;
    private midiDeviceID: string = '2';


    constructor(ip?: string, port?: string) {
        this.ip = ip ?? '';
        this.port = port ?? '';
    };

    getIP(): string { return this.ip; };
    setIP(ip: string): void { this.ip = ip; }

    getPort(): string { return this.port; };
    setPort(port: string): void { this.port = port; }

    async sendMidiMessage(midiMessageProps: MidiMessageProps): Promise<void> {
        const {
            note,
            octave,
            velocity,
            isNoteOn
        } = midiMessageProps;
        fetch(`http://${this.ip}:${this.port}/MIDI_Input/?note=${note}&octave=${octave}&velocity=${velocity}&isNoteOn=${isNoteOn}`,
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
    async setMidiDeviceID(id: string): Promise<void> {
        this.midiDeviceID = id;
        console.log(this.midiDeviceID);
    }
};
import { MidiMessageProps } from '../constants/MIDI_Notes';

export class MIDI_HTTP_Service {
    private ip: string;
    private port: string;

    constructor(ip: string, port: string) {
        this.ip = ip;
        this.port = port;
    }

    setIP(ip: string) {
        this.ip = ip;
    }

    setPort(port: string) {
        this.port = port;
    }

    async sendMidiMessage(midiMessageProps: MidiMessageProps) {
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
            if (!response.ok) { console.log(`${Date.now()} MIDI Input fault`); }
        });
    }
};
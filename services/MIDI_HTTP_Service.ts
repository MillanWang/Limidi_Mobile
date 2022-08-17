
export const enum NOTE {
    C = "C",
    Db = "Db",
    D = "D",
    Eb = "Eb",
    E = "E",
    F = "F",
    Gb = "Gb",
    G = "G",
    Ab = "Ab",
    A = "A",
    Bb = "Bb",
    B = "B"
}

export interface MidiMessageProps {
    note: NOTE,
    octave: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    velocity: number // 0-127,
    isNoteOn: boolean
}

export interface DesktopAppCommunicationsProps {
    ip: string,
    port: string
}

export const sendMidiMessage = async (desktopAppCommunicationsProps: DesktopAppCommunicationsProps, midiMessageProps: MidiMessageProps) => {
    const { ip, port } = desktopAppCommunicationsProps;
    const { note, octave, velocity, isNoteOn } = midiMessageProps;
    fetch(`http://${ip}:${port}/MIDI_Input/?note=${note}&octave=${octave}&velocity=${velocity}&isNoteOn=${isNoteOn}`);
    return;
};
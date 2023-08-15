import { useState } from "react";
import { MidiControlChangeProps, MidiNoteProps } from "../constants/MIDI_Notes";
import { useAppSelector } from "../redux/hooks";

export function useDesktopCommunication() {
    const httpCommunicationInfo = useAppSelector(
        (state) => state.httpCommunicationsReducer.httpCommunicationInfo
    );

    async function sendMidiNote(midiNoteProps: MidiNoteProps) {
        const { noteNumber, velocity, isNoteOn } = midiNoteProps;
        fetch(
            `http://${httpCommunicationInfo.ip}:${httpCommunicationInfo.port}/MidiNote/?noteNumber=${noteNumber}&velocity=${velocity}&isNoteOn=${isNoteOn}`,
            {
                method: "GET",
            }
        ).then((response) => {
            if (!response.ok) {
                console.log(`${Date.now()} ${response.status} MIDI note fault`);
            }
        });
    }

    const MINIMUM_CC_INTERVAL_DELAY = 300;
    const [previousCcTime, setPreviousCcTime] = useState(0);
    async function sendMidiControlChange(
        midiControlChangeProps: MidiControlChangeProps
    ) {
        const { controlIndex, level } = midiControlChangeProps;
        return;
        if (controlIndex < 0) return;
        if (Date.now() - previousCcTime < MINIMUM_CC_INTERVAL_DELAY) return;
        setPreviousCcTime(Date.now());
        console.log(previousCcTime);
        fetch(
            `http://${httpCommunicationInfo.ip}:${httpCommunicationInfo.port}/MidiControlChange/?controlIndex=${controlIndex}&level=${level}`,
            {
                method: "GET",
            }
        ).then((response) => {
            if (!response.ok) {
                console.log(
                    `${Date.now()} ${response.status} MIDI control change fault`
                );
            }
        });
    }

    // FUNCTION SKELETONS - TODO WHEN DESKTOP UPDATE IS IN
    async function getMidiOutputDevices(): Promise<string[]> {
        return ["TODO", "Index in returned array is the device ID"];
    }

    return {
        sendMidiNote,
        sendMidiControlChange,
        getMidiOutputDevices,
    };
}

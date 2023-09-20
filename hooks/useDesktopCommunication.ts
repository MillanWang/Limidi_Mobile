import { useState } from "react";
import { MidiControlChangeProps, MidiNoteProps } from "../constants/MIDI_Notes";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setMostRecentNetworkFailTime } from "../redux/slices/HttpCommunicationsSlice";

// TODO - Gotta make a means to put a time limit on the fetches because they be taking tooo long.
// Perhaps a heartbeat ping system would also be nice to ensure that the connection is alive and well thorughout

export function useDesktopCommunication() {
    const {
        httpCommunicationInfo: { baseAddress },
        mostRecentNetworkFailTime,
        mostRecentNetworkFixTime,
    } = useAppSelector((state) => state.httpCommunicationsReducer);

    const dispatch = useAppDispatch();

    async function sendHeartbeatMessage() {
        return fetch(`http://${baseAddress}/TODO_HEARTBEAT-ENDPOINT`, { method: "GET" });
    }
    async function sendMidiNote({ noteNumber, velocity, isNoteOn }: MidiNoteProps) {
        fetch(`http://${baseAddress}/MidiNote/?noteNumber=${noteNumber}&velocity=${velocity}&isNoteOn=${isNoteOn}`, {
            method: "GET",
        })
            .then(responseHandler)
            .catch(fetchErrorCatcher);
    }

    const MINIMUM_CC_INTERVAL_DELAY = 100;
    const [previousCcTime, setPreviousCcTime] = useState(0);
    async function sendMidiControlChange({ controlIndex, level }: MidiControlChangeProps) {
        if (controlIndex < 0) return;
        if (Date.now() - previousCcTime < MINIMUM_CC_INTERVAL_DELAY) return;
        setPreviousCcTime(Date.now());
        fetch(`http://${baseAddress}/MidiControlChange/?controlIndex=${controlIndex}&level=${level}`, {
            method: "GET",
        })
            .then(responseHandler)
            .catch(fetchErrorCatcher);
    }

    const responseHandler = (response: Response) => {
        if (!response.ok) {
            console.log(`${Date.now()} ${response.status} MIDI API fault`);
        }
    };

    const MINIMUM_NETWORK_FAIL_INTERVAL_DELAY = 1000 * 10; // 10 seconds
    const fetchErrorCatcher = (error: any) => {
        console.log(`${Date.now()} ${error} MIDI API fault`);

        const isNetworkError = `${error}`.includes("TypeError: Network request failed");
        const isErrorNew = Date.now() - mostRecentNetworkFixTime > MINIMUM_NETWORK_FAIL_INTERVAL_DELAY;

        if (isNetworkError && isErrorNew) {
            console.log("dispatch(setHasRecentNetworkFail(Date.now()));");
            dispatch(setMostRecentNetworkFailTime({ mostRecentNetworkFailTime: Date.now() }));
        }
    };

    return {
        sendHeartbeatMessage,
        sendMidiNote,
        sendMidiControlChange,
    };
}

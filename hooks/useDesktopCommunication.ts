import { useState } from "react";
import { MidiControlChangeProps, MidiNoteProps } from "../constants/MIDI_Notes";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setMostRecentNetworkFailTime,
  setMostRecentNetworkFixTime,
} from "../redux/slices/HttpCommunicationsSlice";

const LOG_MESSAGES = false;

export function useDesktopCommunication() {
  const {
    httpCommunicationInfo: { baseAddress },
    mostRecentNetworkFailTime,
    mostRecentNetworkFixTime,
  } = useAppSelector((state) => state.httpCommunicationsReducer);

  const dispatch = useAppDispatch();

  async function sendHeartbeatMessage() {
    if (LOG_MESSAGES) console.log(`Heartbeat started at ${Date.now()}`);
    fetchWithTimeout(`http://${baseAddress}/Heartbeat`)
      .then((response: any) => {
        if (response.ok) {
          if (LOG_MESSAGES) console.log(`Heartbeat verified at ${Date.now()}`);
          dispatch(
            setMostRecentNetworkFixTime({
              mostRecentNetworkFixTime: Date.now(),
            })
          );
        }
      })
      .catch(fetchErrorCatcher);
  }

  async function sendMidiNote({
    noteNumber,
    velocity,
    isNoteOn,
  }: MidiNoteProps) {
    fetchWithTimeout(
      `http://${baseAddress}/MidiNote/?noteNumber=${noteNumber}&velocity=${velocity}&isNoteOn=${isNoteOn}`
    )
      .then(responseHandler)
      .catch(fetchErrorCatcher);
  }

  async function sendMidiControlChange({
    controlIndex,
    level,
  }: MidiControlChangeProps) {
    if (controlIndex < 0) return;
    fetchWithTimeout(
      `http://${baseAddress}/ControlChangeInput/?controlIndex=${controlIndex}&level=${level}`
    )
      .then(responseHandler)
      .catch(fetchErrorCatcher);
  }

  const MINIMUM_NETWORK_FAIL_INTERVAL_DELAY = 1000 * 5;
  const responseHandler = (response: any) => {
    if (!response.ok) {
      if (LOG_MESSAGES)
        console.log(`${Date.now()} ${response.status} MIDI API fault`);
    }
  };

  const fetchErrorCatcher = (error: any) => {
    if (LOG_MESSAGES) console.log(`${Date.now()} ${error} API fault`);
    const now = Date.now();
    const isErrorNew =
      now - mostRecentNetworkFixTime > MINIMUM_NETWORK_FAIL_INTERVAL_DELAY;

    if (isErrorNew) {
      dispatch(
        setMostRecentNetworkFailTime({ mostRecentNetworkFailTime: now })
      );
    }
  };

  const fetchWithTimeout = async (url: string, timeout = 2000) => {
    return Promise.race([
      fetch(url, { method: "GET" }),
      new Promise((_, reject) =>
        setTimeout(() => {
          reject(new Error("timeout"));
        }, timeout)
      ),
    ]);
  };

  return {
    sendHeartbeatMessage,
    sendMidiNote,
    sendMidiControlChange,
  };
}

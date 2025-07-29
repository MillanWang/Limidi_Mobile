import { useCallback, useEffect, useRef, useState } from "react";
import { MidiControlChangeProps, MidiNoteProps } from "../constants/MIDI_Notes";
import { useAppSelector } from "../redux/hooks";
import {
  encodeControlChange,
  encodeMidiNote,
} from "./messaging/EncodeDesktopMessage";

const LOG_MESSAGES = false;

export function useDesktopCommunication() {
  const { sendMessage } = useWebSocket();

  async function sendHeartbeatMessage() {
    if (LOG_MESSAGES) console.log(`Heartbeat started at ${Date.now()}`);
  }

  async function sendMidiNote(props: MidiNoteProps) {
    const encoded = encodeMidiNote(props);
    sendMessage(encoded);
  }

  async function sendMidiControlChange(props: MidiControlChangeProps) {
    if (props.controlIndex < 0) return;
    const encoded = encodeControlChange(props);
    sendMessage(encoded);
  }

  return {
    sendHeartbeatMessage,
    sendMidiNote,
    sendMidiControlChange,
  };
}

/*
TODO 
- Single instance of websocket to be used throughout. Only one active connection 
- Need a connection refresh system 
*/

enum WebSocketStatus {
  CONNECTING = "connecting",
  OPEN = "open",
  CLOSED = "closed",
  ERROR = "error",
}

export function useWebSocket() {
  const baseAddress = useAppSelector(
    (state) => state.httpCommunicationsReducer.httpCommunicationInfo.baseAddress
  );

  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<WebSocketStatus>(
    WebSocketStatus.CONNECTING
  );

  const url = `ws://${baseAddress}`;

  const sendMessage = useCallback((message: Uint8Array<ArrayBufferLike>) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    } else {
      console.warn("WebSocket not connected. Cannot send message.");
    }
  }, []);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    setStatus(WebSocketStatus.CONNECTING);

    ws.onopen = () => {
      setStatus(WebSocketStatus.OPEN);
      console.log("WebSocket connected:", url);
    };

    ws.onerror = (err) => {
      setStatus(WebSocketStatus.ERROR);
      console.error("WebSocket error:", err);
    };

    ws.onclose = () => {
      setStatus(WebSocketStatus.CLOSED);
      console.log("WebSocket closed");
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return { status, sendMessage };
}

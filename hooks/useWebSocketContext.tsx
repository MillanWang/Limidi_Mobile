import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppSelector } from "../redux/hooks";
import { Page, usePageContext } from "./usePageContext";

const MAX_CONNECTION_ATTEMPTS = 2;

export enum WebSocketStatus {
  Connecting = "Connecting",
  Connected = "Connected",
  Disconnected = "Disconnected",
  Error = "Error",
}

type WebSocketContextType = {
  status: WebSocketStatus;
  sendMessage: (message: Uint8Array<ArrayBufferLike>) => void;
  tryConnection: () => void;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined,
);

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const [connectionAttempts, setConnectionAttempts] = useState(0);

  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<WebSocketStatus>(
    WebSocketStatus.Connecting,
  );
  // Mirrors `status` so the message hot path can check it without
  // triggering a React setState when nothing has changed.
  const statusRef = useRef<WebSocketStatus>(WebSocketStatus.Connecting);
  const updateStatus = useCallback((next: WebSocketStatus) => {
    if (statusRef.current === next) return;
    statusRef.current = next;
    setStatus(next);
  }, []);

  const { navigateTo } = usePageContext();

  const baseAddress = useAppSelector(
    (state) =>
      state.httpCommunicationsReducer.httpCommunicationInfo.baseAddress,
  );
  const url = `ws://${baseAddress}`;

  const connectWebSocket = useCallback(
    (attempt: number) => {
      // Detach handlers on the previous socket before closing so its
      // asynchronous close/error events can't overwrite the new socket's
      // status — this was causing the "disconnected" icon to flash on
      // top of a live connection.
      if (wsRef.current) {
        wsRef.current.onopen = null;
        wsRef.current.onerror = null;
        wsRef.current.onclose = null;
        wsRef.current.close();
      }

      const ws = new WebSocket(url);
      wsRef.current = ws;

      updateStatus(WebSocketStatus.Connecting);

      ws.onopen = () => {
        if (wsRef.current !== ws) return;
        setConnectionAttempts(0);
        updateStatus(WebSocketStatus.Connected);
      };

      ws.onerror = (err) => {
        if (wsRef.current !== ws) return;
        updateStatus(WebSocketStatus.Error);
        if (__DEV__) console.error("WebSocket error:", err);
      };

      ws.onclose = () => {
        if (wsRef.current !== ws) return;
        updateStatus(WebSocketStatus.Disconnected);
      };

      setConnectionAttempts((attempt) => attempt + 1);
      if (attempt >= MAX_CONNECTION_ATTEMPTS) {
        navigateTo(Page.NetworkSettings);
      }
    },
    [url, setConnectionAttempts, updateStatus],
  );

  useEffect(() => {
    connectWebSocket(0);

    return () => {
      if (wsRef.current) {
        wsRef.current.onopen = null;
        wsRef.current.onerror = null;
        wsRef.current.onclose = null;
        wsRef.current.close();
      }
    };
  }, [connectWebSocket]);

  const sendMessage = useCallback(
    (message: Uint8Array<ArrayBufferLike>) => {
      const ws = wsRef.current;
      if (ws?.readyState === WebSocket.OPEN) {
        ws.send(message);
        // Cheap correction: ref compare in the steady-state hot path is
        // free; setState only runs if a stale event left status wrong.
        if (statusRef.current !== WebSocketStatus.Connected) {
          updateStatus(WebSocketStatus.Connected);
        }
      } else if (__DEV__) {
        console.warn("WebSocket not connected. Cannot send message.");
      }
    },
    [updateStatus],
  );

  return (
    <WebSocketContext.Provider
      value={{
        status,
        sendMessage,
        tryConnection: () => connectWebSocket(connectionAttempts),
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocketContext() {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error(
      "useWebSocketContext must be used within a WebSocketProvider",
    );
  }
  return context;
}

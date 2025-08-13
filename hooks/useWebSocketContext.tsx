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
  undefined
);

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const [connectionAttempts, setConnectionAttempts] = useState(0);

  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<WebSocketStatus>(
    WebSocketStatus.Connecting
  );

  const { navigateTo } = usePageContext();

  console.log("status :", status);
  const baseAddress = useAppSelector(
    (state) => state.httpCommunicationsReducer.httpCommunicationInfo.baseAddress
  );
  const url = `ws://${baseAddress}`;

  const connectWebSocket = useCallback(
    (attempt: number) => {
      // Close existing connection if any
      if (wsRef.current) {
        wsRef.current.close();
      }

      const ws = new WebSocket(url);
      wsRef.current = ws;

      setStatus(WebSocketStatus.Connecting);

      ws.onopen = () => {
        setConnectionAttempts(0);
        setStatus(WebSocketStatus.Connected);
        console.log("WebSocket connected:", url);
      };

      ws.onerror = (err) => {
        setStatus(WebSocketStatus.Error);
        console.error("WebSocket error:", err);
      };

      ws.onclose = () => {
        setStatus(WebSocketStatus.Disconnected);
        console.log("WebSocket closed");
      };

      console.log("failedAttempts :", attempt);
      setConnectionAttempts((attempt) => attempt + 1);
      if (attempt >= MAX_CONNECTION_ATTEMPTS) {
        navigateTo(Page.NetworkSettings);
      }
    },
    [url, setConnectionAttempts]
  );
  console.log("url :", url);

  useEffect(() => {
    connectWebSocket(0);

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connectWebSocket]);

  const sendMessage = useCallback((message: Uint8Array<ArrayBufferLike>) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    } else {
      console.warn("WebSocket not connected. Cannot send message.");
    }
  }, []);

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
      "useWebSocketContext must be used within a WebSocketProvider"
    );
  }
  return context;
}

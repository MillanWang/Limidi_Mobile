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

export enum WebSocketStatus {
  CONNECTING = "connecting",
  OPEN = "open",
  CLOSED = "closed",
  ERROR = "error",
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
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<WebSocketStatus>(
    WebSocketStatus.CONNECTING
  );

  console.log("status :", status);
  const baseAddress = useAppSelector(
    (state) => state.httpCommunicationsReducer.httpCommunicationInfo.baseAddress
  );
  const url = `ws://${baseAddress}`;

  const connectWebSocket = useCallback(() => {
    // Close existing connection if any
    if (wsRef.current) {
      wsRef.current.close();
    }

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
  }, [url]);
  console.log("url :", url);

  useEffect(() => {
    connectWebSocket();

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
      value={{ status, sendMessage, tryConnection: connectWebSocket }}
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

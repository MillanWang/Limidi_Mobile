import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import useCachedResources from "./hooks/useCachedResources";
import { PageProvider } from "./hooks/usePageContext";
import { WebSocketProvider } from "./hooks/useWebSocketContext";
import { persistor, store } from "./redux/store";
import GridScreen from "./screens/GridScreen";

export default function App() {
  const isLoadingComplete = useCachedResources();
  AsyncStorage.clear();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <PageProvider>
              <WebSocketProvider>
                <StatusBar />
                <GridScreen />
              </WebSocketProvider>
            </PageProvider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}

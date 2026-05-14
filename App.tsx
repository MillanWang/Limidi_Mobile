import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { FirstLaunchModal } from "./components/FirstLaunchModal";
import useCachedResources from "./hooks/useCachedResources";
import { PageProvider } from "./hooks/usePageContext";
import { WebSocketProvider } from "./hooks/useWebSocketContext";
import { persistor, store } from "./redux/store";
import GridScreen from "./screens/GridScreen";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <PageProvider>
              <WebSocketProvider>
                <StatusBar />
                <GridScreen />
                <FirstLaunchModal />
              </WebSocketProvider>
            </PageProvider>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

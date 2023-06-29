import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store';

import useCachedResources from './hooks/useCachedResources';
import GridScreen from './screens/GridScreen';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>{/* From Redux */}
          <PersistGate persistor={persistor} >
            <StatusBar />
            <GridScreen />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux'
import { store } from './redux/store';

import useCachedResources from './hooks/useCachedResources';
import GridScreen from './screens/GridScreen';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>

        <Provider store={store}>{/* From Redux */}

          <StatusBar />

          <GridScreen />

        </Provider>

      </SafeAreaProvider>
    );
  }
}

import { configureStore } from '@reduxjs/toolkit'
import HttpCommunicationsReducer from './slices/HttpCommunicationsSlice';
import GridPresetsReducer from './slices/GridPresetsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';


const gridPresetsPersistConfig = {
    key: 'gridPresets',
    storage: AsyncStorage,
}
const gridPresetsPersistedReducer = persistReducer(gridPresetsPersistConfig, GridPresetsReducer)


const httpCommunicationsPersistConfig = {
    key: 'gridPresets',
    storage: AsyncStorage,
}
const httpCommunicationsPersistedReducer = persistReducer(httpCommunicationsPersistConfig, HttpCommunicationsReducer)


export const store = configureStore({
    reducer: {
        gridPresetsReducer: gridPresetsPersistedReducer,
        httpCommunicationsReducer: httpCommunicationsPersistedReducer,
    },

    // Include below to avoid the warning about size of store
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
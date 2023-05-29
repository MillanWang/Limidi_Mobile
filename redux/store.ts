import { configureStore } from '@reduxjs/toolkit'

import MidiGridReducer from './slices/MidiSlice';
import ColorServiceReducer from './slices/ColorServiceSlice';
import HttpCommunicationsReducer from './slices/HttpCommunicationsSlice';
import GridPresetsReducer from './slices/GridPresetsSlice';

export const store = configureStore({
    reducer: {
        gridPresetsReducer: GridPresetsReducer,
        midiGridReducer: MidiGridReducer,
        colorServiceReducer: ColorServiceReducer,
        httpCommunicationsReducer: HttpCommunicationsReducer,
    },

    // Include below to avoid the warning about size of store
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: false,
    //     }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
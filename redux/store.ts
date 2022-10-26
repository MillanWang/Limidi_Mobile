import { configureStore } from '@reduxjs/toolkit'

import MidiGridReducer from './slices/MidiSlice';
import ColorServiceReducer from './slices/ColorServiceSlice';
import HttpCommunicationsReducer from './slices/HttpCommunicationsSlice';

export const store = configureStore({
    reducer: {
        midiGridReducer: MidiGridReducer,
        colorServiceReducer: ColorServiceReducer,
        httpCommunicationsReducer: HttpCommunicationsReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
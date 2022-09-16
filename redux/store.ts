import { configureStore } from '@reduxjs/toolkit'

import MidiGridReducer from './slices/MidiSlice';

export const store = configureStore({
    reducer: {
        midiGridReducer: MidiGridReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
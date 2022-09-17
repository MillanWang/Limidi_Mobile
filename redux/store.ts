import { configureStore } from '@reduxjs/toolkit'

import MidiGridReducer from './slices/MidiSlice';
import ColorServiceReducer from './slices/ColorServiceSlice';

export const store = configureStore({
    reducer: {
        midiGridReducer: MidiGridReducer,
        colorServiceReducer: ColorServiceReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

import {
    defaultPreset1,
    defaultPreset2,
    defaultPreset3,
    defaultPreset4,
    defaultPreset5,
    defaultPreset6,
} from '../functions/createDefaultGridPresets';
import { GridPresetsState } from '../interfaces/GridPresetsState';
import { GridState } from '../interfaces/GridState';


const defaultPresets: GridState[] = [
    defaultPreset1,
    defaultPreset2,
    defaultPreset3,
    defaultPreset4,
    defaultPreset5,
    defaultPreset6,
]

const defaultState: GridPresetsState = {
    currentPresetIndex: 0,
    currentGridPreset: defaultPresets[0],
    gridPresets: defaultPresets
}

export const GridPresetsSlice = createSlice({
    name: "GridPresets",
    initialState: defaultState,
    reducers: {
        // Preset operations
        setPresetIndex: (state, action) => {
            const index = action.payload.index;
            state.currentPresetIndex = index;
            state.currentGridPreset = state.gridPresets[index];
        },
        restoreCurrentPresetToDefault: (state, action) => {
            state.gridPresets[state.currentPresetIndex] = defaultPresets[state.currentPresetIndex];
        },

        // Grid operations
        unlockAllGridElements: (state, action) => { },
        setColumnCount: (state, action) => { },
        setRowCount: (state, action) => { },
        // Grid MIDI operations
        setScale: (state, action) => { },
        setStartingNote: (state, action) => { },
        setStartingOctave: (state, action) => { },
        // Grid color operations
        setGridColorPreset: (state, action) => { },


        // Grid element operations
        setGridElementName: (state, action) => { },
        setGridElementIsLocked: (state, action) => { },
        //Grid element MIDI operations
        setGridElementNote: (state, action) => { },
        setGridElementOctave: (state, action) => { },
        setGridElementVelocityCeiling: (state, action) => { },
        setGridElementVelocityFloor: (state, action) => { },
        setGridElementVelocityIsVertical: (state, action) => { },
        // Grid element color operations
        setGridElementUnpressedColor: (state, action) => { },
        setGridElementPressedColor: (state, action) => { },


    }
})

export const {
    // Preset operations
    setPresetIndex,
    restoreCurrentPresetToDefault,


    // Grid operations
    unlockAllGridElements,
    setColumnCount,
    setRowCount,
    // Grid MIDI operations
    setScale,
    setStartingNote,
    setStartingOctave,
    // Grid color operations
    setGridColorPreset,


    // Grid element operations
    setGridElementName,
    setGridElementIsLocked,
    //Grid element MIDI operations
    setGridElementNote,
    setGridElementOctave,
    setGridElementVelocityCeiling,
    setGridElementVelocityFloor,
    setGridElementVelocityIsVertical,
    // Grid element color operations
    setGridElementUnpressedColor,
    setGridElementPressedColor,
} = GridPresetsSlice.actions;

export default GridPresetsSlice.reducer;
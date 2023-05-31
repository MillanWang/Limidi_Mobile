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
import { rescaleGridElements, } from '../functions/rescaleGridElements';
import { DEFAULT } from '../../constants/Colors';
import { ColorPresetService } from '../../services/ColorPresetService';


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
        setColumnCount: (state, action) => {
            const newColumnCount = action.payload;
            state.currentGridPreset.columnCount = newColumnCount;
            state.gridPresets[state.currentPresetIndex].columnCount = newColumnCount;
        },
        setRowCount: (state, action) => {
            const newRowCount = action.payload;
            state.currentGridPreset.rowCount = newRowCount;
            state.gridPresets[state.currentPresetIndex].rowCount = newRowCount;
        },
        // Grid MIDI operations
        setScale: (state, action) => {
            const scale = action.payload;
            const grids = [state.currentGridPreset, state.gridPresets[state.currentPresetIndex]]
            for (let grid of grids) {
                grid.scale = scale;
                rescaleGridElements(grid);
            }
        },
        setStartingNote: (state, action) => {
            const newNoteNumber = action.payload;
            const grids = [state.currentGridPreset, state.gridPresets[state.currentPresetIndex]]

            for (let grid of grids) {
                // Floor divide then multiply To maintain original octave. Add the updated note number   
                grid.startingNoteNumber = Math.floor(grid.startingNoteNumber / 12) * 12 + (newNoteNumber % 12);
                rescaleGridElements(grid);
            }
        },
        setStartingOctave: (state, action) => {
            const newNoteNumber = action.payload;
            const grids = [state.currentGridPreset, state.gridPresets[state.currentPresetIndex]]

            for (let grid of grids) {
                grid.startingNoteNumber = (state.currentGridPreset.startingNoteNumber % 12); //Keep the original note
                grid.startingNoteNumber += newNoteNumber * 12;  // Add the octave offset
                rescaleGridElements(grid);
            }
        },
        // Grid color operations
        setGridColorPresetGlobally: (state, action) => {
            let cps = new ColorPresetService(); // TODO - Deprecate the service in favour of the slice
            //This is not gonna work properly until the slice replaces the service :(
            const { unpressedColor, pressedColor } =
                cps.getColorPreset(action.payload) ??
                { unpressedColor: DEFAULT.unpressedColor, pressedColor: DEFAULT.pressedColor };

            const grids = [state.currentGridPreset, state.gridPresets[state.currentPresetIndex]]
            for (let grid of grids) {
                for (let gridElementStyle of grid.gridElements) {
                    if (!gridElementStyle.isLocked) {
                        gridElementStyle.colorState.unpressedColor = unpressedColor;
                        gridElementStyle.colorState.pressedColor = pressedColor;
                    }
                }
            }
        },


        // Grid element operations
        setGridElementName: (state, action) => {
            const { index, name } = action.payload;
            const grids = [state.currentGridPreset, state.gridPresets[state.currentPresetIndex]]

            for (let grid of grids) {
                grid.gridElements[index].name = name;
            }
        },
        setGridElementIsLocked: (state, action) => {
            const { index, isLocked } = action.payload;
            const grids = [state.currentGridPreset, state.gridPresets[state.currentPresetIndex]]

            for (let grid of grids) {
                grid.gridElements[index].isLocked = isLocked;
            }
        },
        //Grid element MIDI operations
        setGridElementNote: (state, action) => {
            const { index, newNoteNumber } = action.payload;
            const grids = [state.currentGridPreset, state.gridPresets[state.currentPresetIndex]]
            for (let grid of grids) {
                const originalOctaveOffset = Math.floor(grid.gridElements[index].midiState.noteNumber / 12) * 12;
                grid.gridElements[index].midiState.noteNumber = newNoteNumber + originalOctaveOffset;
            }
        },
        setGridElementOctave: (state, action) => {
            const { index, newNoteOctave } = action.payload;
            const grids = [state.currentGridPreset, state.gridPresets[state.currentPresetIndex]]

            for (let grid of grids) {
                grid.gridElements[index].midiState.noteNumber = grid.gridElements[index].midiState.noteNumber % 12; //Keep original note
                grid.gridElements[index].midiState.noteNumber += newNoteOctave * 12; //Add octave offset
            }
        },
        setGridElementVelocityCeiling: (state, action) => {
            const { index, ceiling } = action.payload;
            const grids = [state.currentGridPreset, state.gridPresets[state.currentPresetIndex]]

            for (let grid of grids) {
                grid.gridElements[index].midiState.velocity.ceiling = ceiling;
                if (grid.gridElements[index].midiState.velocity.ceiling < grid.gridElements[index].midiState.velocity.floor) {
                    grid.gridElements[index].midiState.velocity.floor = ceiling;
                }
            }
        },
        setGridElementVelocityFloor: (state, action) => {
            const { index, floor } = action.payload;
            const grids = [state.currentGridPreset, state.gridPresets[state.currentPresetIndex]]

            for (let grid of grids) {
                grid.gridElements[index].midiState.velocity.floor = floor;
                if (grid.gridElements[index].midiState.velocity.floor > grid.gridElements[index].midiState.velocity.ceiling) {
                    grid.gridElements[index].midiState.velocity.ceiling = floor;
                }
            }
        },
        setGridElementVelocityIsVertical: (state, action) => {
            const { index, isVertical } = action.payload;
            const grids = [state.currentGridPreset, state.gridPresets[state.currentPresetIndex]]

            for (let grid of grids) {
                grid.gridElements[index].midiState.velocity.isVertical = isVertical;
            }
        },
        // Grid element color operations
        setGridElementUnpressedColor: (state, action) => {
            const { index, unpressedColor } = action.payload;
            const grids = [state.currentGridPreset, state.gridPresets[state.currentPresetIndex]]

            for (let grid of grids) {
                grid.gridElements[index].colorState.unpressedColor = unpressedColor
            }
        },
        setGridElementPressedColor: (state, action) => {
            const { index, pressedColor } = action.payload;
            const grids = [state.currentGridPreset, state.gridPresets[state.currentPresetIndex]]

            for (let grid of grids) {
                grid.gridElements[index].colorState.pressedColor = pressedColor
            }
        },


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
    setGridColorPresetGlobally,


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
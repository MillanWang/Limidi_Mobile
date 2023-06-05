import { createSlice } from '@reduxjs/toolkit';

/**
 * Better to cut out the custom coloring and instead just make a collection of color presets and themes to choose from
 * Debatable if this slice is even still gonna be needed
 */

const initialState = {};

export const ColorServiceSlice = createSlice({
    name: 'ColorService',
    initialState,
    reducers: {
        //ColorPresetService operations
        createColorPreset: (state, action) => { },
        editColorPresetColors: (state, action) => { },
        editColorPresetName: (state, action) => { },
        deleteColorPreset: (state, action) => { },
    }
});

export const {
    //ColorPresetService operations
    createColorPreset,
    editColorPresetColors,
    editColorPresetName,
    deleteColorPreset,

} = ColorServiceSlice.actions;

export default ColorServiceSlice.reducer;
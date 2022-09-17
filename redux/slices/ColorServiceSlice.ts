import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ColorPreset, DEFAULT, PRESET_COLOR_LIST, } from '../../constants/Colors';
import { ColorPresetService } from '../../services/ColorPresetService';

export interface GridElementColorState {
    // isLocked: boolean, //TODO: Add individual color locking to resist globally applying color presets
    unpressedColor: string,
    pressedColor: string,
}

export interface ColorServiceState {
    // colorPresetService: ColorPresetService,
    colorPresets: ColorPreset[],
    gridElementColors: GridElementColorState[]
};
const initialState: ColorServiceState = {
    colorPresets: initializeColorPresets(),
    gridElementColors: initializeGridElementColors()
};

function initializeColorPresets(): ColorPreset[] {
    const colorPresetService = new ColorPresetService();
    for (let preset of PRESET_COLOR_LIST) {
        colorPresetService.createColorPreset(preset);
    }
    return colorPresetService.getAllColorPresets();
}

function initializeGridElementColors(): GridElementColorState[] {
    const allGridElementColorStates: GridElementColorState[] = [];

    //Colors state made for each possible grid element. 12rows*12columns is the biggest possible grid
    for (let i = 0; i < 12 * 12; i++) {
        allGridElementColorStates.push({
            unpressedColor: DEFAULT.unpressedColor,
            pressedColor: DEFAULT.pressedColor,
        });
    };
    return allGridElementColorStates;
};

export const ColorServiceSlice = createSlice({
    name: 'ColorService',
    initialState,
    reducers: {
        //GridElement color operations
        setGridElementUnpressedColor: (state, action) => {
            const index = action.payload.index;
            state.gridElementColors[index].unpressedColor = action.payload.unpressedColor;
        },
        setGridElementPressedColor: (state, action) => {
            const index = action.payload.index;
            state.gridElementColors[index].pressedColor = action.payload.pressedColor;
        },

        //Global color controls
        applyColorPresetToAllGridElements: (state, action) => { },

        //ColorPresetService operations
        createColorPreset: (state, action) => { },
        editColorPresetColors: (state, action) => { },
        editColorPresetName: (state, action) => { },
        deleteColorPreset: (state, action) => { },
    }
});

export const {
    //GridElement color operations
    setGridElementUnpressedColor,
    setGridElementPressedColor,

    //Global color controls
    applyColorPresetToAllGridElements,

    //ColorPresetService operations
    createColorPreset,
    editColorPresetColors,
    editColorPresetName,
    deleteColorPreset,

} = ColorServiceSlice.actions;

export default ColorServiceSlice.reducer;
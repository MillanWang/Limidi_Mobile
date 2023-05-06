import { createSlice } from '@reduxjs/toolkit';
import { ColorPreset, DEFAULT, PRESET_COLOR_LIST, } from '../../constants/Colors';
import { ColorPresetService } from '../../services/ColorPresetService';

export interface GridElementColorState {
    isLocked: boolean,
    unpressedColor: string,
    pressedColor: string,
}

export interface ColorServiceState {
    // colorPresetService: ColorPresetService, // TODO: Figure out custom colors
    colorPresets: ColorPreset[],
    gridElementStyles: GridElementColorState[]
};
const initialState: ColorServiceState = {
    colorPresets: initializeColorPresets(),
    gridElementStyles: initializeGridElementColors()
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
            isLocked: false,
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
            state.gridElementStyles[index].unpressedColor = action.payload.unpressedColor;
        },
        setGridElementPressedColor: (state, action) => {
            const index = action.payload.index;
            state.gridElementStyles[index].pressedColor = action.payload.pressedColor;
        },
        setGridElementStyleLocked: (state, action) => {
            const index = action.payload.index;
            state.gridElementStyles[index].isLocked = action.payload.locked;
        },


        //Global color controls
        // Overwriting all grid element styles for presets
        setAllGridElementStyles: (state, action) => {
            state.gridElementStyles = action.payload;
        },
        
        applyColorPresetToAllGridElements: (state, action) => {
            let cps = new ColorPresetService(state.colorPresets);
            const { unpressedColor, pressedColor } = cps.getColorPreset(action.payload) ?? { unpressedColor: DEFAULT.unpressedColor, pressedColor: DEFAULT.pressedColor };
            for (let gridElementStyle of state.gridElementStyles) {
                if (!gridElementStyle.isLocked) {
                    gridElementStyle.unpressedColor = unpressedColor;
                    gridElementStyle.pressedColor = pressedColor;
                }
            }
        },

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
    setGridElementStyleLocked,

    //Global color controls
    applyColorPresetToAllGridElements,
    setAllGridElementStyles,

    //ColorPresetService operations
    createColorPreset,
    editColorPresetColors,
    editColorPresetName,
    deleteColorPreset,

} = ColorServiceSlice.actions;

export default ColorServiceSlice.reducer;
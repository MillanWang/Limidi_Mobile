import { createSlice } from "@reduxjs/toolkit";
import {
  defaultPreset1,
  defaultPreset2,
  defaultPreset3,
  defaultPreset4,
  defaultPreset5,
  defaultPreset6,
} from "../functions/createDefaultGridPresets";
import { GridPresetsState } from "../interfaces/GridPresetsState";
import { GridState } from "../interfaces/GridState";
import { rescaleGridElements } from "../functions/rescaleGridElements";
import {
  getNoteKeyFromNoteNumber,
  isNoteLabelStandard,
} from "../../constants/MIDI_Notes";

const defaultPresets: GridState[] = [
  defaultPreset1,
  defaultPreset2,
  defaultPreset3,
  defaultPreset4,
  defaultPreset5,
  defaultPreset6,
];

const defaultState: GridPresetsState = {
  currentPresetIndex: 0,
  currentGridPreset: defaultPresets[0],
  gridPresets: defaultPresets,
};

export const MaxGridDimension = 8;

export const GridPresetsSlice = createSlice({
  name: "GridPresets",
  initialState: defaultState,
  reducers: {
    // Persistence operations
    setGridState: (state, action) => {
      state.currentPresetIndex = action.payload.currentPresetIndex;
      state.currentGridPreset = action.payload.currentGridPreset;
      state.gridPresets = action.payload.gridPresets;
    },

    // Preset operations
    setPresetIndex: (state, action) => {
      const index = action.payload.index;
      state.currentPresetIndex = index;
      state.currentGridPreset = state.gridPresets[index];
    },
    restoreCurrentPresetToDefault: (state, action) => {
      state.gridPresets[state.currentPresetIndex] =
        defaultPresets[state.currentPresetIndex];
      state.currentGridPreset = defaultPresets[state.currentPresetIndex];
    },

    // Grid operations
    unlockAllGridElements: (state, action) => {
      const grids = [
        state.currentGridPreset,
        state.gridPresets[state.currentPresetIndex],
      ];
      for (let grid of grids) {
        for (let elem of grid.gridElements) {
          elem.isLocked = false;
        }
      }
    },
    setColumnCount: (state, action) => {
      const newColumnCount = Math.min(
        Math.max(action.payload, 1),
        MaxGridDimension
      );
      state.currentGridPreset.columnCount = newColumnCount;
      state.gridPresets[state.currentPresetIndex].columnCount = newColumnCount;
    },
    setRowCount: (state, action) => {
      const newRowCount = Math.min(
        Math.max(action.payload, 1),
        MaxGridDimension
      );
      state.currentGridPreset.rowCount = newRowCount;
      state.gridPresets[state.currentPresetIndex].rowCount = newRowCount;
    },
    // Grid MIDI operations
    setScale: (state, action) => {
      const scale = action.payload;
      const grids = [
        state.currentGridPreset,
        state.gridPresets[state.currentPresetIndex],
      ];
      for (let grid of grids) {
        grid.scale = scale;
        rescaleGridElements(grid);
      }
    },
    setStartingNote: (state, action) => {
      const newNoteNumber = action.payload;
      const grids = [
        state.currentGridPreset,
        state.gridPresets[state.currentPresetIndex],
      ];

      for (let grid of grids) {
        // Floor divide then multiply To maintain original octave. Add the updated note number
        grid.startingNoteNumber =
          Math.floor(grid.startingNoteNumber / 12) * 12 + (newNoteNumber % 12);
        rescaleGridElements(grid);
      }
    },
    setStartingOctave: (state, action) => {
      const newNoteNumber = action.payload;
      const grids = [
        state.currentGridPreset,
        state.gridPresets[state.currentPresetIndex],
      ];

      for (let grid of grids) {
        grid.startingNoteNumber =
          state.currentGridPreset.startingNoteNumber % 12; //Keep the original note
        grid.startingNoteNumber += newNoteNumber * 12; // Add the octave offset
        rescaleGridElements(grid);
      }
    },
    // Grid color operations
    setGridColorPresetGlobally: (state, action) => {
      const { unpressedColor, pressedColor } = action.payload;
      const grids = [
        state.currentGridPreset,
        state.gridPresets[state.currentPresetIndex],
      ];

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
      const grids = [
        state.currentGridPreset,
        state.gridPresets[state.currentPresetIndex],
      ];

      for (let grid of grids) {
        grid.gridElements[index].name = name;
      }
    },
    setGridElementIsLocked: (state, action) => {
      const { index, isLocked } = action.payload;
      const grids = [
        state.currentGridPreset,
        state.gridPresets[state.currentPresetIndex],
      ];

      for (let grid of grids) {
        grid.gridElements[index].isLocked = isLocked;
      }
    },
    setGridElementIsMidiNote: (state, action) => {
      const { index, isMidiNote } = action.payload;
      const grids = [
        state.currentGridPreset,
        state.gridPresets[state.currentPresetIndex],
      ];

      for (let grid of grids) {
        grid.gridElements[index].isMidiNote = isMidiNote;
      }
    },
    //Grid element MIDI note operations
    setGridElementNote: (state, action) => {
      const { index, newNoteNumber } = action.payload;
      const grids = [
        state.currentGridPreset,
        state.gridPresets[state.currentPresetIndex],
      ];
      for (let grid of grids) {
        const originalNoteNumber =
          grid.gridElements[index].midiNoteState.noteNumber;

        const originalNoteName = grid.gridElements[index].name;
        const originalOctaveOffset = Math.floor(originalNoteNumber / 12) * 12;
        const finalNoteNumber = newNoteNumber + originalOctaveOffset;

        if (isNoteLabelStandard(originalNoteNumber, originalNoteName)) {
          grid.gridElements[index].name =
            getNoteKeyFromNoteNumber(finalNoteNumber);
        }

        grid.gridElements[index].midiNoteState.noteNumber = finalNoteNumber;
      }
    },
    setGridElementOctave: (state, action) => {
      const { index, newNoteOctave } = action.payload;
      const grids = [
        state.currentGridPreset,
        state.gridPresets[state.currentPresetIndex],
      ];

      for (let grid of grids) {
        const originalNoteNumber =
          grid.gridElements[index].midiNoteState.noteNumber;

        const originalNoteName = grid.gridElements[index].name;

        const newNoteNumber =
          (originalNoteNumber % 12) + //Keep original note
          newNoteOctave * 12; //Add octave offset

        if (isNoteLabelStandard(originalNoteNumber, originalNoteName)) {
          grid.gridElements[index].name =
            getNoteKeyFromNoteNumber(newNoteNumber);
        }

        grid.gridElements[index].midiNoteState.noteNumber = newNoteNumber;
      }
    },
    setGridElementVelocityCeiling: (state, action) => {
      const { index, ceiling } = action.payload;
      const grids = [
        state.currentGridPreset,
        state.gridPresets[state.currentPresetIndex],
      ];

      for (let grid of grids) {
        grid.gridElements[index].midiNoteState.velocity.ceiling = ceiling;
        if (
          grid.gridElements[index].midiNoteState.velocity.ceiling <
          grid.gridElements[index].midiNoteState.velocity.floor
        ) {
          grid.gridElements[index].midiNoteState.velocity.floor = ceiling;
        }
      }
    },
    setGridElementVelocityFloor: (state, action) => {
      const { index, floor } = action.payload;
      const grids = [
        state.currentGridPreset,
        state.gridPresets[state.currentPresetIndex],
      ];

      for (let grid of grids) {
        grid.gridElements[index].midiNoteState.velocity.floor = floor;
        if (
          grid.gridElements[index].midiNoteState.velocity.floor >
          grid.gridElements[index].midiNoteState.velocity.ceiling
        ) {
          grid.gridElements[index].midiNoteState.velocity.ceiling = floor;
        }
      }
    },
    setGridElementVelocityIsVertical: (state, action) => {
      const { index, isVertical } = action.payload;
      const grids = [
        state.currentGridPreset,
        state.gridPresets[state.currentPresetIndex],
      ];

      for (let grid of grids) {
        grid.gridElements[index].midiNoteState.velocity.isVertical = isVertical;
      }
    },
    // Grid element control change operations
    setGridElementControlChangeXIndex: (state, action) => {
      const { index, xAxisControlIndex } = action.payload;
      const grids = [
        state.currentGridPreset,
        state.gridPresets[state.currentPresetIndex],
      ];

      for (let grid of grids) {
        grid.gridElements[index].controlChangeState.xAxisControlIndex =
          xAxisControlIndex;
      }
    },
    setGridElementControlChangeYIndex: (state, action) => {
      const { index, yAxisControlIndex } = action.payload;
      const grids = [
        state.currentGridPreset,
        state.gridPresets[state.currentPresetIndex],
      ];

      for (let grid of grids) {
        grid.gridElements[index].controlChangeState.yAxisControlIndex =
          yAxisControlIndex;
      }
    },
    setGridElementControlChangeIconString: (state, action) => {
      const { index, iconString } = action.payload;
      const grids = [
        state.currentGridPreset,
        state.gridPresets[state.currentPresetIndex],
      ];

      for (let grid of grids) {
        grid.gridElements[index].controlChangeState.iconName = iconString;
      }
    },
    // Grid element color operations
    setGridElementUnpressedColor: (state, action) => {
      const { index, unpressedColor } = action.payload;
      const grids = [
        state.currentGridPreset,
        state.gridPresets[state.currentPresetIndex],
      ];

      for (let grid of grids) {
        grid.gridElements[index].colorState.unpressedColor = unpressedColor;
      }
    },
    setGridElementPressedColor: (state, action) => {
      const { index, pressedColor } = action.payload;
      const grids = [
        state.currentGridPreset,
        state.gridPresets[state.currentPresetIndex],
      ];

      for (let grid of grids) {
        grid.gridElements[index].colorState.pressedColor = pressedColor;
      }
    },
  },
});

export const {
  // Persistence operations
  setGridState,

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
  setGridElementIsMidiNote,
  //Grid element MIDI operations
  setGridElementNote,
  setGridElementOctave,
  setGridElementVelocityCeiling,
  setGridElementVelocityFloor,
  setGridElementVelocityIsVertical,
  // Grid element control change operations
  setGridElementControlChangeXIndex,
  setGridElementControlChangeYIndex,
  setGridElementControlChangeIconString,
  // Grid element color operations
  setGridElementUnpressedColor,
  setGridElementPressedColor,
} = GridPresetsSlice.actions;

export default GridPresetsSlice.reducer;

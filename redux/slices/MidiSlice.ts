import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Scale, ScaleService } from '../../services/ScaleService';
import { getNoteKeyFromNoteNumber } from '../../constants/MIDI_Notes';


export interface MidiGridElementState {
    name: string,
    noteNumber: number,
    velocity: {
        floor: number,
        ceiling: number,
        isVertical: boolean,
    },
    isLocked: boolean,
}

export interface MidiGridState {
    startingNoteNumber: number,
    scale: Scale,
    columnCount: number,
    rowCount: number,
    gridElements: MidiGridElementState[],
};

const initialState: MidiGridState = {
    startingNoteNumber: 60, // Default to C5
    scale: Scale.Chromatic,
    columnCount: 4,
    rowCount: 4,
    gridElements: initializeGridElements(),
}

function initializeGridElements(): MidiGridElementState[] {
    const scaleService = new ScaleService(); // Defaulted to chromatic starting on C5
    const allGridElements: MidiGridElementState[] = [];

    //Make a state for all possible GridElements. 12rows*12Columns is the biggest possible grid
    for (let i = 0; i < 12 * 12; i++) {
        const currentNoteNumber = scaleService.getNextNoteNumber()
        allGridElements.push(
            {
                name: `${getNoteKeyFromNoteNumber(currentNoteNumber)}`,
                noteNumber: currentNoteNumber,
                velocity: { floor: 64, ceiling: 127, isVertical: true, },
                isLocked: false,
            });
    }
    return allGridElements;
}

function rescaleGridElements(scale: Scale, startingNoteNumber: number, gridElements: MidiGridElementState[]): void {
    const scaleService = new ScaleService();
    scaleService.setScale(scale);
    scaleService.setCurrentNoteNumber(startingNoteNumber);

    for (let currentGridElement of gridElements) {
        const currentNoteNumber = scaleService.getNextNoteNumber();
        if (!currentGridElement.isLocked) {
            currentGridElement.name = `${getNoteKeyFromNoteNumber(currentNoteNumber)}`;
            currentGridElement.noteNumber = currentNoteNumber;
        }
    }
}







export const MidiGridSlice = createSlice({
    name: 'Midi',
    initialState,
    reducers: {

        //Grid reducers
        setStartingNoteNumber: (state, action) => {
            // Floor divide then multiply To maintain original octave. Add the updated note number   
            state.startingNoteNumber = Math.floor(state.startingNoteNumber / 12) * 12 + (action.payload % 12);
            rescaleGridElements(state.scale, state.startingNoteNumber, state.gridElements);
        },
        setStartingNoteOctave: (state, action) => {
            state.startingNoteNumber = (state.startingNoteNumber % 12); //Keep the original note
            state.startingNoteNumber += action.payload * 12;  // Add the octave offset
            rescaleGridElements(state.scale, state.startingNoteNumber, state.gridElements);
        },
        setScale: (state, action) => {
            state.scale = action.payload;
            rescaleGridElements(state.scale, state.startingNoteNumber, state.gridElements);
        },
        setColumnCount: (state, action) => {
            state.columnCount = Math.min(Math.max(1, action.payload), 12);
        },
        setRowCount: (state, action) => {
            state.rowCount = Math.min(Math.max(1, action.payload), 12);
        },



        // Individual grid element reducers
        setGridElementName: (state, action) => {
            const index = action.payload.index;
            state.gridElements[index].name = action.payload.name;
        },
        setGridElementNoteNumber: (state, action) => {
            const index = action.payload.index;
            const newNoteNumber = action.payload.newNoteNumber;
            const originalOctaveOffset = Math.floor(state.gridElements[index].noteNumber / 12) * 12;
            state.gridElements[index].noteNumber = newNoteNumber + originalOctaveOffset;
        },
        setGridElementNoteOctave: (state, action) => {
            const index = action.payload.index;
            state.gridElements[index].noteNumber = state.gridElements[index].noteNumber % 12; //Keep original note
            state.gridElements[index].noteNumber += action.payload.newNoteOctave * 12; //Add octave offset
        },
        setGridElementVelocityFloor: (state, action) => {
            const index = action.payload.index;
            state.gridElements[index].velocity.floor = action.payload.floor;
            // Reset the ceiling to match the floor if the floor is set higher than the ceiling
            if (state.gridElements[index].velocity.floor > state.gridElements[index].velocity.ceiling) {
                state.gridElements[index].velocity.ceiling = action.payload.floor;
            }
        },
        setGridElementVelocityCeiling: (state, action) => {
            const index = action.payload.index;
            state.gridElements[index].velocity.ceiling = action.payload.ceiling;
            // Reset the floor to match the ceiling if the ceiling is set lower than the floor
            if (state.gridElements[index].velocity.ceiling < state.gridElements[index].velocity.floor) {
                state.gridElements[index].velocity.floor = action.payload.ceiling;
            }
        },
        setGridElementVelocityIsVertical: (state, action) => {
            const index = action.payload.index;
            state.gridElements[index].velocity.isVertical = action.payload.isVertical;
        },
        setGridElementMidiLocked: (state, action) => {
            const index = action.payload.index;
            state.gridElements[index].isLocked = action.payload.isLocked;
        },
    }
})

// Action creators are generated for each case reducer function
export const {

    // Grid 
    setStartingNoteNumber,
    setStartingNoteOctave,
    setScale,
    setColumnCount,
    setRowCount,

    // Individual grid elements
    setGridElementName,
    setGridElementNoteNumber,
    setGridElementNoteOctave,
    setGridElementVelocityFloor,
    setGridElementVelocityCeiling,
    setGridElementVelocityIsVertical,
    setGridElementMidiLocked,
} = MidiGridSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.midiGridReducer.startingNoteNumber;

export default MidiGridSlice.reducer
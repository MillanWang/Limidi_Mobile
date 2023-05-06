import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    Icon,
    Switch,
} from '@rneui/themed';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import {
    setGridMidiState,
    MidiGridState,
    MidiGridElementState,
} from '../redux/slices/MidiSlice';
import { GridElementColorState, setAllGridElementStyles } from '../redux/slices/ColorServiceSlice';
import { Scale } from '../services/ScaleService';
// 3 hotswapabble preset slots that the user configures in the settings. Settings should store a bunch of them

const initialState: MidiGridState = {
    startingNoteNumber: 30, // Default to C5
    scale: Scale.Chromatic,
    columnCount: 5,
    rowCount: 5,
    gridElements: sampleGridElements(),
}
function sampleGridElements(): MidiGridElementState[] {
    const allGridElements: MidiGridElementState[] = [];

    //Make a state for all possible GridElements. 12rows*12Columns is the biggest possible grid
    for (let i = 0; i < 12 * 12; i++) {
        const currentNoteNumber = 33;//
        allGridElements.push(
            {
                name: `Sample`,
                noteNumber: currentNoteNumber,
                velocity: { floor: 64, ceiling: 127, isVertical: true, },
                isLocked: false,
            });
    }
    return allGridElements;
}

function sampleGridElementColors(): GridElementColorState[] {
    const allGridElementColorStates: GridElementColorState[] = [];

    //Colors state made for each possible grid element. 12rows*12columns is the biggest possible grid
    for (let i = 0; i < 12 * 12; i++) {
        allGridElementColorStates.push({
            unpressedColor: '#000000',
            pressedColor: '#ffffff',
            isLocked: false,
        });
    };
    return allGridElementColorStates;
};

export function GridLayoutButtons() {
    const dispatch = useAppDispatch();
    const [currentPreset, setCurrentPreset] = useState(0);

    const applyPreset = (presetNumber: number) => {
        return () => {
            setCurrentPreset(presetNumber);
            dispatch(setGridMidiState(
                // initialState
                {
                    startingNoteNumber: 30, // Default to C5
                    scale: Scale.Chromatic,
                    columnCount: 2 + presetNumber,
                    rowCount: 2 + presetNumber,
                    gridElements: sampleGridElements()
                }
            ));
            dispatch(setAllGridElementStyles(sampleGridElementColors()));
        }
    }

    return (
        <View style={
            {
                flexDirection: 'row',
                justifyContent: 'flex-end',
                flexGrow: 1,
            }
        }>

            {[ // Mapping of the preset icons. They only exist up to 6, which feels like a reasonable amount of presets
                'one',
                'two',
                '3',
                '4',
                '5',
                '6',
            ].map((s, i) => {
                return (
                    <Icon
                        key={`PresetButtonIcon_${i}`}
                        name={`looks-${s}`}
                        color={currentPreset === i ? '#ffffff' : '#888888'}
                        onPress={applyPreset(i)}
                    />
                );
            })}
        </View>

    );
}
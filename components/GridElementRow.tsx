import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import GridElement from '../components/GridElement';

import { MIDI_HTTP_Service } from '../services/MIDI_HTTP_Service';
import { ColorPresetService } from '../services/ColorPresetService';

import { getNoteKeyFromNoteNumber } from '../constants/MIDI_Notes';


export interface GridElementRowProps {
    isPlayMode: boolean,
    columnCount: number,
    firstNoteNumber: number,
    midiHttpService: MIDI_HTTP_Service,
    colorPresetService: ColorPresetService
}

export function GridElementRow({ isPlayMode, columnCount, firstNoteNumber, midiHttpService, colorPresetService }: GridElementRowProps) {
    let gridElements: JSX.Element[] = [];

    for (let i = 0; i < columnCount; i++) {
        gridElements.push(
            <GridElement
                MIDI_HTTP_Service={midiHttpService}
                colorPresetService={colorPresetService}
                initialName={`${getNoteKeyFromNoteNumber(firstNoteNumber + i)}`}
                initialNoteNumber={firstNoteNumber + i}
                isPlayMode={isPlayMode}
                key={`gridElement_column${i}_row${firstNoteNumber / columnCount}`}
            />
        );
    }

    return (
        <View style={styles.gridElementRow} >
            {gridElements}
        </View>
    );
}

const styles = StyleSheet.create({
    gridElementRow: {
        flex: 1,
        flexDirection: 'row',
    }

});
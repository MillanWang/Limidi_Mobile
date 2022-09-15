import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import GridElement from '../components/GridElement';

import { MIDI_HTTP_Service } from '../services/MIDI_HTTP_Service';
import { ColorPresetService } from '../services/ColorPresetService';

import { getNoteKeyFromNoteNumber } from '../constants/MIDI_Notes';
import { ScaleService } from '../services/ScaleService';


export interface GridElementRowProps {
    isPlayMode: boolean,
    columnCount: number,
    midiHttpService: MIDI_HTTP_Service,
    colorPresetService: ColorPresetService,
    scaleService: ScaleService
}

export function GridElementRow({
    isPlayMode,
    columnCount,
    midiHttpService,
    colorPresetService,
    scaleService
}: GridElementRowProps) {
    let gridElements: JSX.Element[] = [];

    for (let i = 0; i < columnCount; i++) {
        const currentNoteNumber = scaleService.getNextNoteNumber();
        gridElements.push(
            <GridElement
                MIDI_HTTP_Service={midiHttpService}
                colorPresetService={colorPresetService}
                initialName={`${getNoteKeyFromNoteNumber(currentNoteNumber)}`}
                // initialNoteNumber={firstNoteNumber + i}
                initialNoteNumber={currentNoteNumber}
                isPlayMode={isPlayMode}
                key={`gridElement_note${currentNoteNumber}`}
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
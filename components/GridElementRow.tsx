import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import GridElement from '../components/GridElement';

import { MIDI_HTTP_Service } from '../services/MIDI_HTTP_Service';
import { ColorPresetService } from '../services/ColorPresetService';


export interface GridElementRowProps {
    firstNoteNumber: number,
    isPlayMode: boolean,
    columnCount: number,
    midiHttpService: MIDI_HTTP_Service,
    colorPresetService: ColorPresetService,
}

export function GridElementRow({
    firstNoteNumber,
    isPlayMode,
    columnCount,
    midiHttpService,
    colorPresetService,
}: GridElementRowProps) {
    let gridElements: JSX.Element[] = [];

    for (let i = 0; i < columnCount; i++) {
        const currentIndex = i + firstNoteNumber;
        gridElements.push(
            <GridElement
                index={currentIndex}
                MIDI_HTTP_Service={midiHttpService}
                colorPresetService={colorPresetService}
                isPlayMode={isPlayMode}
                key={`gridElement_note${currentIndex}`}
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
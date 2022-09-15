import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import { GridElementRow } from '../components/GridElementRow';

import { MIDI_HTTP_Service } from '../services/MIDI_HTTP_Service';
import { ColorPresetService } from '../services/ColorPresetService';
import { ScaleService } from '../services/ScaleService';



export interface GridElementGridProps {
    isPlayMode: boolean,
    initialNoteNumber: number,
    rowCount: number,
    columnCount: number,
    midiHttpService: MIDI_HTTP_Service,
    colorPresetService: ColorPresetService,
    scaleService: ScaleService
}

export function GridElementGrid({ isPlayMode, initialNoteNumber, rowCount, columnCount, midiHttpService, colorPresetService, scaleService }: GridElementGridProps) {

    // 1x1 smallest, 12x12 biggest. Anything in between is ok
    rowCount = Math.min(Math.max(1, rowCount), 12);
    columnCount = Math.min(Math.max(1, columnCount), 12);

    let gridElementRows: JSX.Element[] = [];

    for (let i = 0; i < rowCount; i++) {
        gridElementRows.push(
            <GridElementRow
                isPlayMode={isPlayMode}
                columnCount={columnCount}
                // firstNoteNumber={initialNoteNumber + i * columnCount}
                midiHttpService={midiHttpService}
                colorPresetService={colorPresetService}
                scaleService={scaleService}
                key={`GridElementRow_${i}`}
            />
        );
    }

    return (
        < View style={styles.gridArea}>
            {gridElementRows.reverse()}
        </View>
    );
}

const styles = StyleSheet.create({
    gridArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 12,
    },
});
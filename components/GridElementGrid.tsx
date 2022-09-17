import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import { GridElementRow } from '../components/GridElementRow';
import { MIDI_HTTP_Service } from '../services/MIDI_HTTP_Service';

import { useAppSelector, useAppDispatch } from '../redux/hooks';

export interface GridElementGridProps {
    isPlayMode: boolean,
    midiHttpService: MIDI_HTTP_Service,
}

export function GridElementGrid({ isPlayMode, midiHttpService, }: GridElementGridProps) {
    const currentGridElementMidiState = useAppSelector(state => state.midiGridReducer);

    let gridElementRows: JSX.Element[] = [];

    for (let i = 0; i < currentGridElementMidiState.rowCount; i++) {
        gridElementRows.push(
            <GridElementRow
                isPlayMode={isPlayMode}
                rowStartingIndex={i * currentGridElementMidiState.columnCount}
                midiHttpService={midiHttpService}
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
import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import GridElement from '../components/GridElement';

import { MIDI_HTTP_Service } from '../services/MIDI_HTTP_Service';
import { useAppSelector } from '../redux/hooks';


export interface GridElementRowProps {
    rowStartingIndex: number,
    isPlayMode: boolean,
    midiHttpService: MIDI_HTTP_Service,
}

export function GridElementRow({
    rowStartingIndex,
    isPlayMode,
    midiHttpService,
}: GridElementRowProps) {
    const currentGridElementMidiState = useAppSelector(state => state.midiGridReducer);
    let gridElements: JSX.Element[] = [];

    for (let i = 0; i < currentGridElementMidiState.columnCount; i++) {
        const currentIndex = i + rowStartingIndex;
        gridElements.push(
            <GridElement
                index={currentIndex}
                MIDI_HTTP_Service={midiHttpService}
                isPlayMode={isPlayMode}
                key={`gridElement_${currentIndex}`}
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
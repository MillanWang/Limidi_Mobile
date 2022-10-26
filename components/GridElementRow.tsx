import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import GridElement from '../components/GridElement';
import { useAppSelector } from '../redux/hooks';


export interface GridElementRowProps {
    rowStartingIndex: number,
    isPlayMode: boolean,
}

export function GridElementRow({
    rowStartingIndex,
    isPlayMode,
}: GridElementRowProps) {

    const currentGridElementMidiState = useAppSelector(state => state.midiGridReducer);

    // Populating the row
    let gridElements: JSX.Element[] = [];
    for (let i = 0; i < currentGridElementMidiState.columnCount; i++) {
        const currentIndex = i + rowStartingIndex;
        gridElements.push(
            <GridElement
                index={currentIndex}
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
    },
});
import { Button, Icon, Slider, } from "@rneui/themed";
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { NOTE } from "../../../constants/MIDI_Notes";
import { Scale } from "../../../services/ScaleService";
import { Piano } from "../../Piano";
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import {
    setColumnCount,
    setRowCount,
    setStartingNote,
    setScale,
    setStartingOctave,
} from '../../../redux/slices/GridPresetsSlice';


export function GridEditGridSettingsTab(): JSX.Element {
    const dispatch = useAppDispatch();
    const gridState = useAppSelector(state => state.gridPresetsReducer.currentGridPreset);
    const columnState = gridState.columnCount;
    const rowState = gridState.rowCount;
    const startingNoteNumberState = gridState.startingNoteNumber;
    const scaleState = gridState.scale;

    // This useState is needed to choose a scale before applying it
    const [currentScale, setCurrentScale] = useState(scaleState);

    return (
        <View style={styles.container}>
            <Text>Number of Columns: {columnState}</Text>
            <Slider
                maximumValue={12} minimumValue={1} step={1}
                value={columnState}
                onValueChange={(value) => { dispatch(setColumnCount(value)) }}
            />
            <Text>Number of Rows: {rowState}</Text>
            <Slider
                maximumValue={12} minimumValue={1} step={1}
                value={rowState}
                onValueChange={(value) => { dispatch(setRowCount(value)) }}
            />

            {/* Note Control */}
            <View>
                <Text>Starting Note: {Object.values(NOTE)[startingNoteNumberState % 12]}</Text>
                <Piano
                    noteNumber={startingNoteNumberState % 12}
                    setNoteNumber={(value) => { dispatch(setStartingNote(value)) }}
                />
            </View>

            {/* Octave Control */}
            <View>
                <Text>Octave: {Math.floor(startingNoteNumberState / 12)}</Text>
                <Slider
                    maximumValue={10} minimumValue={0} step={1}
                    value={Math.floor(startingNoteNumberState / 12)}
                    onValueChange={(value) => { dispatch(setStartingOctave(value)) }}
                />
            </View>

            {/* Scale control */}
            <View style={styles.scaleManagementView}>
                {/* Scale selector */}
                <View style={styles.scaleSelector} >
                    <Text>Selected Scale : {currentScale}</Text>
                    <ScrollView style={styles.scaleSelectorScrollView}>
                        {Object.values(Scale).map(scale => {
                            return (
                                <View
                                    key={scale}
                                    style={styles.scaleItem}
                                    onTouchEndCapture={() => setCurrentScale(scale)}
                                >
                                    <Text style={styles.scaleItemText}>{scale}</Text>
                                    {currentScale === scale &&
                                        <Icon name="done" color='black' />
                                    }
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* Scale applicator */}
                <View style={styles.applyScaleView}>
                    <Text>Current Scale : {scaleState}</Text>
                    <Button onPress={() => { dispatch(setScale(currentScale)) }}>
                        Apply Selected Scale
                    </Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
    },
    scaleManagementView: {
        flexDirection: 'row',
        paddingTop: 20
    },
    scaleSelector: {
        height: 180,
        flexDirection: 'column',
        width: '60%'
    },
    scaleSelectorScrollView: {
        width: "100 %"
    },
    scaleItem: {
        borderWidth: 1,
        height: 30,
        flexDirection: 'row',
        backgroundColor: '#bbbbbb'
    },
    scaleItemText: {
        alignSelf: "center",
    },
    applyScaleView: {
        width: "40 %"
    },
});
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
    setStartingNoteNumber,
    setStartingNoteOctave,
    setScale,
    setColumnCount,
    setRowCount,
} from '../../../redux/slices/MidiSlice';


export function GridEditGridSettingsTab(): JSX.Element {

    const currentGridElementMidiState = useAppSelector(state => state.midiGridReducer);
    const dispatch = useAppDispatch();
    const [currentScale, setCurrentScale] = useState(currentGridElementMidiState.scale);
    function updateCurrentScale(scale: Scale) {
        setCurrentScale(scale);
    }

    return (
        <View style={styles.container}>
            <Text>Number of Columns: {currentGridElementMidiState.columnCount}</Text>
            <Slider
                maximumValue={12} minimumValue={1} step={1}
                value={currentGridElementMidiState.columnCount} onValueChange={(value) => { dispatch(setColumnCount(value)) }}
            />
            <Text>Number of Rows: {currentGridElementMidiState.rowCount}</Text>
            <Slider
                maximumValue={12} minimumValue={1} step={1}
                value={currentGridElementMidiState.rowCount} onValueChange={(value) => { dispatch(setRowCount(value)) }}
            />


            {/* Note Control */}
            <View>
                <Text>Starting Note: {Object.values(NOTE)[currentGridElementMidiState.startingNoteNumber % 12]}</Text>
                <Piano noteNumber={currentGridElementMidiState.startingNoteNumber % 12} setNoteNumber={(value) => { dispatch(setStartingNoteNumber(value)) }} />
            </View>


            {/* Octave Control */}
            <View>
                <Text>Octave: {Math.floor(currentGridElementMidiState.startingNoteNumber / 12)}</Text>
                <Slider
                    maximumValue={10} minimumValue={0} step={1}
                    value={Math.floor(currentGridElementMidiState.startingNoteNumber / 12)} onValueChange={(value) => { dispatch(setStartingNoteOctave(value)) }}
                />
            </View>

            {/* Scale control */}
            <View style={styles.scaleManagementView}>

                <View style={styles.scaleSelector} >

                    <Text>Selected Scale : {currentScale}</Text>

                    <ScrollView style={styles.scaleSelectorScrollView}>
                        {Object.values(Scale).map(scale => {
                            return (
                                <View
                                    key={scale}
                                    style={styles.scaleItem}
                                    onTouchEndCapture={() => updateCurrentScale(scale)}
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
                <View style={styles.applyScaleView}>
                    <Text>Current Scale : {currentGridElementMidiState.scale}</Text>
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
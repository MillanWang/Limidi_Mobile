import {
    Button,
    Dialog,
    Icon,
    Input,
    Slider,
} from "@rneui/themed";
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { NOTE } from "../../../constants/MIDI_Notes";
import { Scale, ScaleService, } from "../../../services/ScaleService";
import { Piano } from "../../Piano";

export interface GridEditGridSettingsTabProps {
    initialNoteNumber: number, setInitialNoteNumber(initialNoteNumber: number): void,
    columnCount: number, setColumnCount(columnCount: number): void,
    rowCount: number, setRowCount(rowCount: number): void,
    scaleService: ScaleService
}

export function GridEditGridSettingsTab({
    initialNoteNumber, setInitialNoteNumber,
    columnCount, setColumnCount,
    rowCount, setRowCount,
    scaleService
}: GridEditGridSettingsTabProps): JSX.Element {

    const [currentScale, setCurrentScale] = useState(Scale.Ionian);
    function updateCurrentScale(scale: Scale) {
        setCurrentScale(scale);
        scaleService.setScale(scale);
        scaleService.setCurrentNoteNumber(initialNoteNumber)
    }

    return (
        <View>
            <Text>Number of Columns: {columnCount}</Text>
            <Slider
                maximumValue={12} minimumValue={1} step={1}
                value={columnCount} onValueChange={setColumnCount}
            />
            <Text>Number of Rows: {rowCount}</Text>
            <Slider
                maximumValue={12} minimumValue={1} step={1}
                value={rowCount} onValueChange={setRowCount}
            />


            {/* Note Control */}
            <View>
                <Text>Starting Note: {Object.values(NOTE)[initialNoteNumber % 12]}</Text>
                <Piano noteNumber={initialNoteNumber % 12} setNoteNumber={(value) => { setInitialNoteNumber(value + Math.floor(initialNoteNumber / 12)) }} />
            </View>


            {/* Octave Control */}
            <View>
                <Text>Octave: {Math.floor(initialNoteNumber / 12)}</Text>
                <Slider
                    maximumValue={10} minimumValue={0} step={1}
                    value={Math.floor(initialNoteNumber / 12)} onValueChange={(value) => { setInitialNoteNumber(value * 12 + initialNoteNumber % 12) }}
                />
            </View>

            {/* Scale control */}
            <View style={{ height: 180, flexDirection: 'column', paddingTop: 20 }} >

                <Text>Current Scale : {currentScale}</Text>

                <ScrollView style={{ width: "100 %" }}>
                    {Object.values(Scale).map(scale => {
                        return (
                            <View
                                style={{ borderWidth: 1, height: 30, flexDirection: 'row', backgroundColor: '#bbbbbb' }}
                                key={scale}
                                onTouchEndCapture={() => updateCurrentScale(scale)}
                            >
                                <Text style={{ alignSelf: "center", }}>
                                    {scale}
                                </Text>
                                {currentScale === scale &&
                                    <Icon name="done" color='black' />
                                }
                            </View>
                        );
                    })}
                </ScrollView>
                {/* <View style={{ width: "40 %" }}>
                    
                    <Button>Apply Scale</Button>
                </View> */}

            </View>
        </View>
    )
}
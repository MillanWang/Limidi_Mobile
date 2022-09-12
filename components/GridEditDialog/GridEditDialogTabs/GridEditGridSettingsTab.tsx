import {
    Button,
    Dialog,
    Input,
    Slider,
} from "@rneui/themed";
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { NOTE } from "../../../constants/MIDI_Notes";

export interface GridEditGridSettingsTabProps {
    initialNoteNumber: number, setInitialNoteNumber(initialNoteNumber: number): void,
    columnCount: number, setColumnCount(columnCount: number): void,
    rowCount: number, setRowCount(rowCount: number): void,
}

export function GridEditGridSettingsTab({
    initialNoteNumber,
    setInitialNoteNumber,
    columnCount,
    setColumnCount,
    rowCount,
    setRowCount,
}: GridEditGridSettingsTabProps): JSX.Element {
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
                <Slider
                    maximumValue={11} minimumValue={0} step={1}
                    value={initialNoteNumber % 12} onValueChange={(value) => { setInitialNoteNumber(value + Math.floor(initialNoteNumber / 12)) }}
                />
            </View>


            {/* Octave Control */}
            <View>
                <Text>Octave: {Math.floor(initialNoteNumber / 12)}</Text>
                <Slider
                    maximumValue={10} minimumValue={0} step={1}
                    value={Math.floor(initialNoteNumber / 12)} onValueChange={(value) => { setInitialNoteNumber(value * 12 + initialNoteNumber % 12) }}
                />
            </View>
        </View>
    )
}
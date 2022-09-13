import React, { useState } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';


import { GridElementGrid } from '../components/GridElementGrid';
import { GridScreenToolbar } from '../components/GridScreenToolbar';

import { MIDI_HTTP_Service } from '../services/MIDI_HTTP_Service';
import { ColorPresetService } from '../services/ColorPresetService';
import { DEFAULT_COLOR_PRESET } from '../constants/Colors';


const midiHttpService = new MIDI_HTTP_Service("192.168.0.12", "4848");
const colorPresetService = new ColorPresetService();

colorPresetService.createColorPreset("Default", DEFAULT_COLOR_PRESET);
colorPresetService.createColorPreset("Hulk", {
    textColor: '#26ffcc',
    unpressedColor: '#330c29',
    pressedColor: '#0eed45'
});
colorPresetService.createColorPreset("Frost", {
    textColor: '#1cccae',
    unpressedColor: '#012975',
    pressedColor: '#2ad9ed'
});

export default function GridScreen() {


    const [isPlayMode, setIsPlayMode] = useState(true);
    const [showGridEditDialog, setShowGridEditDialog] = useState(false);

    const [initialNoteNumber, setInitialNoteNumber] = useState(60); //Default to C5
    const [columnCount, setColumnCount] = useState(4);// Default to 4x4 like an MPC 
    const [rowCount, setRowCount] = useState(4);// Default to 4x4 like an MPC 

    return (

        <View style={styles.container}>

            <GridScreenToolbar
                isPlayMode={isPlayMode} setIsPlayMode={setIsPlayMode}
                isVisible={showGridEditDialog} setIsVisible={setShowGridEditDialog}
                initialNoteNumber={initialNoteNumber} setInitialNoteNumber={setInitialNoteNumber}
                columnCount={columnCount} setColumnCount={setColumnCount}
                rowCount={rowCount} setRowCount={setRowCount}
                midiHttpService={midiHttpService}
            />

            <GridElementGrid
                isPlayMode={isPlayMode}
                initialNoteNumber={initialNoteNumber}
                columnCount={columnCount}
                rowCount={rowCount}
                midiHttpService={midiHttpService}
                colorPresetService={colorPresetService}
            />

        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#000000'
    },
});

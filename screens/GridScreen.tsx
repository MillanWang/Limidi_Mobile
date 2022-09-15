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
import { Scale, ScaleService } from '../services/ScaleService';


const midiHttpService = new MIDI_HTTP_Service("192.168.0.12", "4848");
const colorPresetService = new ColorPresetService();
const scaleService = new ScaleService();
// scaleService.setScale(Scale.Aeolian);


colorPresetService.createColorPreset("Default", DEFAULT_COLOR_PRESET);
colorPresetService.createColorPreset("Frost", {
    unpressedColor: '#012975',
    pressedColor: '#2ad9ed'
});
colorPresetService.createColorPreset("Grape", {
    unpressedColor: '#540075',
    pressedColor: '#c047ed'
});
colorPresetService.createColorPreset("Slime", {
    unpressedColor: '#0e4c00',
    pressedColor: '#44ed1e'
});
colorPresetService.createColorPreset("Lava", {
    unpressedColor: '#4c0001',
    pressedColor: '#ed003f'
});
colorPresetService.createColorPreset("Banana", {
    unpressedColor: '#586600',
    pressedColor: '#e1ef00'
});
colorPresetService.createColorPreset("Hulk", {
    unpressedColor: '#330c29',
    pressedColor: '#0eed45'
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
                scaleService={scaleService}
            />

            <GridElementGrid
                isPlayMode={isPlayMode}
                initialNoteNumber={initialNoteNumber}
                columnCount={columnCount}
                rowCount={rowCount}
                midiHttpService={midiHttpService}
                colorPresetService={colorPresetService}
                scaleService={scaleService}
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

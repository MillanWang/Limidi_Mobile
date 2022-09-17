import React, { useState } from 'react';
import { StyleSheet, View, } from 'react-native';
import { GridElementGrid } from '../components/GridElementGrid';
import { GridScreenToolbar } from '../components/GridScreenToolbar';

import { MIDI_HTTP_Service } from '../services/MIDI_HTTP_Service';
import { Scale, ScaleService } from '../services/ScaleService';
import { useAppSelector, useAppDispatch } from '../redux/hooks';

const midiHttpService = new MIDI_HTTP_Service("192.168.0.12", "4848");

const scaleService = new ScaleService();

export default function GridScreen() {

    const currentGridElementMidiState = useAppSelector(state => state.midiGridReducer);

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
                midiHttpService={midiHttpService}
            />

            <GridElementGrid
                isPlayMode={isPlayMode}
                midiHttpService={midiHttpService}//TODO: Should be via REDUX
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

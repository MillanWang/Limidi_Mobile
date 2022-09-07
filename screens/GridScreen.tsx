import React, { useState } from 'react';
import {
    StyleSheet,
    Switch,
    Text,
    View,
} from 'react-native';

import { Icon } from '@rneui/themed';


import GridElement from '../components/GridElement';
import GridEditDialog from '../components/GridEditDialog/GridEditDialog';

import { MIDI_HTTP_Service } from '../services/MIDI_HTTP_Service';
import { ColorPresetService } from '../services/ColorPresetService';
import { DEFAULT_COLOR_PRESET } from '../constants/Colors';



const midiService = new MIDI_HTTP_Service("192.168.0.12", "4848");
const colorPresetService = new ColorPresetService();

colorPresetService.createColorPreset("Default", DEFAULT_COLOR_PRESET.textColor, DEFAULT_COLOR_PRESET.unpressedColor, DEFAULT_COLOR_PRESET.pressedColor);
colorPresetService.createColorPreset("Alt", '#26ffcc', '#330c29', '#c5ed12');


export default function GridScreen() {


    const [isPlayMode, setIsPlayMode] = useState(true);
    const [showGridEditDialog, setShowGridEditDialog] = useState(false);


    return (

        <View style={styles.container}>
            <View style={styles.headerOptions}>
                <Switch onChange={() => { setIsPlayMode(!isPlayMode) }} value={isPlayMode}></Switch>
                <Text style={styles.playOrEditText}>{isPlayMode ? "PLAY" : "EDIT"}</Text>
                {!!!isPlayMode &&
                    <View style={{}}>
                        <Icon name='settings' color='#ffffff' style={{}} onPress={() => { setShowGridEditDialog(true) }} />
                    </View>
                }
                <GridEditDialog
                    isVisible={showGridEditDialog} setIsVisible={setShowGridEditDialog}
                    midiService={midiService}
                />
            </View>


            <View style={styles.gridArea}>{/* TODO: Make this whole area dynamically genereated based on the grid settings */}
                <View style={styles.gridElementRow} >
                    <GridElement MIDI_HTTP_Service={midiService} colorPresetService={colorPresetService} initialName="C Note" initialNoteNumber={0} initialOctave={6} isPlayMode={isPlayMode}></GridElement>
                    <GridElement MIDI_HTTP_Service={midiService} colorPresetService={colorPresetService} initialName="Db Note" initialNoteNumber={1} initialOctave={6} isPlayMode={isPlayMode}></GridElement>
                    <GridElement MIDI_HTTP_Service={midiService} colorPresetService={colorPresetService} initialName="D Note" initialNoteNumber={2} initialOctave={6} isPlayMode={isPlayMode}></GridElement>
                    <GridElement MIDI_HTTP_Service={midiService} colorPresetService={colorPresetService} initialName="Eb Note" initialNoteNumber={3} initialOctave={6} isPlayMode={isPlayMode}></GridElement>
                </View>

                <View style={styles.gridElementRow} >
                    <GridElement MIDI_HTTP_Service={midiService} colorPresetService={colorPresetService} initialName="Ab Note" initialNoteNumber={8} initialOctave={5} isPlayMode={isPlayMode}></GridElement>
                    <GridElement MIDI_HTTP_Service={midiService} colorPresetService={colorPresetService} initialName="A Note" initialNoteNumber={9} initialOctave={5} isPlayMode={isPlayMode}></GridElement>
                    <GridElement MIDI_HTTP_Service={midiService} colorPresetService={colorPresetService} initialName="Bb Note" initialNoteNumber={10} initialOctave={5} isPlayMode={isPlayMode}></GridElement>
                    <GridElement MIDI_HTTP_Service={midiService} colorPresetService={colorPresetService} initialName="B Note" initialNoteNumber={11} initialOctave={5} isPlayMode={isPlayMode}></GridElement>
                </View>

                <View style={styles.gridElementRow} >
                    <GridElement MIDI_HTTP_Service={midiService} colorPresetService={colorPresetService} initialName="E Note" initialNoteNumber={4} initialOctave={5} isPlayMode={isPlayMode}></GridElement>
                    <GridElement MIDI_HTTP_Service={midiService} colorPresetService={colorPresetService} initialName="F Note" initialNoteNumber={5} initialOctave={5} isPlayMode={isPlayMode}></GridElement>
                    <GridElement MIDI_HTTP_Service={midiService} colorPresetService={colorPresetService} initialName="Gb Note" initialNoteNumber={6} initialOctave={5} isPlayMode={isPlayMode}></GridElement>
                    <GridElement MIDI_HTTP_Service={midiService} colorPresetService={colorPresetService} initialName="G Note" initialNoteNumber={7} initialOctave={5} isPlayMode={isPlayMode}></GridElement>
                </View>

                <View style={styles.gridElementRow} >
                    <GridElement MIDI_HTTP_Service={midiService} colorPresetService={colorPresetService} initialName="C Note" initialNoteNumber={0} initialOctave={5} isPlayMode={isPlayMode}></GridElement>
                    <GridElement MIDI_HTTP_Service={midiService} colorPresetService={colorPresetService} initialName="Db Note" initialNoteNumber={1} initialOctave={5} isPlayMode={isPlayMode}></GridElement>
                    <GridElement MIDI_HTTP_Service={midiService} colorPresetService={colorPresetService} initialName="D Note" initialNoteNumber={2} initialOctave={5} isPlayMode={isPlayMode}></GridElement>
                    <GridElement MIDI_HTTP_Service={midiService} colorPresetService={colorPresetService} initialName="Eb Note" initialNoteNumber={3} initialOctave={5} isPlayMode={isPlayMode}></GridElement>
                </View>
            </View>

        </View>

    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#000000'
    },
    headerOptions: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    playOrEditText: {
        marginLeft: 5,
        color: '#ffffff'
    },
    gridArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    gridElementRow: {
        flex: 1,
        flexDirection: 'row',
    }

});

import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import { MIDI_HTTP_Service } from '../services/MIDI_HTTP_Service';
import {
    Button,
    Dialog,
    Input,
    Slider,
} from "@rneui/themed";

import {
    createMidiMessage,
    NOTE,
} from '../constants/MIDI_Notes';

interface GridElementProps {
    MIDI_HTTP_Service: MIDI_HTTP_Service,
    defaultName: string,
    defaultNoteNumber: number,
    isPlayMode: boolean,
};

export default function GridElement(
    {
        MIDI_HTTP_Service,
        defaultName,
        defaultNoteNumber,
        isPlayMode
    }: GridElementProps
) {

    const [elementName, setElementName] = useState(defaultName);

    const [noteNumber, setNoteNumber] = useState(defaultNoteNumber);
    const [octave, setOctave] = useState(5);
    const [velocity, setVelocity] = useState(100);

    const [dialogVisible, setDialogVisible] = useState(false);


    function toggleDialogVisible() {
        setDialogVisible(!dialogVisible);
    };

    function playModeTouchStartHandler() {

        // Eventually use these to make a tap position depended velocity control. event being an input param to this function
        // event.nativeEvent.locationX
        // event.nativeEvent.locationY

        if (isPlayMode) {
            MIDI_HTTP_Service.sendMidiMessage(
                createMidiMessage(
                    noteNumber,
                    octave,
                    velocity,
                    true //Note is on
                )
            );
        }
    }

    function playModeTouchEndHandler() {
        if (isPlayMode) {
            MIDI_HTTP_Service.sendMidiMessage(
                createMidiMessage(
                    noteNumber,
                    octave,
                    0, // No velocity on note off
                    false //Note is off
                )
            );
        }
    }

    return (
        <View style={styles.gridElementContainer} onTouchStart={playModeTouchStartHandler} onTouchEnd={playModeTouchEndHandler}>

            {/* Play Mode */}
            {isPlayMode &&
                <View style={styles.playModeView} >
                    <Text>{elementName}</Text>
                </View>
            }

            {/* Edit mode */}
            {!isPlayMode &&
                <View>
                    <Text>Name: {elementName}</Text>
                    <Text>Note: {Object.values(NOTE)[noteNumber]}</Text>
                    <Text>Octave: {octave}</Text>
                    <Text>Velocity: {velocity}</Text>
                    <Button onPress={toggleDialogVisible}>
                        EDIT
                    </Button>

                </View>
            }

            <Dialog isVisible={dialogVisible} >

                {/* TODOs 
                    -Name editing
                    -Note selection
                    -Octave selection
                    -Velocity selection
                */}
                {/* Name control */}
                <View>
                    <Text>Name:</Text>
                    <Input
                        value={elementName}
                        onChangeText={value => setElementName(value)}
                    ></Input>
                </View>

                {/* Note Control */}
                <View>
                    <Text>Note: {Object.values(NOTE)[noteNumber]}</Text>
                    <Slider
                        maximumValue={11}
                        minimumValue={0}
                        step={1}
                        value={noteNumber}
                        onValueChange={setNoteNumber}
                    />

                </View>


                {/* Octave Control */}
                <View>
                    <Text>Octave: {octave}</Text>
                    <Slider
                        maximumValue={10}
                        minimumValue={0}
                        step={1}
                        value={octave}
                        onValueChange={setOctave}
                    />
                </View>

                {/* Velocity Control */}
                <View>
                    <Text>Velocity: {velocity}</Text>
                    <Slider
                        maximumValue={127}
                        minimumValue={0}
                        step={1}
                        value={velocity}
                        onValueChange={setVelocity}
                    />
                </View>


                <Button onPress={toggleDialogVisible}>Close</Button>

            </Dialog>
        </View>
    );
}; // end of GridElement


const styles = StyleSheet.create({
    gridElementContainer: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey',
        height: 200,
        width: 200,
        margin: 10,
    },
    playModeView: {
        // height: 200,
        // width: 200,
        backgroundColor: "green"
    }

});

import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import { MIDI_HTTP_Service } from '../services/MIDI_HTTP_Service';
import {
    Button,
    Dialog,
    Input,
    Slider,
    Tab,
    TabView
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
                    <Button onPress={() => { setDialogVisible(true) }}>
                        EDIT
                    </Button>

                </View>
            }

            <GridElementEditDialog
                dialogVisible={dialogVisible}
                setDialogVisible={setDialogVisible}
                elementName={elementName}
                setElementName={setElementName}
                noteNumber={noteNumber}
                setNoteNumber={setNoteNumber}
                octave={octave}
                setOctave={setOctave}
                velocity={velocity}
                setVelocity={setVelocity}
            />

        </View>
    );
}; // end of GridElement

interface GridElementEditDialogProps extends GridElementEditMidiProps {
    dialogVisible: boolean, setDialogVisible(dialogVisible: boolean): void,
}



function GridElementEditDialog(
    {
        dialogVisible, setDialogVisible,
        elementName, setElementName,
        noteNumber, setNoteNumber,
        octave, setOctave,
        velocity, setVelocity,
    }: GridElementEditDialogProps) {

    const [tabIndex, setTabIndex] = React.useState(0);

    return (
        <Dialog isVisible={dialogVisible} style={{ height: 500 }}>
            <View >

                {/* TODO:Tabs are cursed. Honestly probably better off implementing it myself with buttons. Only one hook needed to track the current tab*/}
                <Tab
                    value={tabIndex}
                    onChange={(e) => setTabIndex(e)}
                    variant="primary"
                >
                    <Tab.Item>Tab</Tab.Item>
                    <Tab.Item>Tab2</Tab.Item>
                </Tab>

                <TabView
                    value={tabIndex}
                    onChange={setTabIndex}
                    animationType="spring"
                    containerStyle={{ height: 200 }}>
                    <TabView.Item style={{ backgroundColor: 'red', width: '100%', height: 100 }}>
                        <Text>1</Text>
                    </TabView.Item>
                    <TabView.Item style={{ backgroundColor: 'blue', width: '100%', height: 100 }}>
                        <Text>2</Text>
                    </TabView.Item>
                </TabView>

                <GridElementEditMidiOptionsTab
                    elementName={elementName} setElementName={setElementName}
                    noteNumber={noteNumber} setNoteNumber={setNoteNumber}
                    octave={octave} setOctave={setOctave}
                    velocity={velocity} setVelocity={setVelocity}
                />

                <Button onPress={() => { setDialogVisible(false) }}>SAVE</Button>
            </View>
        </Dialog>
    );
} //end GridElementEditDialog


interface GridElementEditMidiProps {
    // MIDI Options
    elementName: string, setElementName(elementName: string): void,
    noteNumber: number, setNoteNumber(noteNumber: number): void,
    octave: number, setOctave(octave: number): void,
    velocity: number, setVelocity(velocity: number): void,

}

function GridElementEditMidiOptionsTab(
    {
        elementName, setElementName,
        noteNumber, setNoteNumber,
        octave, setOctave,
        velocity, setVelocity,
    }: GridElementEditMidiProps) {

    return (
        <View>
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
        </View>
    );
}// end GridElementEditMidiOptionsTab

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

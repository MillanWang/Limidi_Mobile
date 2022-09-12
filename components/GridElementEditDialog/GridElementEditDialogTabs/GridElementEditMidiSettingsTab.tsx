
import React from 'react';
import { View } from 'react-native';
import { Input, Slider, Text, } from "@rneui/themed";

import { NOTE, } from '../../../constants/MIDI_Notes';


export interface GridElementEditMidiProps {
    // MIDI Options
    elementName: string, setElementName(elementName: string): void,
    noteNumber: number, setNoteNumber(noteNumber: number): void,
    octave: number, setOctave(octave: number): void,
    velocity: number, setVelocity(velocity: number): void,

}

export function GridElementEditMidiSettingsTab(
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
                <Input value={elementName} onChangeText={value => setElementName(value)} />
            </View>

            {/* Note Control */}
            <View>
                <Text>Note: {Object.values(NOTE)[noteNumber]}</Text>
                <Slider
                    maximumValue={11} minimumValue={0} step={1}
                    value={noteNumber} onValueChange={setNoteNumber}
                />
            </View>


            {/* Octave Control */}
            <View>
                <Text>Octave: {octave}</Text>
                <Slider
                    maximumValue={10} minimumValue={0} step={1}
                    value={octave} onValueChange={setOctave}
                />
            </View>

            {/* Velocity Control */}
            <View>
                <Text>Velocity: {velocity}</Text>
                <Slider
                    maximumValue={127} minimumValue={0} step={1}
                    value={velocity} onValueChange={setVelocity}
                />
            </View>
        </View>
    );
}// end GridElementEditMidiOptionsTab

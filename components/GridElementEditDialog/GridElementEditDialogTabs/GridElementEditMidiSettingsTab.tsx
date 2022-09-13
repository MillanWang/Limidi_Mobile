
import React from 'react';
import { View } from 'react-native';
import { Input, Slider, Text, Switch, } from "@rneui/themed";

import { NOTE, } from '../../../constants/MIDI_Notes';


export interface GridElementEditMidiProps {
    // MIDI Options
    elementName: string, setElementName(elementName: string): void,
    noteNumber: number, setNoteNumber(noteNumber: number): void,
    octave: number, setOctave(octave: number): void,

    isVelocityVertical: boolean, setIsVelocityVertical(isVelocityVertical: boolean): void,
    velocityFloor: number, setVelocityFloor(velocityFloor: number): void,
    velocityCeiling: number, setVelocityCeiling(velocityCeiling: number): void,
}

export function GridElementEditMidiSettingsTab(
    {
        elementName, setElementName,
        noteNumber, setNoteNumber,
        octave, setOctave,
        velocityFloor, setVelocityFloor,
        velocityCeiling, setVelocityCeiling,
        isVelocityVertical, setIsVelocityVertical,
    }: GridElementEditMidiProps) {

    function changeVelocityFloor(value: number): void {
        setVelocityFloor(value);
        if (velocityFloor > velocityCeiling) {
            setVelocityCeiling(value);
        }
    }
    function changeVelocityCeiling(value: number): void {
        setVelocityCeiling(value);
        if (velocityCeiling < velocityFloor) {
            setVelocityFloor(value);
        }
    }
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
                <Text>Velocity Direction: {isVelocityVertical ? "Vertical" : "Horizontal"}</Text>
                <Switch value={isVelocityVertical} onChange={() => setIsVelocityVertical(!isVelocityVertical)}></Switch>
                <Text>Velocity Floor: {velocityFloor}</Text>
                <Slider
                    maximumValue={127} minimumValue={0} step={1}
                    value={velocityFloor} onValueChange={changeVelocityFloor}
                />

                <Text>Velocity Ceiling: {velocityCeiling}</Text>
                <Slider
                    maximumValue={127} minimumValue={0} step={1}
                    value={velocityCeiling} onValueChange={changeVelocityCeiling}
                />
            </View>
        </View>
    );
}// end GridElementEditMidiOptionsTab

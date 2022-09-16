
import React from 'react';
import { View } from 'react-native';
import { Input, Slider, Text, Switch, } from "@rneui/themed";

import { NOTE, } from '../../../constants/MIDI_Notes';

import { Piano } from '../../Piano';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { setGridElementNoteNumber, setGridElementVelocityCeiling, setGridElementVelocityFloor, setGridElementNoteOctave, setGridElementName, } from '../../../redux/slices/MidiSlice';

export interface GridElementEditMidiProps {
    index: number,
}

export function GridElementEditMidiSettingsTab({ index, }: GridElementEditMidiProps) {

    const currentGridElementInfo = useAppSelector(state => state.midiGridReducer.gridElements[index]);
    const dispatch = useAppDispatch();


    return (
        <View>
            {/* Name control */}
            <View>
                <Text>Name:</Text>
                <Input value={currentGridElementInfo.name} onChangeText={value => dispatch(setGridElementName({ index: index, name: value }))} />
            </View>


            {/* Note Control */}
            <View>
                <Text>Note: {Object.values(NOTE)[currentGridElementInfo.noteNumber % 12]}</Text>
                <Piano noteNumber={currentGridElementInfo.noteNumber % 12} setNoteNumber={(noteNumber) => dispatch(setGridElementNoteNumber({ index: index, newNoteNumber: noteNumber }))} />
            </View>


            {/* Octave Control*/}
            <View>
                <Text>Octave: {Math.floor(currentGridElementInfo.noteNumber / 12)}</Text>
                <Slider
                    maximumValue={10} minimumValue={0} step={1}
                    value={Math.floor(currentGridElementInfo.noteNumber / 12)} onValueChange={value => dispatch(setGridElementNoteOctave({ index: index, newNoteOctave: value }))}
                />
            </View>

            {/* Velocity Control */}
            <View>
                <Text>Velocity Direction: {currentGridElementInfo.velocity.isVertical ? "Vertical" : "Horizontal"}</Text>
                <Switch value={currentGridElementInfo.velocity.isVertical} ></Switch>
                <Text>Velocity Floor: {currentGridElementInfo.velocity.floor}</Text>
                <Slider
                    maximumValue={127} minimumValue={0} step={1}
                    value={currentGridElementInfo.velocity.floor} onValueChange={value => dispatch(setGridElementVelocityFloor({ index: index, floor: value }))}
                />

                <Text>Velocity Ceiling: {currentGridElementInfo.velocity.ceiling}</Text>
                <Slider
                    maximumValue={127} minimumValue={0} step={1}
                    value={currentGridElementInfo.velocity.ceiling} onValueChange={value => dispatch(setGridElementVelocityCeiling({ index: index, ceiling: value }))}
                />
            </View>
        </View>
    );
}// end GridElementEditMidiOptionsTab


import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Slider, Text, Switch, } from "@rneui/themed";

import { NOTE, } from '../../../constants/MIDI_Notes';

import { Piano } from '../../Piano';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import {
    setGridElementNoteNumber,
    setGridElementVelocityCeiling,
    setGridElementVelocityFloor,
    setGridElementVelocityIsVertical,
    setGridElementNoteOctave,
    setGridElementName,
    setGridElementMidiLocked,
} from '../../../redux/slices/MidiSlice';

export interface GridElementEditMidiProps {
    index: number,
}

export function GridElementEditMidiSettingsTab({ index, }: GridElementEditMidiProps) {

    const currentGridElementMidiState = useAppSelector(state => state.midiGridReducer.gridElements[index]);
    const dispatch = useAppDispatch();

    function toggleElementMidiLock() {
        dispatch(setGridElementMidiLocked({ index, isLocked: !currentGridElementMidiState.isLocked }));
    }


    return (
        <View>
            {/* MIDI settings Lock */}
            <View style={styles.lockSwitchView}>
                <Text>Lock Element MIDI Settings: </Text>
                <Switch value={currentGridElementMidiState.isLocked} onChange={toggleElementMidiLock}></Switch>
            </View>

            {/* Name control */}
            <View>
                <Text>Name:</Text>
                <Input value={currentGridElementMidiState.name} onChangeText={value => dispatch(setGridElementName({ index, name: value }))} />
            </View>


            {/* Note Control */}
            <View>
                <Text>Note: {Object.values(NOTE)[currentGridElementMidiState.noteNumber % 12]}</Text>
                <Piano noteNumber={currentGridElementMidiState.noteNumber % 12} setNoteNumber={(noteNumber) => dispatch(setGridElementNoteNumber({ index, newNoteNumber: noteNumber }))} />
            </View>


            {/* Octave Control*/}
            <View>
                <Text>Octave: {Math.floor(currentGridElementMidiState.noteNumber / 12)}</Text>
                <Slider
                    maximumValue={10} minimumValue={0} step={1}
                    value={Math.floor(currentGridElementMidiState.noteNumber / 12)} onValueChange={value => dispatch(setGridElementNoteOctave({ index, newNoteOctave: value }))}
                />
            </View>

            {/* Velocity Control */}
            <View>
                <Text>Velocity Direction: {currentGridElementMidiState.velocity.isVertical ? "Vertical" : "Horizontal"}</Text>
                <Switch value={currentGridElementMidiState.velocity.isVertical} onChange={() => { dispatch(setGridElementVelocityIsVertical({ index, isVertical: !currentGridElementMidiState.velocity.isVertical })) }}></Switch>

                <Text>Velocity Floor: {currentGridElementMidiState.velocity.floor}</Text>
                <Slider
                    maximumValue={127} minimumValue={0} step={1}
                    value={currentGridElementMidiState.velocity.floor} onValueChange={value => dispatch(setGridElementVelocityFloor({ index: index, floor: value }))}
                />

                <Text>Velocity Ceiling: {currentGridElementMidiState.velocity.ceiling}</Text>
                <Slider
                    maximumValue={127} minimumValue={0} step={1}
                    value={currentGridElementMidiState.velocity.ceiling} onValueChange={value => dispatch(setGridElementVelocityCeiling({ index: index, ceiling: value }))}
                />
            </View>
        </View>
    );
}// end GridElementEditMidiOptionsTab

const styles = StyleSheet.create({
    lockSwitchView: {
        flexDirection: "row",
        alignItems: 'center'
    },

});
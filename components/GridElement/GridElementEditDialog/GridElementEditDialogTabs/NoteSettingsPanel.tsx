
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Slider, Text, Switch, } from "@rneui/themed";
import { NOTE, } from '../../../../constants/MIDI_Notes';
import { Piano } from '../../../Piano';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import {
    setGridElementNote,
    setGridElementVelocityCeiling,
    setGridElementVelocityFloor,
    setGridElementVelocityIsVertical,
    setGridElementOctave,
    setGridElementName,
    setGridElementIsLocked,
    setGridElementIsMidiNote,
} from '../../../../redux/slices/GridPresetsSlice';

export interface NoteSettingsPanelProps {
    index: number,
}

export function NoteSettingsPanel({ index, }: NoteSettingsPanelProps) {
    const currentGridElementState = useAppSelector(state => state.gridPresetsReducer.currentGridPreset.gridElements[index]);
    const nameState = currentGridElementState.name;
    const lockedState = currentGridElementState.isLocked;
    const isMidiNoteModeState = currentGridElementState.isMidiNote;
    const noteNumberState = currentGridElementState.midiNoteState.noteNumber;
    const velocityState = currentGridElementState.midiNoteState.velocity;
    const dispatch = useAppDispatch();

    function toggleElementMidiLock() {
        dispatch(setGridElementIsLocked({ index, isLocked: !lockedState }));
    }
    function toggleElementMidiNoteMode() {
        dispatch(setGridElementIsMidiNote({ index, isMidiNote: !isMidiNoteModeState }));
    }


    return (
        <View>

            {/* Name control */}
            <View>
                <Text>Name:</Text>
                <Input
                    value={nameState}
                    onChangeText={value => dispatch(setGridElementName({ index, name: value }))}
                />
            </View>


            {/* Note Control */}
            <View>
                <Text>Note: {Object.values(NOTE)[noteNumberState % 12]}</Text>
                <Piano noteNumber={noteNumberState % 12}
                    setNoteNumber={(noteNumber) => dispatch(setGridElementNote({ index, newNoteNumber: noteNumber }))}
                />
            </View>


            {/* Octave Control*/}
            <View>
                <Text>Octave: {Math.floor(noteNumberState / 12)}</Text>
                <Slider
                    maximumValue={10} minimumValue={0} step={1}
                    value={Math.floor(noteNumberState / 12)}
                    onValueChange={value => dispatch(setGridElementOctave({ index, newNoteOctave: value }))}
                />
            </View>

            {/* Velocity Control */}
            <View>
                <Text>Velocity Direction: {velocityState.isVertical ? "Vertical" : "Horizontal"}</Text>
                <Switch
                    value={velocityState.isVertical}
                    onChange={() => { dispatch(setGridElementVelocityIsVertical({ index, isVertical: !velocityState.isVertical })) }} />

                <Text>Velocity Floor: {velocityState.floor}</Text>
                <Slider
                    maximumValue={127} minimumValue={0} step={1}
                    value={velocityState.floor}
                    onValueChange={value => dispatch(setGridElementVelocityFloor({ index: index, floor: value }))}
                />

                <Text>Velocity Ceiling: {velocityState.ceiling}</Text>
                <Slider
                    maximumValue={127} minimumValue={0} step={1}
                    value={velocityState.ceiling}
                    onValueChange={value => dispatch(setGridElementVelocityCeiling({ index: index, ceiling: value }))}
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
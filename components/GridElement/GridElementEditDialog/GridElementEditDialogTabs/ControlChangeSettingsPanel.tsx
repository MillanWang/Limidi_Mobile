
import React, { useState } from 'react';
import { View, StyleSheet, } from 'react-native';
import { Input, Slider, Text, Switch, Button, } from "@rneui/themed";
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

    setGridElementControlChangeXIndex,
    setGridElementControlChangeYIndex
} from '../../../../redux/slices/GridPresetsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface ControlChangeSettingsPanelProps {
    index: number,
}

enum ControlChangeDirection {
    horizontal,
    vertical,
    xy
}

export function ControlChangeSettingsPanel({ index, }: ControlChangeSettingsPanelProps) {
    const currentGridElementState = useAppSelector(state => state.gridPresetsReducer.currentGridPreset.gridElements[index]);
    const isMidiNoteModeState = currentGridElementState.isMidiNote;

    const nameState = currentGridElementState.name;


    const iconName = currentGridElementState.controlChangeState.iconName;
    const xAxisControlIndex = currentGridElementState.controlChangeState.xAxisControlIndex;
    const yAxisControlIndex = currentGridElementState.controlChangeState.yAxisControlIndex;


    const dispatch = useAppDispatch();

    function toggleElementMidiNoteMode() {
        dispatch(setGridElementIsMidiNote({ index, isMidiNote: !isMidiNoteModeState }));
    }

    const [mostRecentValidXControlIndex, setMostRecentValidXControlIndex] = useState(xAxisControlIndex)
    const [mostRecentValidYControlIndex, setMostRecentValidYControlIndex] = useState(yAxisControlIndex)

    const [ccDirection, setCcDirection] = useState(ControlChangeDirection.horizontal);

    function horizontalOnPress() {
        setCcDirection(ControlChangeDirection.horizontal)
        dispatch(setGridElementControlChangeXIndex({ index, yAxisControlIndex: -1 }))

    }
    function verticalOnPress() {
        setCcDirection(ControlChangeDirection.vertical)
        dispatch(setGridElementControlChangeYIndex({ index, xAxisControlIndex: -1 }))
    }
    function xyOnPress() {
        setCcDirection(ControlChangeDirection.xy)
        dispatch(setGridElementControlChangeXIndex({ index, yAxisControlIndex: mostRecentValidYControlIndex }))
        dispatch(setGridElementControlChangeYIndex({ index, xAxisControlIndex: mostRecentValidXControlIndex }))
    }


    function horizontalCcIndexMinusOnPress() {
        if (mostRecentValidXControlIndex - 1 < 0) return;
        dispatch(setGridElementControlChangeXIndex({ index, xAxisControlIndex: mostRecentValidXControlIndex - 1 }))
        setMostRecentValidXControlIndex(mostRecentValidXControlIndex - 1)
    }
    function horizontalCcIndexPlusOnPress() {
        if (mostRecentValidXControlIndex + 1 > 127) return;
        dispatch(setGridElementControlChangeXIndex({ index, xAxisControlIndex: mostRecentValidXControlIndex + 1 }))
        setMostRecentValidXControlIndex(mostRecentValidXControlIndex + 1)
    }
    function verticalCcIndexMinusOnPress() {
        if (mostRecentValidYControlIndex - 1 < 0) return;
        dispatch(setGridElementControlChangeYIndex({ index, yAxisControlIndex: mostRecentValidYControlIndex - 1 }))
        setMostRecentValidYControlIndex(mostRecentValidYControlIndex - 1)
    }
    function verticalCcIndexPlusOnPress() {
        if (mostRecentValidYControlIndex + 1 > 127) return;
        dispatch(setGridElementControlChangeYIndex({ index, yAxisControlIndex: mostRecentValidYControlIndex + 1 }))
        setMostRecentValidYControlIndex(mostRecentValidYControlIndex + 1)
    }


    const modeButtonList = [
        {
            text: "Horizontal",
            enum: ControlChangeDirection.horizontal,
            onPress: horizontalOnPress,
        },
        {
            text: "Vertical",
            enum: ControlChangeDirection.vertical,
            onPress: verticalOnPress,
        },
        {
            text: "XY Bidirectional",
            enum: ControlChangeDirection.xy,
            onPress: xyOnPress,
        },


    ]
    return (
        <View>


            <View>
                <Text>Icon</Text>
            </View>


            <View>
                <Text>Control Change Orientation</Text>
                <View style={{ flexDirection: "row" }}>
                    {modeButtonList.map(element => {
                        return (
                            <Button
                                buttonStyle={{ backgroundColor: ccDirection === element.enum ? "black" : "blue" }}
                                onPress={element.onPress}
                                title={element.text}
                            />
                        )
                    })}
                </View>
            </View>

            {(ccDirection === ControlChangeDirection.horizontal || ccDirection === ControlChangeDirection.xy) &&
                <View>
                    <Text>Horizontal Control Change Index</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Button title="-" onPress={horizontalCcIndexMinusOnPress} />
                        <Text>{`${mostRecentValidXControlIndex}`}</Text>
                        <Button title="+" onPress={horizontalCcIndexPlusOnPress} />
                    </View>
                </View>
            }
            {(ccDirection === ControlChangeDirection.vertical || ccDirection === ControlChangeDirection.xy) &&
                <View>
                    <Text>Vertical Control Change Index</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Button title="-" onPress={verticalCcIndexMinusOnPress} />
                        <Text>{`${mostRecentValidYControlIndex}`}</Text>
                        <Button title="+" onPress={verticalCcIndexPlusOnPress} />
                    </View>
                </View>
            }


        </View>
    );
}// end GridElementEditMidiOptionsTab

const styles = StyleSheet.create({
    lockSwitchView: {
        flexDirection: "row",
        alignItems: 'center'
    },

});
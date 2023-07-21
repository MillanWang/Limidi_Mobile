
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
    const dispatch = useAppDispatch();
    const currentGridElementState = useAppSelector(state => state.gridPresetsReducer.currentGridPreset.gridElements[index]);
    const isMidiNoteModeState = currentGridElementState.isMidiNote;

    const nameState = currentGridElementState.name;

    const iconNameState = currentGridElementState.controlChangeState.iconName;
    const xAxisControlIndexState = currentGridElementState.controlChangeState.xAxisControlIndex;
    const yAxisControlIndexState = currentGridElementState.controlChangeState.yAxisControlIndex;


    const [ccDirection, setCcDirection] = useState(ControlChangeDirection.xy);

    function horizontalOnPress() {
        setCcDirection(ControlChangeDirection.horizontal)
        dispatch(setGridElementControlChangeXIndex({ index, xAxisControlIndex: Math.abs(xAxisControlIndexState) }))
        dispatch(setGridElementControlChangeYIndex({ index, yAxisControlIndex: -1 * yAxisControlIndexState }))
    }
    function verticalOnPress() {
        setCcDirection(ControlChangeDirection.vertical)
        dispatch(setGridElementControlChangeYIndex({ index, yAxisControlIndex: Math.abs(yAxisControlIndexState) }))
        dispatch(setGridElementControlChangeXIndex({ index, xAxisControlIndex: -1 * xAxisControlIndexState }))
    }
    function xyOnPress() {
        setCcDirection(ControlChangeDirection.xy)
        dispatch(setGridElementControlChangeXIndex({ index, xAxisControlIndex: Math.abs(xAxisControlIndexState) }))
        dispatch(setGridElementControlChangeYIndex({ index, yAxisControlIndex: Math.abs(yAxisControlIndexState) }))
    }


    function horizontalCcIndexMinusOnPress() {
        if (Math.abs(xAxisControlIndexState) - 1 < 0) return;
        dispatch(setGridElementControlChangeXIndex({ index, xAxisControlIndex: Math.abs(xAxisControlIndexState) - 1 }))
    }
    function horizontalCcIndexPlusOnPress() {
        if (Math.abs(xAxisControlIndexState) + 1 > 127) return;
        dispatch(setGridElementControlChangeXIndex({ index, xAxisControlIndex: Math.abs(xAxisControlIndexState) + 1 }))
    }
    function verticalCcIndexMinusOnPress() {
        if (Math.abs(yAxisControlIndexState) - 1 < 0) return;
        dispatch(setGridElementControlChangeYIndex({ index, yAxisControlIndex: Math.abs(yAxisControlIndexState) - 1 }))
    }
    function verticalCcIndexPlusOnPress() {
        if (Math.abs(yAxisControlIndexState) + 1 > 127) return;
        dispatch(setGridElementControlChangeYIndex({ index, yAxisControlIndex: Math.abs(yAxisControlIndexState) + 1 }))
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
                        <Text>{`${xAxisControlIndexState}`}</Text>
                        <Button title="+" onPress={horizontalCcIndexPlusOnPress} />
                    </View>
                </View>
            }
            {(ccDirection === ControlChangeDirection.vertical || ccDirection === ControlChangeDirection.xy) &&
                <View>
                    <Text>Vertical Control Change Index</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Button title="-" onPress={verticalCcIndexMinusOnPress} />
                        <Text>{`${yAxisControlIndexState}`}</Text>
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
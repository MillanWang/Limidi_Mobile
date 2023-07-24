
import React, { ReactComponentElement, ReactElement, useState } from 'react';
import { View, StyleSheet, } from 'react-native';
import { Input, Slider, Text, Switch, Button, Icon, Tooltip, Dialog } from "@rneui/themed";
import { NOTE, } from '../../../../constants/MIDI_Notes';
import { Piano } from '../../../Piano';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import {
    setGridElementControlChangeIconString,
    setGridElementControlChangeXIndex,
    setGridElementControlChangeYIndex
} from '../../../../redux/slices/GridPresetsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { iconNames } from '../../../../constants/IconNames';




export interface ControlChangeSettingsPanelProps {
    index: number,
}

export enum ControlChangeDirection {
    horizontal = "horizontal",
    vertical = "vertical",
    xy = "xy",
}

export function getControlChangeDirection(xAxisControlIndexState: number, yAxisControlIndexState: number,) {
    return xAxisControlIndexState > 0 && yAxisControlIndexState > 0 ?
        ControlChangeDirection.xy :
        xAxisControlIndexState > 0 ?
            ControlChangeDirection.horizontal : ControlChangeDirection.vertical
}

export function ControlChangeSettingsPanel({ index, }: ControlChangeSettingsPanelProps) {
    const dispatch = useAppDispatch();
    const currentGridElementState = useAppSelector(state => state.gridPresetsReducer.currentGridPreset.gridElements[index]);
    const isMidiNoteModeState = currentGridElementState.isMidiNote;

    const nameState = currentGridElementState.name;
    const colorState = currentGridElementState.colorState;

    const iconNameState = currentGridElementState.controlChangeState.iconName;
    const xAxisControlIndexState = currentGridElementState.controlChangeState.xAxisControlIndex;
    const yAxisControlIndexState = currentGridElementState.controlChangeState.yAxisControlIndex;

    const [iconDialogOpen, setIconDialogOpen] = React.useState(false);

    const [ccDirection, setCcDirection] = useState(getControlChangeDirection(xAxisControlIndexState, yAxisControlIndexState));

    function horizontalModeOnPress() {
        setCcDirection(ControlChangeDirection.horizontal)
        dispatch(setGridElementControlChangeXIndex({ index, xAxisControlIndex: Math.abs(xAxisControlIndexState) }))
        dispatch(setGridElementControlChangeYIndex({ index, yAxisControlIndex: -1 * yAxisControlIndexState }))
    }
    function verticalModeOnPress() {
        setCcDirection(ControlChangeDirection.vertical)
        dispatch(setGridElementControlChangeYIndex({ index, yAxisControlIndex: Math.abs(yAxisControlIndexState) }))
        dispatch(setGridElementControlChangeXIndex({ index, xAxisControlIndex: -1 * xAxisControlIndexState }))
    }
    function xyModeOnPress() {
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
            onPress: horizontalModeOnPress,
        },
        {
            text: "Vertical",
            enum: ControlChangeDirection.vertical,
            onPress: verticalModeOnPress,
        },
        {
            text: "XY Bidirectional",
            enum: ControlChangeDirection.xy,
            onPress: xyModeOnPress,
        },


    ]
    return (
        <View>
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


            <View>
                <Text>Icon</Text>
                <View style={{ flexDirection: "row" }}>
                    <View
                        style={{
                            backgroundColor: colorState.pressedColor,
                            height: 50, width: 50,
                            justifyContent: "center",
                            borderRadius: 100 //Big enough to be a circle
                        }}
                    >
                        <Icon
                            //Changes on move as one option. Hard set to a value as another option
                            name={"move"}
                            type="ionicon"
                            color={colorState.unpressedColor}
                        />
                    </View>

                    <Button title="Set Icon" onPress={() => { setIconDialogOpen(true) }} />
                    <IconSelectDialog dialogVisible={iconDialogOpen} setDialogVisible={setIconDialogOpen} index={index} />
                </View>
            </View>


        </View>
    );
}// end GridElementEditMidiOptionsTab

interface IconSelectDialogProps {
    index: number,
    dialogVisible: boolean, setDialogVisible(dialogVisible: boolean): void,
}

function IconSelectDialog({ index, dialogVisible, setDialogVisible, }: IconSelectDialogProps) {

    const dispatch = useAppDispatch();
    const currentGridElementState = useAppSelector(state => state.gridPresetsReducer.currentGridPreset.gridElements[index]);
    const isMidiNoteModeState = currentGridElementState.isMidiNote;

    const nameState = currentGridElementState.name;
    const colorState = currentGridElementState.colorState;

    const iconNameState = currentGridElementState.controlChangeState.iconName;
    const xAxisControlIndexState = currentGridElementState.controlChangeState.xAxisControlIndex;
    const yAxisControlIndexState = currentGridElementState.controlChangeState.yAxisControlIndex;

    const iconsToUse: string[] = iconNames[getControlChangeDirection(xAxisControlIndexState, yAxisControlIndexState)]
    return (
        <Dialog isVisible={dialogVisible} >

            <Text>Grid Element: 78987</Text>
            {iconsToUse.map((iconName) => {
                return (<>
                    <Text>{iconName}</Text>
                </>)
            })}

            <Button
                title={"Save"}
                onPress={() => { setDialogVisible(false) }}
            />
        </Dialog>
    );
}

const styles = StyleSheet.create({
    lockSwitchView: {
        flexDirection: "row",
        alignItems: 'center'
    },

});
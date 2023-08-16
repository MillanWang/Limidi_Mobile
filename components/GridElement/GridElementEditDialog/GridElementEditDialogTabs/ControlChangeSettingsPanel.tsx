
import React, { ReactComponentElement, ReactElement, useState } from 'react';
import { View, StyleSheet, ScrollView, } from 'react-native';
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
import { iconNames, ioniconIconNameAliases, ioniconValidIconNames } from '../../../../constants/IconNames';




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
        if (!ioniconValidIconNames.includes(iconNameState)) {
            // Default directional name
            dispatch(setGridElementControlChangeIconString({ index, iconString: "swap-horizontal" }))
        }
    }
    function verticalModeOnPress() {
        setCcDirection(ControlChangeDirection.vertical)
        dispatch(setGridElementControlChangeYIndex({ index, yAxisControlIndex: Math.abs(yAxisControlIndexState) }))
        dispatch(setGridElementControlChangeXIndex({ index, xAxisControlIndex: -1 * xAxisControlIndexState }))
        if (!ioniconValidIconNames.includes(iconNameState)) {
            // Default directional name
            dispatch(setGridElementControlChangeIconString({ index, iconString: "swap-vertical" }))
        }
    }
    function xyModeOnPress() {
        setCcDirection(ControlChangeDirection.xy)
        dispatch(setGridElementControlChangeXIndex({ index, xAxisControlIndex: Math.abs(xAxisControlIndexState) }))
        dispatch(setGridElementControlChangeYIndex({ index, yAxisControlIndex: Math.abs(yAxisControlIndexState) }))
        if (!ioniconValidIconNames.includes(iconNameState)) {
            // Default directional name
            dispatch(setGridElementControlChangeIconString({ index, iconString: "move" }))
        }
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
                    <IconWithTitle name={iconNameState} backgroundColor={colorState.pressedColor} iconColor={colorState.unpressedColor} />
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

    const directionalIcons: string[] = iconNames[getControlChangeDirection(xAxisControlIndexState, yAxisControlIndexState)]

    const iconTouchHandler = (name: string) => {
        return () => {
            dispatch(setGridElementControlChangeIconString({ index, iconString: name }))
        }
    }

    const iconsPerRow = 9;
    const generalIconRows = getGeneralIconNameRows(iconsPerRow);


    return (
        <Dialog isVisible={dialogVisible}>
            <ScrollView style={{ height: 300 }}>
                <Text>Grid Element: {index}</Text>
                <Text>Directional Icons</Text>
                <View style={{ flexDirection: "row" }}>
                    {directionalIcons.map((iconName, i) => {
                        return (<Button
                            onPress={iconTouchHandler(iconName)}
                            color={"#ffffff"}
                            buttonStyle={{ borderWidth: 3, borderColor: iconName === iconNameState ? "#000000" : "#ffffff" }}
                            key={`directional_icon-${i}`}
                        >
                            <IconWithTitle name={iconName} backgroundColor={colorState.pressedColor} iconColor={colorState.unpressedColor} />
                        </Button>)
                    })}
                </View>

                <Text>General Icons</Text>
                <View style={{ flexDirection: "column" }}>
                    {generalIconRows.map((row, i) => {
                        return (
                            <View style={{ flexDirection: "row" }} key={`icon_row-${i}`}>
                                {row.map((iconName, j) => {
                                    return (
                                        <Button
                                            onPress={iconTouchHandler(iconName)}
                                            color={"#ffffff"}
                                            buttonStyle={{ borderWidth: 3, borderColor: iconName === iconNameState ? "#000000" : "#ffffff" }}
                                            key={`icon_row-${i}_elem-${j}_name-${iconName}`}
                                        >
                                            <IconWithTitle name={iconName} backgroundColor={colorState.pressedColor} iconColor={colorState.unpressedColor} />
                                        </Button>
                                    )
                                })}
                            </View>
                        )
                    })}
                </View>

            </ScrollView>
            <Button
                title={"Save"}
                onPress={() => { setDialogVisible(false) }}
            />
        </Dialog>
    );
}

function getGeneralIconNameRows(iconsPerRow: number) {
    const listOfRows = [];
    for (let i = 0; i < ioniconValidIconNames.length; i++) {
        if (i % iconsPerRow === 0) {
            listOfRows.push([ioniconValidIconNames[i]])
        } else {
            listOfRows[Math.floor(i / iconsPerRow)].push(ioniconValidIconNames[i])
        }
    }
    return listOfRows

}

interface IconWithTitleProps {
    name: string,
    backgroundColor: string,
    iconColor: string,
    showTitle?: boolean
}
function IconWithTitle({ name, backgroundColor, iconColor, }: IconWithTitleProps) {
    let formattedName = ioniconIconNameAliases[name] ?? name.replaceAll("logo-", "").replaceAll("ios-", "").replaceAll("-", " ");
    formattedName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);

    return (
        <View style={{
            alignItems: "center",
            width: 60
        }}>
            <View
                style={{
                    backgroundColor,
                    height: 50, width: 50,
                    justifyContent: "center",
                    borderRadius: 100, //Big enough to be a circle
                }}
            >
                <Icon name={name} type="ionicon" color={iconColor} />
            </View>
            <Text>{formattedName}</Text>
        </View>
    )
}



const styles = StyleSheet.create({
    lockSwitchView: {
        flexDirection: "row",
        alignItems: 'center'
    },

});
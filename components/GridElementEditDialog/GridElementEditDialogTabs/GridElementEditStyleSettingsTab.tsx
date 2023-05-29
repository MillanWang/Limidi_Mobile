
import React, { useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,

} from 'react-native';
import { Icon, Text, Switch } from "@rneui/themed";

import { ColorSelector } from '../../ColorSelector';

import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import {
    setGridElementUnpressedColor,
    setGridElementPressedColor,
    setGridElementStyleLocked,
} from '../../../redux/slices/ColorServiceSlice';

export interface GridElementEditStyleProps {
    index: number,
}



// This whole tab is gonna need a lot of review
/* 
-Lock should be moved up to the tab selection area
-Should only have selection for pressed and unpressed color here
-Option to apply a color 
 */

export function GridElementEditStyleSettingsTab({ index, }: GridElementEditStyleProps) {

    const currentGridElementState = useAppSelector(state => state.gridPresetsReducer.currentGridPreset.gridElements[index]);
    const colorState = currentGridElementState.colorState;
    const lockedState = currentGridElementState.isLocked;

    const colorPresetsState = useAppSelector(state => state.colorServiceReducer.colorPresets);
    const dispatch = useAppDispatch();

    const [currentPreset, setCurrentPreset] = useState('Default'); //Possibly not needed?????


    function setColors(unpressedColor: string, pressedColor: string): void {
        dispatch(setGridElementUnpressedColor({ index, unpressedColor }));
        dispatch(setGridElementPressedColor({ index, pressedColor }));
    }

    function toggleStyleLock() {
        dispatch(setGridElementStyleLocked({ index, locked: !lockedState}));
    }



    return (
        <View style={styles.styleSettingsContainer}>
            <View style={styles.lockSwitchView}>
                <Text>Lock Element Style: </Text>
                <Switch onChange={toggleStyleLock} value={lockedState}></Switch>
            </View>


            <View style={styles.colorSelectorContainers}>
                <ColorSelector colorTitle="Unpressed Color : " color={colorState.unpressedColor} setColor={(unpressedColor) => { dispatch(setGridElementUnpressedColor({ index, unpressedColor })) }} />
                <ColorSelector colorTitle="Pressed Color : " color={colorState.pressedColor} setColor={(pressedColor) => { dispatch(setGridElementPressedColor({ index, pressedColor })) }} />

            </View>
            {/* Color Presets */}
            <View style={styles.colorPresetContainer} >
                {/* Save current as preset */}

                {/* Load preset */}
                <ScrollView style={styles.colorPresetSelector}>
                    {colorPresetsState.map(preset => {
                        return (
                            <View
                                style={{ backgroundColor: preset.unpressedColor, ...styles.colorPreset }}
                                key={`ColorPreset_${preset.name}`}
                                onTouchEndCapture={() => { setColors(preset.unpressedColor, preset.pressedColor); setCurrentPreset(preset.name); }}
                            >
                                <Text style={{ color: preset.pressedColor, ...styles.colorPresetText }}>
                                    {preset.name}
                                </Text>
                                {currentPreset === preset.name &&
                                    <Icon name="done" color={preset.pressedColor} />
                                }
                            </View>
                        );
                    })}
                </ScrollView>
                {/* TODO: COLOR PRESET CRUD */}

                <View style={{ width: "40 %" }}>
                    <Text>Current Preset : {currentPreset}</Text>
                </View>

            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    styleSettingsContainer: {
        flex: 1,
        flexDirection: "column",
    },
    lockSwitchView: {
        flexDirection: "row",
        alignItems: 'center'
    },
    colorSelectorContainers: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-evenly',
    },
    colorPresetContainer: {
        height: 150,
        flexDirection: 'row'
    },
    colorPresetSelector: {
        width: "60 %"
    },
    colorPreset: {
        borderWidth: 1,
        height: 30,
        flexDirection: 'row',
    },
    colorPresetText: {
        alignSelf: "center",
    }
});
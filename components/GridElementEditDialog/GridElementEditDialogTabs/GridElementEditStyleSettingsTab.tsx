
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Icon, Text, } from "@rneui/themed";

import { ColorSelector } from '../../ColorSelector';

import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import {
    setGridElementUnpressedColor,
    setGridElementPressedColor,
} from '../../../redux/slices/ColorServiceSlice';

export interface GridElementEditStyleProps {
    index: number,
}

export function GridElementEditStyleSettingsTab({ index, }: GridElementEditStyleProps) {

    const currentGridElementColorState = useAppSelector(state => state.colorServiceReducer.gridElementColors[index]);
    const colorPresetsState = useAppSelector(state => state.colorServiceReducer.colorPresets);
    const dispatch = useAppDispatch();

    const [currentPreset, setCurrentPreset] = useState('Default'); //Possibly not needed?????



    function setColors(unpressedColor: string, pressedColor: string): void {
        dispatch(setGridElementUnpressedColor({ index, unpressedColor }));
        dispatch(setGridElementPressedColor({ index, pressedColor }));
    }



    return (
        <View style={styles.styleSettingsContainer}>
            <View style={styles.colorSelectorContainers}>
                <ColorSelector colorTitle="Unpressed Color : " color={currentGridElementColorState.unpressedColor} setColor={(unpressedColor) => { dispatch(setGridElementUnpressedColor({ index, unpressedColor })) }} />
                <ColorSelector colorTitle="Pressed Color : " color={currentGridElementColorState.pressedColor} setColor={(pressedColor) => { dispatch(setGridElementPressedColor({ index, pressedColor })) }} />

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
                {/* TODO: COLOR PRESET CRUD
                
                <View style={{ width: "40 %" }}>
                    <Text>Current Preset : {currentPreset}</Text>
                    <Button onPress={updatePresetColors}>Update Preset Colors</Button>
                </View> */}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    styleSettingsContainer: {
        flex: 1,
        flexDirection: "column",
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
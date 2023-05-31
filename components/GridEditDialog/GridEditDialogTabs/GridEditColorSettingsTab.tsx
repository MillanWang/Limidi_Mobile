import { Button, Icon, } from "@rneui/themed";
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { setGridColorPresetGlobally } from '../../../redux/slices/GridPresetsSlice';

export function GridEditStyleSettingsTab(): JSX.Element {

    const colorPresetsState = useAppSelector(state => state.colorServiceReducer.colorPresets);
    const [currentPreset, setCurrentPreset] = useState('Default');
    const dispatch = useAppDispatch();

    return (
        <View style={styles.colorPresetContainer}>

            <ScrollView style={styles.colorPresetSelector}>
                {colorPresetsState.map(preset => {
                    return (
                        <View
                            style={{ backgroundColor: preset.unpressedColor, ...styles.colorPreset }}
                            key={`ColorPreset_${preset.name}`}
                            onTouchEndCapture={() => { setCurrentPreset(preset.name); }}
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
            <View style={styles.colorPresetOptions}>
                <Text>Current Preset : {currentPreset}</Text>
                <Button onPress={() => { dispatch(setGridColorPresetGlobally(currentPreset)) }}>Apply Color Preset Globally</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    colorPresetContainer: {
        height: 250,
        flexDirection: 'row',
        paddingTop: 10,
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
    },
    colorPresetOptions: {
        width: "40 %"
    }
});
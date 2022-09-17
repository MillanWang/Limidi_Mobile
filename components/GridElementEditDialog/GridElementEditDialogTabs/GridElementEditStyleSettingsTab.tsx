
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Icon, Text, } from "@rneui/themed";

import { ColorSelector } from '../../ColorSelector';
import { ColorPresetService } from '../../../services/ColorPresetService';

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
        <View style={{ flex: 1, flexDirection: "column", }}>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-evenly', }}>
                <ColorSelector colorTitle="Unpressed Color : " color={currentGridElementColorState.unpressedColor} setColor={(unpressedColor) => { dispatch(setGridElementUnpressedColor({ index, unpressedColor })) }} />
                <ColorSelector colorTitle="Pressed Color : " color={currentGridElementColorState.pressedColor} setColor={(pressedColor) => { dispatch(setGridElementPressedColor({ index, pressedColor })) }} />

            </View>
            {/* Color Presets */}
            <View style={{ height: 150, flexDirection: 'row' }} >
                {/* Save current as preset */}

                {/* Load preset */}
                <ScrollView style={{ width: "60 %" }}>
                    {colorPresetsState.map(preset => {
                        return (
                            <View
                                style={{ borderWidth: 1, height: 30, flexDirection: 'row', backgroundColor: preset.unpressedColor }}
                                key={`ColorPreset_${preset.name}`}
                                onTouchEndCapture={() => { setColors(preset.unpressedColor, preset.pressedColor); setCurrentPreset(preset.name); }}
                            >
                                <Text style={{ alignSelf: "center", color: preset.pressedColor }}>
                                    {preset.name}
                                </Text>
                                {currentPreset === preset.name &&

                                    <Icon name="done" color={preset.pressedColor} />
                                }
                            </View>
                        );
                    })}
                </ScrollView>
                {/* <View style={{ width: "40 %" }}>
                    <Text>Current Preset : {currentPreset}</Text>
                    <Button onPress={updatePresetColors}>Update Preset Colors</Button>
                </View> */}

            </View>
        </View>
    );
}
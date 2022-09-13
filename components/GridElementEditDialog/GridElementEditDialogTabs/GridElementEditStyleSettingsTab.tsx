
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Icon, Text, } from "@rneui/themed";

import { ColorSelector } from '../../ColorSelector';
import { ColorPresetService } from '../../../services/ColorPresetService';


export interface GridElementEditStyleProps {
    colorPresetService: ColorPresetService,

    unpressedColor: string, setUnpressedColor(color: string): void,
    pressedColor: string, setPressedColor(color: string): void,
}

export function GridElementEditStyleSettingsTab(
    {
        colorPresetService,

        unpressedColor, setUnpressedColor,
        pressedColor, setPressedColor,
    }: GridElementEditStyleProps) {


    const [currentPreset, setCurrentPreset] = useState('Default');


    function setColorsToPreset(presetName: string | null) {
        if (presetName) {
            setCurrentPreset(presetName);
            const presetColors = colorPresetService.getColorPreset(presetName)?.getColors();
            if (presetColors) {
                setUnpressedColor(presetColors.unpressedColor);
                setPressedColor(presetColors.pressedColor);
            }
        }
    }

    function updatePresetColors() {
        colorPresetService.updateColorPresetColors(currentPreset, unpressedColor, pressedColor);
    }


    return (
        <View style={{ flex: 1, flexDirection: "column", }}>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-evenly', }}>
                <ColorSelector colorTitle="Unpressed Color : " color={unpressedColor} setColor={setUnpressedColor} />
                <ColorSelector colorTitle="Pressed Color : " color={pressedColor} setColor={setPressedColor} />

            </View>
            {/* Color Presets */}
            <View style={{ height: 150, flexDirection: 'row' }} >
                {/* Save current as preset */}

                {/* Load preset */}
                <ScrollView style={{ width: "60 %" }}>
                    {colorPresetService.getAllColorPresets().map(preset => {
                        return (
                            <View
                                style={{ borderWidth: 1, height: 30, flexDirection: 'row', backgroundColor: preset.getColors().unpressedColor }}
                                key={`ColorPreset_${preset.getPresetName()}`}
                                onTouchEndCapture={() => setColorsToPreset(preset.getPresetName())}
                            >
                                <Text style={{ alignSelf: "center", color: preset.getColors().pressedColor }}>
                                    {preset.getPresetName()}
                                </Text>
                                {currentPreset === preset.getPresetName() &&

                                    <Icon name="done" color={preset.getColors().pressedColor} />
                                }
                            </View>
                        );
                    })}
                </ScrollView>
                <View style={{ width: "40 %" }}>
                    <Text>Current Preset : {currentPreset}</Text>
                    <Button onPress={updatePresetColors}>Update Preset Colors</Button>
                </View>

            </View>
        </View>
    );
}
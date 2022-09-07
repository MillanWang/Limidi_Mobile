
import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, } from "@rneui/themed";

import ColorPicker from 'react-native-wheel-color-picker'; //https://github.com/Naeemur/react-native-wheel-color-picker
import DropDownPicker from 'react-native-dropdown-picker';

import { ColorSelector } from '../../ColorSelector';
import { ColorPresetService } from '../../../services/ColorPresetService';


export interface GridElementEditStyleProps {
    colorPresetService: ColorPresetService,

    textColor: string, setTextColor(color: string): void,
    unpressedColor: string, setUnpressedColor(color: string): void,
    pressedColor: string, setPressedColor(color: string): void,
}

export function GridElementEditStyleSettingsTab(
    {
        colorPresetService,
        textColor, setTextColor,
        unpressedColor, setUnpressedColor,
        pressedColor, setPressedColor,
    }: GridElementEditStyleProps) {


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(colorPresetService.getAllColorPresets().map(preset => {
        return {
            label: preset.getPresetName(),
            value: preset.getPresetName()
        }
    }));

    function setColorsToPreset(presetName: string | null) {
        if (presetName) {
            const presetColors = colorPresetService.getColorPreset(presetName)?.getColors();
            if (presetColors) {
                setTextColor(presetColors.textColor);
                setUnpressedColor(presetColors.unpressedColor);
                setPressedColor(presetColors.pressedColor);
            }
        }
    }

    return (
        <View style={{ flex: 1, flexDirection: "column", }}>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-evenly', }}>
                <ColorSelector colorTitle="Text Color : " color={textColor} setColor={setTextColor} />
                <ColorSelector colorTitle="Unpressed Color : " color={unpressedColor} setColor={setUnpressedColor} />
                <ColorSelector colorTitle="Pressed Color : " color={pressedColor} setColor={setPressedColor} />

            </View>
            {/* Color Presets */}
            <View style={{ height: 150 }} >
                {/* Save current as preset */}
                {/* Load preset */}
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen} setValue={setValue} setItems={setItems}
                    onChangeValue={setColorsToPreset}
                />
            </View>
        </View>
    );
}
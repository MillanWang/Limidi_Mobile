
import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, } from "@rneui/themed";

import ColorPicker from 'react-native-wheel-color-picker'; //https://github.com/Naeemur/react-native-wheel-color-picker


interface ColorSelectorProps {
    colorTitle: string,
    color: string,
    setColor(color: string): void
}

export function ColorSelector({ colorTitle, color, setColor, }: ColorSelectorProps) {
    return (
        <View style={{ width: 200, height: 200 }}>
            <ColorPicker color={color} onColorChange={setColor} thumbSize={35} swatches={false} />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>{colorTitle}</Text>
                <View style={{ marginRight: 5, height: 10, width: 20, backgroundColor: color }}></View>
                <Text>{color}</Text>
            </View>
        </View>
    );
}
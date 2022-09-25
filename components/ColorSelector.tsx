
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, } from "@rneui/themed";

import ColorPicker from 'react-native-wheel-color-picker'; //https://github.com/Naeemur/react-native-wheel-color-picker


interface ColorSelectorProps {
    colorTitle: string,
    color: string,
    setColor(color: string): void
}

export function ColorSelector({ colorTitle, color, setColor, }: ColorSelectorProps) {
    return (
        <View style={styles.colorSelectorContainer}>
            <ColorPicker color={color} onColorChange={setColor} thumbSize={35} swatches={false} />
            <View style={styles.colorInfoContainer}>
                <Text>{colorTitle}</Text>
                <View style={{ backgroundColor: color, ...styles.currentColorView }}></View>
                <Text>{color}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    colorSelectorContainer: {
        width: 200,
        height: 200
    },
    colorInfoContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    currentColorView: { marginRight: 5, height: 10, width: 20, },

});
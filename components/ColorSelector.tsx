
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from "@rneui/themed";

import {
    ALL_ELEMENTAL_COLORS,
    invertHex,
} from '../constants/Colors';



interface ColorSelectorProps {
    colorTitle: string,
    color: string,
    setColor(color: string): void
}



export function ColorSelector({ colorTitle, color, setColor, }: ColorSelectorProps) {
    const [colorSeriesIndex, setColorSeriesIndex] = useState(0)
    return (
        <View style={styles.colorSelectorContainer}>

            <View style={{
                flexDirection: "row",
            }}>
                {ALL_ELEMENTAL_COLORS.map((element, i) => {
                    return (
                        <Button
                            title={element.elementName}
                            onPress={() => { setColorSeriesIndex(i) }}
                            style={{
                                margin: 1,
                            }}
                        />
                    )
                })}


            </View>
            <View style={{
                backgroundColor: "black",
                flexDirection: "row"
            }}>

                {ALL_ELEMENTAL_COLORS[colorSeriesIndex].colorGrid.map((element) => {
                    // Columns
                    return (
                        <View style={{
                            flex: 1
                        }}>
                            {element.map(currentColor => {
                                // Elements in a coluimn
                                return (
                                    <View
                                        style={{
                                            backgroundColor: currentColor,
                                            // borderColor: "black",
                                            borderColor: color !== currentColor ? currentColor : invertHex(color),
                                            borderWidth: 3,
                                            // flex:1,
                                            // width: "100%",
                                            // height: "12%",
                                        }}
                                        onTouchStart={() => { setColor(currentColor) }}
                                    >
                                        <Text />{/* Used to boost the height... Perhaps not needed if parent height is set */}
                                    </View>
                                );
                            })}
                        </View>
                    )
                })}
            </View>

            <View style={styles.colorInfoContainer}>
                <Text>{colorTitle}</Text>
                <View style={{ backgroundColor: color, ...styles.currentColorView }}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    colorSelectorContainer: {
        width: 250,
        height: 250,
        justifyContent: "center",
        textAlign: "center",
        // backgroundColor: "red"
    },
    colorInfoContainer: {
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    currentColorView: { marginRight: 5, height: 10, width: 20, },

});
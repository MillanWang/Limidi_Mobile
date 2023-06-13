import React, { useRef, useState } from 'react';
import {
    Animated,
    StyleSheet,
    View
} from 'react-native';
import { Text, } from "@rneui/themed";
import { useAppSelector } from '../../../redux/hooks';


interface ControlChangeProps {
    index: number,
}

export default function ControlChange({ index }: ControlChangeProps) {
    const currentGridElementState = useAppSelector(state => state.gridPresetsReducer.currentGridPreset.gridElements[index]);
    const nameState = currentGridElementState.name;
    const colorState = currentGridElementState.colorState;

    // Needed for positional knowledge. Can probably be factored out to grid element once more certain about it
    const [elementHeight, setElementHeight] = useState(1);
    const [elementWidth, setElementWidth] = useState(1);
    function onLayout(event: any) {
        setElementHeight(event.nativeEvent.layout.height);
        setElementWidth(event.nativeEvent.layout.width);
    }

    function logPositionalPercent(event: any): void {
        console.log("position")
        console.log(`Height:${100 * event.nativeEvent.locationY / elementHeight}%`)
        console.log(`Width:${100 * event.nativeEvent.locationX / elementWidth}%`)
    }

    return (
        <>
            <View
                style={{ ...styles.gridElementBasePressedView, backgroundColor: colorState.unpressedColor, }}
                onLayout={onLayout}
                onTouchMove={logPositionalPercent}
                onTouchStart={logPositionalPercent}
            >
                <Text style={{ color: colorState.pressedColor, }} >HEY CC</Text>
            </View>
        </>
    );
}



const styles = StyleSheet.create({
    gridElementBasePressedView: {
        flex: 1,
    },
    gridElementUnpressedView: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    gridElementEditView: {
        flexDirection: "row",
        borderColor: '#ffffff'
    }
});
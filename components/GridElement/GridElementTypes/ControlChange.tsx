import React, { useRef, useState } from 'react';
import {
    Animated,
    GestureResponderEvent,
    StyleSheet,
    View,
} from 'react-native';
import { Text, Icon } from "@rneui/themed";
import { useAppSelector } from '../../../redux/hooks';
import { useDesktopCommunication } from '../../../hooks/useDesktopCommunication';
import { createMidiControlChange } from '../../../constants/MIDI_Notes';
// import { Icon } from '@rneui/base';


interface ControlChangeProps {
    index: number,
}

const ICON_SIZE = 33
const TOP_BAR_HEIGHT = 60;

export default function ControlChange({ index }: ControlChangeProps) {
    const currentGridState = useAppSelector(state => state.gridPresetsReducer.currentGridPreset);
    const { rowCount, columnCount } = currentGridState
    const currentGridElementState = useAppSelector(state => state.gridPresetsReducer.currentGridPreset.gridElements[index])
    const nameState = currentGridElementState.name;
    const colorState = currentGridElementState.colorState;

    const { sendMidiControlChange } = useDesktopCommunication();

    // Positional knowledge
    const [elementWidth, setElementWidth] = useState(1);
    const [elementHeight, setElementHeight] = useState(1);
    const [spaceFromLeft, setSpaceFromLeft] = useState(1);
    const [spaceFromTop, setSpaceFromTop] = useState(1);



    function onLayout(event: any) {
        setElementWidth(event.nativeEvent.layout.width);
        setElementHeight(event.nativeEvent.layout.height);
        console.log(event.nativeEvent.layout.height);
        setSpaceFromLeft(((index) % columnCount) * event.nativeEvent.layout.width)
        setSpaceFromTop(TOP_BAR_HEIGHT + (rowCount - Math.floor(index / columnCount) - 1) * event.nativeEvent.layout.height)
    }


    const [xPositionAbsolute, setXPositionAbsolute] = useState(elementWidth / 2)
    const [yPositionAbsolute, setYPositionAbsolute] = useState(elementHeight / 2)

    function logPositionalPercent(event: GestureResponderEvent): void {

        // TODO : Align the icon with the center instead of with the top left corner. Apple pencil type testing 

        setXPositionAbsolute(Math.min(elementWidth - ICON_SIZE, Math.max(0, event.nativeEvent.pageX - spaceFromLeft)))
        setYPositionAbsolute(Math.min(elementHeight - ICON_SIZE, Math.max(0, event.nativeEvent.pageY - spaceFromTop)))
        sendMidiControlChange(
            createMidiControlChange(
                4,
                Math.floor(127 * (event.nativeEvent.pageX - spaceFromLeft)/ elementWidth)
            )
        )

    }

    return (
        <>
            <View
                style={{ ...styles.gridElementBasePressedView, backgroundColor: colorState.unpressedColor, }}
                onLayout={onLayout}
                onTouchMove={logPositionalPercent}
                onTouchStart={logPositionalPercent}

            >

                <View
                    style={{
                        position: 'absolute',
                        top: yPositionAbsolute,
                        left: xPositionAbsolute,
                        backgroundColor: "red",
                        height: ICON_SIZE,
                        width: ICON_SIZE,
                    }}
                >

                    <Icon
                        name="rowing"
                        color={colorState.pressedColor}
                    />
                </View>
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
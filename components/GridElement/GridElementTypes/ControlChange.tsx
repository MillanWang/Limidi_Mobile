import React, { useRef, useState } from 'react';
import {
    Animated,
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
export default function ControlChange({ index }: ControlChangeProps) {
    const currentGridElementState = useAppSelector(state => state.gridPresetsReducer.currentGridPreset.gridElements[index]);
    const nameState = currentGridElementState.name;
    const colorState = currentGridElementState.colorState;

    const { sendMidiControlChange } = useDesktopCommunication();

    // Needed for positional knowledge. Can probably be factored out to grid element once more certain about it
    const [elementHeight, setElementHeight] = useState(1);
    const [elementWidth, setElementWidth] = useState(1);
    function onLayout(event: any) {
        setElementHeight(event.nativeEvent.layout.height);
        setElementWidth(event.nativeEvent.layout.width);
    }


    const [xPositionAbsolute, setXPositionAbsolute] = useState(elementWidth / 2)
    const [yPositionAbsolute, setYPositionAbsolute] = useState(elementHeight / 2)

    function logPositionalPercent(event: any): void {

        if (event.currentTarget === event.target) { // Got the background
            console.log(event.nativeEvent.target)
            setXPositionAbsolute(Math.min(elementWidth - ICON_SIZE, Math.max(0, event.nativeEvent.locationX)))
            setYPositionAbsolute(Math.min(elementHeight - ICON_SIZE, Math.max(0, event.nativeEvent.locationY)))

            sendMidiControlChange(
                createMidiControlChange(
                    4,
                    Math.floor(127 * event.nativeEvent.locationX / elementWidth)
                )
            )
        } else {
            //Touch started on the icon
            // TODO : Figure out how to get the position of the touch relative to the parent instead of relative to the icon
        }
    }

    return (
        <>
            <View
                style={{ ...styles.gridElementBasePressedView, backgroundColor: colorState.unpressedColor, }}
                onLayout={onLayout}
                onTouchMove={logPositionalPercent}
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
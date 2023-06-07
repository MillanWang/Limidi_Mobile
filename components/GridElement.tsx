import React, { useRef, useState } from 'react';
import {
    Animated,
    StyleSheet,
    View
} from 'react-native';
import { Text, } from "@rneui/themed";
import { useDesktopCommunication } from '../hooks/useDesktopCommunication';
import { createMidiMessage, } from '../constants/MIDI_Notes';
import GridElementEditDialog from './GridElementEditDialog/GridElementEditDialog';
import { useAppSelector } from '../redux/hooks';

const NOTE_ON = true;
const NOTE_OFF = false;

interface GridElementProps {
    index: number,

    //Grid Controls
    isPlayMode: boolean,
};


export default function GridElement(
    {
        index,
        isPlayMode
    }: GridElementProps
) {
    // Redux states
    const currentGridElementState = useAppSelector(state => state.gridPresetsReducer.currentGridPreset.gridElements[index]);
    const nameState = currentGridElementState.name;
    const noteNumberState = currentGridElementState.midiState.noteNumber;
    const velocityState = currentGridElementState.midiState.velocity;
    const colorState = currentGridElementState.colorState;

    const [sendMidiMessage] = useDesktopCommunication();
    const [elementHeight, setElementHeight] = useState(1);
    const [elementWidth, setElementWidth] = useState(1);
    const [dialogVisible, setDialogVisible] = useState(false);

    function playModeTouchStartHandler(event: any) {
        if (isPlayMode) {
            const velocity = getVelocityValue(event);
            fadeOut(Math.max(velocity / 127, 0.25)); // 25% as minimum opacity drop for really low velocities
            sendMidiMessage(createMidiMessage(noteNumberState, velocity, NOTE_ON));
        } else {
            //Tap in  edit mode shows dialog
            setDialogVisible(true);
        }
    }

    function playModeTouchEndHandler() {
        if (isPlayMode) {
            fadeIn();
            /* No velocity on note off*/
            sendMidiMessage(createMidiMessage(noteNumberState, 0, NOTE_OFF));
        }
    }

    function getVelocityValue(event: any): number {
        if (velocityState.isVertical) {
            return Math.floor(velocityState.floor + (velocityState.ceiling - velocityState.floor) * (1 - event.nativeEvent.locationY / elementHeight))
        } else {
            return Math.floor(velocityState.floor + (velocityState.ceiling - velocityState.floor) * (event.nativeEvent.locationX / elementWidth))
        }
    }

    function onLayout(event: any) {
        setElementHeight(event.nativeEvent.layout.height);
        setElementWidth(event.nativeEvent.layout.width);
    }

    const fadeAnim = useRef(new Animated.Value(1)).current;
    function fadeIn() {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();
    };
    function fadeOut(velocityPercent: number) {
        Animated.timing(fadeAnim, {
            toValue: 1 - velocityPercent,
            duration: 5,
            useNativeDriver: true
        }).start();
    };


    return (
        <View style={{ ...styles.gridElementBasePressedView, backgroundColor: colorState.pressedColor, }} onLayout={onLayout}>
            <Animated.View
                style={{
                    ...styles.gridElementBasePressedView,
                    opacity: fadeAnim,
                    backgroundColor: colorState.unpressedColor,
                }}
                onTouchStart={playModeTouchStartHandler}
                onTouchEnd={playModeTouchEndHandler}
            >

                {/* Play Mode */}
                {isPlayMode &&
                    <View style={styles.gridElementUnpressedView} >
                        <Text style={{ color: colorState.pressedColor }}>
                            {nameState}
                        </Text>
                    </View>
                }

                {/* Edit mode */}
                {!isPlayMode &&
                    <View style={{ ...styles.gridElementUnpressedView, ...styles.gridElementEditView }}>
                        <Text style={{ color: colorState.pressedColor }}>
                            Edit {nameState}
                        </Text>
                    </View>
                }

                {/* Edit Dialog - MIDI & Style Settings */}
                <GridElementEditDialog
                    index={index}
                    dialogVisible={dialogVisible} setDialogVisible={setDialogVisible}
                />

            </Animated.View>
        </View>
    );
}; // end of GridElement




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

import React, { useRef, useState } from 'react';
import {
    Animated,
    StyleSheet,
    View
} from 'react-native';

import {
    Text,
} from "@rneui/themed";

import { MIDI_HTTP_Service } from '../services/MIDI_HTTP_Service';
import {
    createMidiMessage,
    createMidiMessage_OLD,
    NOTE,
} from '../constants/MIDI_Notes';

import GridElementEditDialog from './GridElementEditDialog/GridElementEditDialog';
import {
    DEFAULT_COLOR_PRESET
} from '../constants/Colors'
import { ColorPresetService } from '../services/ColorPresetService';

import { useAppSelector, useAppDispatch } from '../redux/hooks';

interface GridElementProps {

    index: number,

    //Services
    MIDI_HTTP_Service: MIDI_HTTP_Service,
    colorPresetService: ColorPresetService,

    //Grid Controls
    isPlayMode: boolean,
};

export default function GridElement(
    {
        index,

        MIDI_HTTP_Service,
        colorPresetService,

        isPlayMode
    }: GridElementProps
) {
    const currentGridElementInfo = useAppSelector(state => state.midiGridReducer.gridElements[index]);


    const [elementHeight, setElementHeight] = useState(1);
    const [elementWidth, setElementWidth] = useState(1);



    //Style Settings
    const [unpressedColor, setUnpressedColor] = useState(DEFAULT_COLOR_PRESET.unpressedColor);
    const [pressedColor, setPressedColor] = useState(DEFAULT_COLOR_PRESET.pressedColor);

    const [dialogVisible, setDialogVisible] = useState(false);



    function playModeTouchStartHandler(event: any) {

        if (isPlayMode) {
            fadeOut();
            MIDI_HTTP_Service.sendMidiMessage(
                createMidiMessage(
                    currentGridElementInfo.noteNumber,
                    getVelocityValue(event),
                    true //Note is on
                )
            );
        } else {
            //Tap in  edit mode shows dialog
            setDialogVisible(true);
        }
    }

    function playModeTouchEndHandler() {
        if (isPlayMode) {
            fadeIn();
            MIDI_HTTP_Service.sendMidiMessage(
                createMidiMessage(
                    currentGridElementInfo.noteNumber,
                    0, // No velocity on note off
                    false //Note is off
                )
            );
        }
    }

    function getVelocityValue(event: any): number {
        if (currentGridElementInfo.velocity.isVertical) {
            return Math.floor(currentGridElementInfo.velocity.floor + (currentGridElementInfo.velocity.ceiling - currentGridElementInfo.velocity.floor) * (1 - event.nativeEvent.locationY / elementHeight))
        } else {
            return Math.floor(currentGridElementInfo.velocity.floor + (currentGridElementInfo.velocity.ceiling - currentGridElementInfo.velocity.floor) * (event.nativeEvent.locationX / elementWidth))
        }
    }

    function onLayout(event: any) {
        setElementHeight(event.nativeEvent.layout.height);
        setElementWidth(event.nativeEvent.layout.width);
    }

    const fadeAnim = useRef(new Animated.Value(1)).current;
    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();
    };
    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 5,
            useNativeDriver: true
        }).start();
    };


    return (
        <View style={{ ...styles.gridElementBasePressedView, backgroundColor: pressedColor, }} onLayout={onLayout}>
            <Animated.View
                style={{
                    ...styles.gridElementBasePressedView,
                    opacity: fadeAnim,
                    backgroundColor: unpressedColor,
                }}
                onTouchStart={playModeTouchStartHandler}
                onTouchEnd={playModeTouchEndHandler}
            >

                {/* Play Mode */}
                {isPlayMode &&
                    <View style={styles.gridElementUnpressedView} >
                        <Text style={{ color: pressedColor }}>
                            {currentGridElementInfo.name}
                        </Text>
                    </View>
                }

                {/* Edit mode */}
                {!isPlayMode &&
                    <View style={{ ...styles.gridElementUnpressedView, ...styles.gridElementEditView }}>
                        <Text style={{ color: pressedColor }}>
                            Edit {currentGridElementInfo.name}
                        </Text>
                    </View>
                }

                {/* Edit Dialog - MIDI & Style Settings */}
                <GridElementEditDialog
                    index={index}
                    dialogVisible={dialogVisible} setDialogVisible={setDialogVisible}
                    colorPresetService={colorPresetService}
                    unpressedColor={unpressedColor} setUnpressedColor={setUnpressedColor}
                    pressedColor={pressedColor} setPressedColor={setPressedColor}
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

import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import {
    Animated,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

import {
    Button,
    Dialog,
    Input,
    Slider,
    Text,
} from "@rneui/themed";

import { MIDI_HTTP_Service } from '../services/MIDI_HTTP_Service';
import {
    createMidiMessage,
    NOTE,
} from '../constants/MIDI_Notes';

import GridElementEditDialog from './GridElementEditDialog/GridElementEditDialog';
import ColorPicker from 'react-native-wheel-color-picker'; //https://github.com/Naeemur/react-native-wheel-color-picker
import {
    DEFAULT_COLOR_PRESET
} from '../constants/Colors'
import { ColorPresetService } from '../services/ColorPresetService';
import DropDownPicker from 'react-native-dropdown-picker';


interface GridElementProps {
    //Services
    MIDI_HTTP_Service: MIDI_HTTP_Service,
    colorPresetService: ColorPresetService,

    //Initialization props
    initialName: string,
    initialNoteNumber: number,

    //Grid Controls
    isPlayMode: boolean,
};

export default function GridElement(
    {
        MIDI_HTTP_Service,
        colorPresetService,

        initialName,
        initialNoteNumber,

        isPlayMode
    }: GridElementProps
) {

    const [elementName, setElementName] = useState(initialName);

    // MIDI Settings
    const [noteNumber, setNoteNumber] = useState(initialNoteNumber % 12); //MODULUS 12 is for chromatic scale only. Eventually need better system for scale presets
    const [octave, setOctave] = useState(Math.floor(initialNoteNumber / 12));
    const [velocity, setVelocity] = useState(100);

    //Style Settings
    const [textColor, setTextColor] = useState(DEFAULT_COLOR_PRESET.textColor);
    const [unpressedColor, setUnpressedColor] = useState(DEFAULT_COLOR_PRESET.unpressedColor);
    const [pressedColor, setPressedColor] = useState(DEFAULT_COLOR_PRESET.pressedColor);

    const [dialogVisible, setDialogVisible] = useState(false);



    function playModeTouchStartHandler() {

        // Eventually use these to make a tap position depended velocity control. event being an input param to this function
        // event.nativeEvent.locationX
        // event.nativeEvent.locationY

        if (isPlayMode) {
            fadeOut();
            MIDI_HTTP_Service.sendMidiMessage(
                createMidiMessage(
                    noteNumber,
                    octave,
                    velocity,
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
                    noteNumber,
                    octave,
                    0, // No velocity on note off
                    false //Note is off
                )
            );
        }
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
        <View style={{ ...styles.gridElementBasePressedView, backgroundColor: pressedColor, }}>
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
                        <Text style={{ color: textColor }}>
                            {elementName}
                        </Text>
                    </View>
                }

                {/* Edit mode */}
                {!isPlayMode &&
                    <View style={{ ...styles.gridElementUnpressedView, ...styles.gridElementEditView }}>
                        <Text style={{ color: textColor }}>
                            Edit {elementName}
                        </Text>
                    </View>
                }

                {/* Edit Dialog - MIDI & Style Settings */}
                <GridElementEditDialog
                    dialogVisible={dialogVisible} setDialogVisible={setDialogVisible}
                    elementName={elementName} setElementName={setElementName}

                    noteNumber={noteNumber} setNoteNumber={setNoteNumber}
                    octave={octave} setOctave={setOctave}
                    velocity={velocity} setVelocity={setVelocity}

                    colorPresetService={colorPresetService}
                    textColor={textColor} setTextColor={setTextColor}
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

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


import ColorPicker from 'react-native-wheel-color-picker'; //https://github.com/Naeemur/react-native-wheel-color-picker
import {
    DEFAULT_TEXT_COLOR,
    DEFAULT_UNPRESSED_COLOR,
    DEFAULT_PRESSED_COLOR,
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
    initialOctave: number,

    //Grid Controls
    isPlayMode: boolean,
};

export default function GridElement(
    {
        MIDI_HTTP_Service,
        colorPresetService,

        initialName,
        initialNoteNumber,
        initialOctave,

        isPlayMode
    }: GridElementProps
) {

    const [elementName, setElementName] = useState(initialName);

    // MIDI Settings
    const [noteNumber, setNoteNumber] = useState(initialNoteNumber);
    const [octave, setOctave] = useState(initialOctave);
    const [velocity, setVelocity] = useState(100);

    //Style Settings
    const [textColor, setTextColor] = useState(DEFAULT_TEXT_COLOR);
    const [unpressedColor, setUnpressedColor] = useState(DEFAULT_UNPRESSED_COLOR);
    const [pressedColor, setPressedColor] = useState(DEFAULT_PRESSED_COLOR);

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
                            Name: {elementName}{'\n'}
                            Note: {Object.values(NOTE)[noteNumber]}{'\n'}
                            Octave: {octave}{'\n'}
                            Velocity: {velocity}{'\n'}
                            {'\n'}
                            Text Color: {textColor}{'\n'}
                            Unpressed Color: {unpressedColor}{'\n'}
                            Pressed Color: {pressedColor}{'\n'}
                        </Text>
                        <Button onPress={() => { setDialogVisible(true) }}>
                            EDIT
                        </Button>
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


interface GridElementEditDialogProps extends GridElementEditMidiProps, GridElementEditStyleProps {
    dialogVisible: boolean, setDialogVisible(dialogVisible: boolean): void,
}

function GridElementEditDialog(
    {
        dialogVisible, setDialogVisible,

        elementName, setElementName,
        noteNumber, setNoteNumber,
        octave, setOctave,
        velocity, setVelocity,

        colorPresetService,
        textColor, setTextColor,
        unpressedColor, setUnpressedColor,
        pressedColor, setPressedColor,
    }: GridElementEditDialogProps) {

    const [tabIndex, setTabIndex] = React.useState(0);

    return (
        <Dialog isVisible={dialogVisible} >
            <View style={{ height: 500 }}>

                {/* MIDI/Style Tab Selection */}
                <View style={{ flexDirection: 'row' }}>
                    <Button onPress={() => { setTabIndex(0) }}>
                        <Text>MIDI Settings</Text>
                    </Button>

                    <Button onPress={() => { setTabIndex(1) }}>
                        <Text>Style Settings</Text>
                    </Button>
                    <Button onPress={() => { setDialogVisible(false) }}>
                        <Text>
                            SAVE
                        </Text>
                    </Button>
                </View>


                {tabIndex === 0 &&
                    <GridElementEditMidiSettingsTab
                        elementName={elementName} setElementName={setElementName}
                        noteNumber={noteNumber} setNoteNumber={setNoteNumber}
                        octave={octave} setOctave={setOctave}
                        velocity={velocity} setVelocity={setVelocity}
                    />
                }

                {tabIndex === 1 &&
                    <GridElementEditStyleSettingsTab
                        colorPresetService={colorPresetService}
                        textColor={textColor} setTextColor={setTextColor}
                        unpressedColor={unpressedColor} setUnpressedColor={setUnpressedColor}
                        pressedColor={pressedColor} setPressedColor={setPressedColor}
                    />
                }


            </View>
        </Dialog>
    );
} //end GridElementEditDialog


interface GridElementEditMidiProps {
    // MIDI Options
    elementName: string, setElementName(elementName: string): void,
    noteNumber: number, setNoteNumber(noteNumber: number): void,
    octave: number, setOctave(octave: number): void,
    velocity: number, setVelocity(velocity: number): void,

}

function GridElementEditMidiSettingsTab(
    {
        elementName, setElementName,
        noteNumber, setNoteNumber,
        octave, setOctave,
        velocity, setVelocity,
    }: GridElementEditMidiProps) {
    return (
        <View>
            {/* Name control */}
            <View>
                <Text>Name:</Text>
                <Input
                    value={elementName}
                    onChangeText={value => setElementName(value)}
                ></Input>
            </View>

            {/* Note Control */}
            <View>
                <Text>Note: {Object.values(NOTE)[noteNumber]}</Text>
                <Slider
                    maximumValue={11}
                    minimumValue={0}
                    step={1}
                    value={noteNumber}
                    onValueChange={setNoteNumber}
                />

            </View>


            {/* Octave Control */}
            <View>
                <Text>Octave: {octave}</Text>
                <Slider
                    maximumValue={10}
                    minimumValue={0}
                    step={1}
                    value={octave}
                    onValueChange={setOctave}
                />
            </View>

            {/* Velocity Control */}
            <View>
                <Text>Velocity: {velocity}</Text>
                <Slider
                    maximumValue={127}
                    minimumValue={0}
                    step={1}
                    value={velocity}
                    onValueChange={setVelocity}
                />
            </View>
        </View>
    );
}// end GridElementEditMidiOptionsTab


interface GridElementEditStyleProps {
    colorPresetService: ColorPresetService,

    textColor: string, setTextColor(color: string): void,
    unpressedColor: string, setUnpressedColor(color: string): void,
    pressedColor: string, setPressedColor(color: string): void,
}
function GridElementEditStyleSettingsTab(
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
            <View
                style={{ height: 150 }}
            >
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

interface ColorSelectorProps {
    colorTitle: string,
    color: string,
    setColor(color: string): void
}
function ColorSelector({ colorTitle, color, setColor, }: ColorSelectorProps) {
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
        flexDirection: "row"
    }
});

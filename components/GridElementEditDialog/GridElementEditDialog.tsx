
import React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Text, } from "@rneui/themed";

import { GridElementEditMidiProps, GridElementEditMidiSettingsTab, } from './GridElementEditDialogTabs/GridElementEditMidiSettingsTab';
import { GridElementEditStyleProps, GridElementEditStyleSettingsTab, } from './GridElementEditDialogTabs/GridElementEditStyleSettingsTab';

interface GridElementEditDialogProps extends GridElementEditMidiProps, GridElementEditStyleProps {
    dialogVisible: boolean, setDialogVisible(dialogVisible: boolean): void,
}

export default function GridElementEditDialog(
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

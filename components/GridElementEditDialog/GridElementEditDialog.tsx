
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
        velocityFloor, setVelocityFloor,
        velocityCeiling, setVelocityCeiling,
        isVelocityVertical, setIsVelocityVertical,

        colorPresetService,
        textColor, setTextColor,
        unpressedColor, setUnpressedColor,
        pressedColor, setPressedColor,
    }: GridElementEditDialogProps) {

    const [tabIndex, setTabIndex] = React.useState(0);

    return (
        <Dialog isVisible={dialogVisible} >

            {/* MIDI/Style Tab Selection */}
            <View style={{ flexDirection: 'row' }}>
                <Button onPress={() => { setTabIndex(0) }}>MIDI Settings</Button>
                <Button onPress={() => { setTabIndex(1) }}>Style Settings</Button>
            </View>

            <View style={{ height: 500 }}>
                {tabIndex === 0 &&
                    <GridElementEditMidiSettingsTab
                        elementName={elementName} setElementName={setElementName}
                        noteNumber={noteNumber} setNoteNumber={setNoteNumber}
                        octave={octave} setOctave={setOctave}
                        velocityFloor={velocityFloor} setVelocityFloor={setVelocityFloor}
                        velocityCeiling={velocityCeiling} setVelocityCeiling={setVelocityCeiling}
                        isVelocityVertical={isVelocityVertical} setIsVelocityVertical={setIsVelocityVertical}
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

            <View style={{ flexDirection: 'row', }}>
                <Button onPress={() => { setDialogVisible(false) }}>SAVE</Button>
            </View>
        </Dialog>
    );
} //end GridElementEditDialog


// TODO : There should be some degree of shared styling between this individual and grid level dialog option windows

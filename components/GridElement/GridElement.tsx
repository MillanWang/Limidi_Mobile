import React, { useRef, useState } from 'react';
import {
    Animated,
    StyleSheet,
    View
} from 'react-native';
import { Icon, Text, } from "@rneui/themed";
import GridElementEditDialog from './GridElementEditDialog/GridElementEditDialog';
import { useAppSelector } from '../../redux/hooks';
import DrumPad from './GridElementTypes/DrumPad';
import ControlChange from './GridElementTypes/ControlChange';




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
    const colorState = currentGridElementState.colorState;
    const lockedState = currentGridElementState.isLocked;
    const isMidiNoteState = currentGridElementState.isMidiNote;

    const [dialogVisible, setDialogVisible] = useState(false);


    const isMidiNote = currentGridElementState.isMidiNote

    return (
        <>

            {isPlayMode && isMidiNote && <DrumPad index={index} />}
            {isPlayMode && !isMidiNote && <ControlChange index={index} />}


            {/* Edit mode */}
            {!isPlayMode &&
                <View
                    style={{
                        ...styles.gridElementUnpressedView,
                        ...styles.gridElementEditView,
                        backgroundColor: colorState.unpressedColor,
                    }}
                    onTouchStart={() => { setDialogVisible(true); }}
                >
                    <View style={{ flexDirection: "column", alignItems: "center" }}>
                        <View style={{ flexDirection: "row" }}>
                            <Icon color={colorState.pressedColor} type="ionicon" name={lockedState ? "lock-closed" : "lock-open"} />
                            {isMidiNoteState ?
                                <Icon color={colorState.pressedColor} type="material-community" name={"piano"} /> :
                                <Icon color={colorState.pressedColor} type="feather" name={"sliders"} />
                            }
                        </View>
                        <Text style={{ color: colorState.pressedColor }}>
                            Edit {nameState} (#{index})
                        </Text>
                    </View>


                    {/* TODO: Show lock here and also show name of element */}
                </View>
            }

            {/* Edit Dialog - MIDI & Style Settings */}
            <GridElementEditDialog
                index={index}
                dialogVisible={dialogVisible} setDialogVisible={setDialogVisible}
            />
        </>
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

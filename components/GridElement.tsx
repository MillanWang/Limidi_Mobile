import React, { useRef, useState } from 'react';
import {
    Animated,
    StyleSheet,
    View
} from 'react-native';
import { Text, } from "@rneui/themed";
import { MIDI_HTTP_Service } from '../services/MIDI_HTTP_Service';
import { createMidiMessage, } from '../constants/MIDI_Notes';
import GridElementEditDialog from './GridElementEditDialog/GridElementEditDialog';
import { useAppSelector } from '../redux/hooks';

const NOTE_ON = true;

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
    const currentGridElementInfo = useAppSelector(state => state.midiGridReducer.gridElements[index]);
    const currentGriedElementColorState = useAppSelector(state => state.colorServiceReducer.gridElementStyles[index]);
    const httpCommunicationInfo = useAppSelector(state => state.httpCommunicationsReducer.httpCommunicationInfo);

    const [elementHeight, setElementHeight] = useState(1);
    const [elementWidth, setElementWidth] = useState(1);
    const [dialogVisible, setDialogVisible] = useState(false);

    function playModeTouchStartHandler(event: any) {

        if (isPlayMode) {
            const velocity = getVelocityValue(event);
            fadeOut(Math.max(velocity / 127, 0.25)); // 25% as minimum opacity drop for really low velocities
            MIDI_HTTP_Service.sendMidiMessage(
                httpCommunicationInfo,
                createMidiMessage(currentGridElementInfo.noteNumber, velocity, NOTE_ON)
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
                httpCommunicationInfo,
                /* No velocity on note off*/
                createMidiMessage(currentGridElementInfo.noteNumber, 0, !NOTE_ON)
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
        <View style={{ ...styles.gridElementBasePressedView, backgroundColor: currentGriedElementColorState.pressedColor, }} onLayout={onLayout}>
            <Animated.View
                style={{
                    ...styles.gridElementBasePressedView,
                    opacity: fadeAnim,
                    backgroundColor: currentGriedElementColorState.unpressedColor,
                }}
                onTouchStart={playModeTouchStartHandler}
                onTouchEnd={playModeTouchEndHandler}
            >

                {/* Play Mode */}
                {isPlayMode &&
                    <View style={styles.gridElementUnpressedView} >
                        <Text style={{ color: currentGriedElementColorState.pressedColor }}>
                            {currentGridElementInfo.name}
                        </Text>
                    </View>
                }

                {/* Edit mode */}
                {!isPlayMode &&
                    <View style={{ ...styles.gridElementUnpressedView, ...styles.gridElementEditView }}>
                        <Text style={{ color: currentGriedElementColorState.pressedColor }}>
                            Edit {currentGridElementInfo.name}
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

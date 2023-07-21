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
import { LinearGradient } from 'expo-linear-gradient';
// import { Icon } from '@rneui/base';


interface ControlChangeProps {
    index: number,
}

const ICON_SIZE = 55
const TOP_BAR_HEIGHT = 60;

export default function ControlChange({ index }: ControlChangeProps) {
    const currentGridState = useAppSelector(state => state.gridPresetsReducer.currentGridPreset);
    const { rowCount, columnCount } = currentGridState
    const currentGridElementState = useAppSelector(state => state.gridPresetsReducer.currentGridPreset.gridElements[index])
    const nameState = currentGridElementState.name;
    const colorState = currentGridElementState.colorState;

    const xAxisControlIndexState = currentGridElementState.controlChangeState.xAxisControlIndex;
    const yAxisControlIndexState = currentGridElementState.controlChangeState.yAxisControlIndex;
    const iconNameState = currentGridElementState.controlChangeState.iconName;

    const { sendMidiControlChange } = useDesktopCommunication();

    // Positional knowledge
    const [elementWidth, setElementWidth] = useState(1);
    const [elementHeight, setElementHeight] = useState(1);
    const [spaceFromLeft, setSpaceFromLeft] = useState(1);
    const [spaceFromTop, setSpaceFromTop] = useState(1);

    function onLayout(event: any) {
        setElementWidth(event.nativeEvent.layout.width);
        setElementHeight(event.nativeEvent.layout.height);
        setSpaceFromLeft(((index) % columnCount) * event.nativeEvent.layout.width)
        setSpaceFromTop(TOP_BAR_HEIGHT + (rowCount - Math.floor(index / columnCount) - 1) * event.nativeEvent.layout.height)
        setXPositionAbsolute((event.nativeEvent.layout.width / 2) - (ICON_SIZE / 2))
        setYPositionAbsolute((event.nativeEvent.layout.height / 2) - (ICON_SIZE / 2))
    }

    const [xPositionAbsolute, setXPositionAbsolute] = useState(elementWidth / 2)
    const [yPositionAbsolute, setYPositionAbsolute] = useState(elementHeight / 2)


    // TODO: Incorporate some kind of throttle or debounce system here for performance sake. No need for every pixel change
    function onSliderChange(event: GestureResponderEvent) {
        if (xAxisControlIndexState > 0) {
            setXPositionAbsolute(Math.min(elementWidth - ICON_SIZE, Math.max(0, event.nativeEvent.pageX - spaceFromLeft - (ICON_SIZE / 2))))
            // sendMidiControlChange(
            //     createMidiControlChange(
            //         xAxisControlIndexState,
            //         Math.floor(127 * (event.nativeEvent.pageX - spaceFromLeft) / elementWidth)
            //     )
            // )
        } else {
            // Locked horizontally
            // Vertical only control 
            // setXPositionAbsolute(Math.min(elementWidth - ICON_SIZE, Math.max(0, event.nativeEvent.pageX - spaceFromLeft - (ICON_SIZE / 2))))
            setXPositionAbsolute((elementWidth / 2) - (ICON_SIZE / 2))
        }

        if (yAxisControlIndexState > 0) {
            setYPositionAbsolute(Math.min(elementHeight - ICON_SIZE, Math.max(0, event.nativeEvent.pageY - spaceFromTop - (ICON_SIZE / 2))))
            // sendMidiControlChange(
            //     createMidiControlChange(
            //         yAxisControlIndexState,
            //         Math.floor(127 - 127 * (event.nativeEvent.pageY - spaceFromTop) / elementHeight)
            //     )
            // )
        } else {
            // Locked vertically
            // Horizontal only control 
            setYPositionAbsolute((elementHeight / 2) - (ICON_SIZE / 2))
        }
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

    function playModeTouchStartHandler() { fadeOut(0.5); }
    function playModeTouchEndHandler() { fadeIn(); }

    return (
        <>
            <View
                style={{ ...styles.gridElementBasePressedView, backgroundColor: colorState.pressedColor, }}
                onLayout={onLayout}
                onTouchMove={onSliderChange}
                onTouchStart={onSliderChange}

            >


                <Animated.View
                    style={{
                        ...styles.gridElementBasePressedView,
                        opacity: fadeAnim,
                        backgroundColor: colorState.unpressedColor,
                    }}
                    onTouchStart={playModeTouchStartHandler}
                    onTouchEnd={playModeTouchEndHandler}
                >
                    <View
                        style={{
                            position: 'absolute',
                            top: yPositionAbsolute,
                            left: xPositionAbsolute,
                            backgroundColor: colorState.pressedColor,
                            height: ICON_SIZE,
                            width: ICON_SIZE,
                            justifyContent: "center",
                            borderRadius: 100 //Big enough to be a circle
                        }}
                    >
                        <Icon
                            //Changes on move as one option. Hard set to a value as another option
                            name={"swap-horizontal"}
                            type="ionicon"
                            color={colorState.unpressedColor}
                        />
                    </View>
                </Animated.View>

            </View>
        </>
    );
}


const horizontalIconNamesIonicon = [
    "swap-horizontal",
    "code-outline",
    "code-slash-outline"
]
const verticalIconNamesIonicon = [
    "swap-vertical",
    "chevron-collapse",
    "chevron-expand",
]
const xyIconNamesIonicon = [
    "repeat",
    "resize",
    "move",
    "logo-apple-ar",
    "expand",
    "contract",
]


const ioniconValidIconNames = [
    "logo-bitcoin",
    "logo-euro",
    "logo-no-smoking",
    "logo-chrome",
    "logo-apple",
    "logo-android",
    "logo-react",
    "logo-usd",
    "logo-nodejs",
    "logo-javascript",
    "logo-yen",
    "medical",
    "move",
    "nuclear",
    "planet",
    "pulse",
    "qr-code",
    "rainy",
    "reload",
    "shield",
    "snow",
    "skull",
    "star",
    "sync",
    "terminal",
    "trophy",
    "water",
    "wifi",
    "wine",
    "ios-beer",
    "ios-grid",
    "aperture",
    "aperture-outline",
    "bug",
    "code-slash",
    "compass",
    "cube",
    "earth",
    "expand",
    "flash",
    "git-compare",
    "hardware-chip-outline",
    "infinite",
    "leaf",
    "finger-print"
]


const styles = StyleSheet.create({
    gridElementBasePressedView: {
        flex: 1,
        borderWidth: 0.5,

    },
    gridElementUnpressedView: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridElementEditView: {
        flexDirection: "row",
        borderColor: '#ffffff'
    }
});
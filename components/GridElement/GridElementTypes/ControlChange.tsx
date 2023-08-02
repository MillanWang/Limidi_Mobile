import React, { useRef, useState } from 'react';
import {
    Animated,
    GestureResponderEvent,
    ImageBackground,
    StyleSheet,
    View,
} from 'react-native';
import { Text, Icon } from "@rneui/themed";
import { useAppSelector } from '../../../redux/hooks';
import { useDesktopCommunication } from '../../../hooks/useDesktopCommunication';
import { createMidiControlChange } from '../../../constants/MIDI_Notes';
import { ControlChangeDirection } from "../GridElementEditDialog/GridElementEditDialogTabs/ControlChangeSettingsPanel"

interface ControlChangeProps {
    index: number,
}

const hex = require('../../../assets/images/Hex.png'); //Strange how during dev, this disapeared when going between presets
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

    const currentControlChangeDirection = xAxisControlIndexState > 0 && yAxisControlIndexState > 0 ?
        ControlChangeDirection.xy :
        xAxisControlIndexState > 0 ?
            ControlChangeDirection.horizontal :
            ControlChangeDirection.vertical;

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

    function getIconName() {
        if (iconNameState && iconNameState !== "") {
            return iconNameState
        }
        else if (xAxisControlIndexState > 0 && yAxisControlIndexState > 0) {
            // XY default
            return "move"
        }
        else if (yAxisControlIndexState > 0) {
            // Vertical default
            return "swap-vertical"
        }
        else if (xAxisControlIndexState > 0) {
            // Horizontal default
            return "swap-horizontal"
        }
        return "move"
    }

    // TODO: Incorporate some kind of throttle or debounce system here for performance sake. No need for every pixel change
    function onSliderChange(event: GestureResponderEvent) {
        if (currentControlChangeDirection === ControlChangeDirection.horizontal || currentControlChangeDirection === ControlChangeDirection.xy) {
            setXPositionAbsolute(Math.min(elementWidth - ICON_SIZE, Math.max(0, event.nativeEvent.pageX - spaceFromLeft - (ICON_SIZE / 2))))
            sendMidiControlChange(
                createMidiControlChange(
                    xAxisControlIndexState,
                    Math.floor(127 * (event.nativeEvent.pageX - spaceFromLeft) / elementWidth)
                )
            )
        } else {
            // Locked horizontally
            // Vertical only control 
            setXPositionAbsolute((elementWidth / 2) - (ICON_SIZE / 2))
        }

        if (currentControlChangeDirection === ControlChangeDirection.vertical || currentControlChangeDirection === ControlChangeDirection.xy) {
            setYPositionAbsolute(Math.min(elementHeight - ICON_SIZE, Math.max(0, event.nativeEvent.pageY - spaceFromTop - (ICON_SIZE / 2))))
            sendMidiControlChange(
                createMidiControlChange(
                    yAxisControlIndexState,
                    Math.floor(127 - 127 * (event.nativeEvent.pageY - spaceFromTop) / elementHeight)
                )
            )
        } else {
            // Locked vertically
            // Horizontal only control 
            setYPositionAbsolute((elementHeight / 2) - (ICON_SIZE / 2))
        }
    }


    const [isInMotion, setIsInMotion] = useState(false)
    const fadeAnim = useRef(new Animated.Value(1)).current;
    function fadeIn() {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };
    function fadeOut(opacity: number) {
        Animated.timing(fadeAnim, {
            toValue: opacity,
            duration: 1,
            useNativeDriver: true
        }).start(() => {
            setIsInMotion(true);
        });
    };
    function playModeTouchStartHandler() {
        fadeOut(0.25);
    }
    function playModeTouchEndHandler() {
        setIsInMotion(false);
        fadeIn();
    }


    return (
        <>
            <View
                style={{ ...styles.gridElementBasePressedView, backgroundColor: colorState.pressedColor, }}
                onLayout={onLayout}
                onTouchMove={onSliderChange}
                onTouchStart={onSliderChange}
            >

                <ImageBackground
                    source={hex}
                    resizeMode="cover"
                    imageStyle={{
                        opacity:
                            currentControlChangeDirection === ControlChangeDirection.xy && isInMotion ?
                                Math.min(0.25, xPositionAbsolute / elementWidth) : 0
                    }}
                    style={{ width: elementWidth, height: elementHeight, }}>
                    <Animated.View
                        style={{
                            ...styles.gridElementBasePressedView,
                            opacity: isInMotion ?
                                Math.max(0.15, currentControlChangeDirection === ControlChangeDirection.horizontal ?
                                    (1 - xPositionAbsolute / elementWidth) : yPositionAbsolute / elementHeight) :
                                fadeAnim,
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
                                alignItems: "center",
                                borderRadius: 100 //Big enough to be a circle
                            }}
                        >
                            <Icon
                                //Changes on move as one option. Hard set to a value as another option
                                name={getIconName()}
                                type="ionicon"
                                color={colorState.unpressedColor}
                            />
                        </View>
                    </Animated.View>
                </ImageBackground>

            </View>
        </>
    );
}


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
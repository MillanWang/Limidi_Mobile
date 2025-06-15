import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  StyleSheet,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { createMidiControlChange } from "../../../constants/MIDI_Notes";
import { theme } from "../../../constants/theme";
import {
  useCurrentGridPreset,
  useGridElementAtIndex,
} from "../../../hooks/useCurrentGridPreset";
import { useDesktopCommunication } from "../../../hooks/useDesktopCommunication";
import { debounce } from "../../../services/debounce";
import { GridThemedIcon } from "../../GridThemedComponents/GridThemedIcon";
import { ControlChangeDirection } from "../GridElementEditDialog/GridElementEditDialogTabs/useControlChangeIndexController";
import {
  styles as ccStyles,
  ControlChangeActiveIndicators,
  ICON_SIZE,
  useCcLevelOpacity,
} from "./ControlChangeActiveIndicators";

const abUseNew = true;
const halfIconSize = ICON_SIZE / 2;
const CcDebounceDelay = abUseNew ? 50 : 200;
const TOP_BAR_HEIGHT = 60;

type ControlChangeProps = { index: number };
type TouchPoint = { x: number; y: number };

export function ControlChange({ index }: ControlChangeProps) {
  return abUseNew ? (
    <ControlChange_NEW index={index} />
  ) : (
    <ControlChange_ORIGINAL index={index} />
  );
}

export function ControlChange_NEW({ index }: ControlChangeProps) {
  const [touch, setTouch] = useState<TouchPoint | null>(null);
  const [isInMotion, setIsInMotion] = useState(false);
  const { send_X_CcMessage, send_Y_CcMessage } =
    useCcNetworkCommunication(index);

  const {
    currentControlChangeDirection,
    safeIconName,
    hasVerticalControl,
    hasHorizontalControl,
    colorState,
  } = useCcPersistedProperties({ index });

  const { elementWidth, elementHeight, onLayout } = useCcElementPositioning({
    index,
  });

  const xPercent = touch ? getPositionalPercent(touch.x, elementWidth) : 0;
  const yPercent = touch ? 1 - getPositionalPercent(touch.y, elementHeight) : 0;
  const opacityPercent = hasVerticalControl ? yPercent : xPercent;

  const { animatedStyle } = useCcLevelOpacity({ isInMotion, opacityPercent });

  const updateTouchPosition = useCallback(
    (touch: TouchPoint) => {
      // need to ensure that the touch is in bounds
      // Need to keep the touch on a line if not in XY mode
      const finalX = hasHorizontalControl
        ? getInboundsTouchPosition(touch.x, elementWidth)
        : elementWidth / 2;
      const finalY = hasVerticalControl
        ? getInboundsTouchPosition(touch.y, elementHeight)
        : elementHeight / 2;
      setTouch({ x: finalX, y: finalY });
      if (hasHorizontalControl) {
        send_X_CcMessage(getPositionalPercent(finalX, elementWidth));
      }
      if (hasVerticalControl) {
        send_Y_CcMessage(1 - getPositionalPercent(finalY, elementHeight));
      }
    },
    [
      setTouch,
      elementWidth,
      elementHeight,
      hasVerticalControl,
      hasHorizontalControl,
    ]
  );

  const gesture = Gesture.Pan()
    .onTouchesDown((event) => {
      if (event.allTouches.length > 0) {
        const firstTouch = event.allTouches[0];
        runOnJS(updateTouchPosition)(firstTouch);
        runOnJS(setIsInMotion)(true);
      }
    })
    .onTouchesMove((event) => {
      if (event.allTouches.length > 0) {
        const firstTouch = event.allTouches[0];
        runOnJS(updateTouchPosition)(firstTouch);
      }
    })
    .onTouchesUp(() => {
      runOnJS(setIsInMotion)(false);
    })
    .onTouchesCancelled(() => {
      runOnJS(setIsInMotion)(false);
    });

  // Initialize touch position
  useEffect(() => {
    updateTouchPosition({ x: elementWidth / 2, y: elementHeight / 2 });
  }, [updateTouchPosition, elementWidth, elementHeight]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayout}>
      <GestureDetector gesture={gesture}>
        <View
          style={{
            ...styles.gridElementBasePressedView,
            backgroundColor: colorState.pressedColor,
          }}
        >
          <Animated.View
            style={[
              styles.gridElementBasePressedView,
              { backgroundColor: colorState.unpressedColor },
              animatedStyle,
            ]}
          >
            {touch && (
              <>
                <View
                  style={{
                    ...ccStyles.ccIcon,
                    left: touch.x - ICON_SIZE / 2,
                    top: touch.y - ICON_SIZE / 2,
                    backgroundColor: colorState.pressedColor,
                  }}
                >
                  <GridThemedIcon
                    index={index}
                    invert
                    name={safeIconName}
                    type="ionicon"
                  />
                </View>
                <ControlChangeActiveIndicators
                  show={isInMotion}
                  index={index}
                  controlChangeDirection={currentControlChangeDirection}
                  xPositionAbsolute={touch.x}
                  yPositionAbsolute={touch.y}
                  elementWidth={elementWidth}
                  safeIconName={safeIconName}
                  color={colorState.pressedColor}
                />
              </>
            )}
          </Animated.View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const useCcElementPositioning = (props: { index: number }) => {
  const { index } = props;
  const { rowCount, columnCount } = useCurrentGridPreset();
  // Positional knowledge
  const [elementWidth, setElementWidth] = useState(1);
  const [elementHeight, setElementHeight] = useState(1);
  const [spaceFromLeft, setSpaceFromLeft] = useState(1);
  const [spaceFromTop, setSpaceFromTop] = useState(1);
  const [xPositionAbsolute, setXPositionAbsolute] = useState(elementWidth / 2);
  const [yPositionAbsolute, setYPositionAbsolute] = useState(elementHeight / 2);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const layoutWidth = event.nativeEvent.layout.width;
      const layoutHeight = event.nativeEvent.layout.height;
      setElementWidth(layoutWidth);
      setElementHeight(layoutHeight);
      setSpaceFromLeft((index % columnCount) * layoutWidth);
      setSpaceFromTop(
        TOP_BAR_HEIGHT +
          (rowCount - Math.floor(index / columnCount) - 1) * layoutHeight
      );
      setXPositionAbsolute(layoutWidth / 2 - ICON_SIZE / 2);
      setYPositionAbsolute(layoutHeight / 2 - ICON_SIZE / 2);
    },
    [
      setElementWidth,
      setElementHeight,
      setSpaceFromLeft,
      index,
      columnCount,
      setSpaceFromTop,
      rowCount,
      setXPositionAbsolute,
      setYPositionAbsolute,
    ]
  );

  return {
    elementWidth,
    elementHeight,
    spaceFromLeft,
    spaceFromTop,
    xPositionAbsolute,
    yPositionAbsolute,
    onLayout,
    setXPositionAbsolute,
    setYPositionAbsolute,
  };
};

const useCcPersistedProperties = ({ index }: ControlChangeProps) => {
  const {
    colorState,
    controlChangeState: { xAxisControlIndex, yAxisControlIndex, iconName },
  } = useGridElementAtIndex(index);

  const currentControlChangeDirection = useMemo(
    () => getCcDirection(xAxisControlIndex, yAxisControlIndex),
    [xAxisControlIndex, yAxisControlIndex]
  );

  const safeIconName = useMemo(
    () => getSafeIconName(iconName, xAxisControlIndex, yAxisControlIndex),
    [iconName, xAxisControlIndex, yAxisControlIndex]
  );

  const hasVerticalControl = useMemo(
    () => currentControlChangeDirection !== ControlChangeDirection.Horizontal,
    [currentControlChangeDirection]
  );

  const hasHorizontalControl = useMemo(
    () => currentControlChangeDirection !== ControlChangeDirection.Vertical,
    [currentControlChangeDirection]
  );

  return {
    currentControlChangeDirection,
    safeIconName,
    hasVerticalControl,
    hasHorizontalControl,
    colorState,
  };
};

const useCcNetworkCommunication = (index: number) => {
  const { sendMidiControlChange } = useDesktopCommunication();
  const {
    controlChangeState: { xAxisControlIndex, yAxisControlIndex },
  } = useGridElementAtIndex(index);
  /**
   * Separate debouncers are used here so that one won't interfere with the other. They should both have separate max waits
   */
  // (ccInput: MidiControlChangeProps) => sendMidiControlChange(ccInput),
  const debouncedSendXCcMessage = useCallback(
    debounce(sendMidiControlChange, CcDebounceDelay),
    []
  );
  const debouncedSendYCcMessage = useCallback(
    debounce(sendMidiControlChange, CcDebounceDelay),
    []
  );

  const send_X_CcMessage = useCallback(
    (valuePercent: number) => {
      const ccInput = createMidiControlChange(
        xAxisControlIndex,
        Math.floor(127 * valuePercent)
      );
      debouncedSendXCcMessage(ccInput);
    },
    [xAxisControlIndex, debouncedSendXCcMessage]
  );
  const send_Y_CcMessage = useCallback(
    (valuePercent: number) => {
      const ccInput = createMidiControlChange(
        yAxisControlIndex,
        Math.floor(127 * valuePercent)
      );
      debouncedSendYCcMessage(ccInput);
    },
    [yAxisControlIndex, debouncedSendYCcMessage]
  );

  return {
    debouncedSendXCcMessage,
    debouncedSendYCcMessage,
    send_X_CcMessage,
    send_Y_CcMessage,
  };
};

export function ControlChange_ORIGINAL({ index }: ControlChangeProps) {
  const { debouncedSendXCcMessage, debouncedSendYCcMessage } =
    useCcNetworkCommunication(index);

  const {
    controlChangeState: { xAxisControlIndex, yAxisControlIndex },
  } = useGridElementAtIndex(index);

  // Positional knowledge
  const {
    elementWidth,
    elementHeight,
    spaceFromLeft,
    spaceFromTop,
    xPositionAbsolute,
    yPositionAbsolute,
    onLayout,
    setXPositionAbsolute,
    setYPositionAbsolute,
  } = useCcElementPositioning({ index });

  const [isInMotion, setIsInMotion] = useState(false);

  const {
    currentControlChangeDirection,
    safeIconName,
    hasVerticalControl,
    hasHorizontalControl,
    colorState,
  } = useCcPersistedProperties({ index });

  const send_X_CcMessage = useCallback(
    (pageX: number) => {
      const ccInput = createMidiControlChange(
        xAxisControlIndex,
        Math.floor((127 * (pageX - spaceFromLeft)) / elementWidth)
      );
      debouncedSendXCcMessage(ccInput);
    },
    [xAxisControlIndex, spaceFromLeft, elementWidth, debouncedSendXCcMessage]
  );
  const send_Y_CcMessage = useCallback(
    (pageY: number) => {
      const ccInput = createMidiControlChange(
        yAxisControlIndex,
        Math.floor(127 - (127 * (pageY - spaceFromTop)) / elementHeight)
      );
      debouncedSendYCcMessage(ccInput);
    },
    [yAxisControlIndex, spaceFromTop, elementHeight, debouncedSendYCcMessage]
  );

  const updateXPositionAbsolute = useCallback(
    (pageX: number, pageY: number) => {
      if (pageX < spaceFromLeft || pageX > spaceFromLeft + elementWidth) {
        return;
      }
      if (pageY < spaceFromTop || pageY > spaceFromTop + elementHeight) {
        return;
      }

      setXPositionAbsolute(
        Math.min(
          elementWidth - ICON_SIZE,
          Math.max(0, pageX - spaceFromLeft - ICON_SIZE * 0.75)
        )
      );
    },
    [
      xAxisControlIndex,
      spaceFromLeft,
      elementWidth,
      spaceFromTop,
      elementHeight,
      setXPositionAbsolute,
    ]
  );

  const updateYPositionAbsolute = useCallback(
    (pageX: number, pageY: number) => {
      if (pageX < spaceFromLeft || pageX > spaceFromLeft + elementWidth) {
        return; // Outside of the side walls
      }
      if (
        pageY < spaceFromTop ||
        pageY >
          spaceFromTop +
            elementHeight * iconSizeOffsetFromTouchPositionMultiplier
      ) {
        return; // outside the top/bottom walls
      }

      setYPositionAbsolute(
        Math.min(
          elementHeight - ICON_SIZE,
          Math.max(
            0,
            pageY -
              spaceFromTop -
              ICON_SIZE * iconSizeOffsetFromTouchPositionMultiplier
          )
        )
      );
    },
    [
      yAxisControlIndex,
      spaceFromLeft,
      elementWidth,
      spaceFromTop,
      elementHeight,
      setYPositionAbsolute,
    ]
  );

  const onSliderChange = useCallback(
    (event: GestureResponderEvent) => {
      const { locationX, locationY } = event.nativeEvent;
      const pageX = event.nativeEvent.pageX;
      const pageY = event.nativeEvent.pageY;
      if (hasHorizontalControl) {
        updateXPositionAbsolute(pageX, pageY);
        send_X_CcMessage(pageX);
      } else {
        // Locked horizontally. Vertical only control
        setXPositionAbsolute(elementWidth / 2 - ICON_SIZE / 2);
      }

      if (hasVerticalControl) {
        updateYPositionAbsolute(pageX, pageY);
        send_Y_CcMessage(pageY);
      } else {
        // Locked vertically. Horizontal only control
        setYPositionAbsolute(elementHeight / 2 - ICON_SIZE / 2);
      }
    },
    [
      elementWidth,
      elementHeight,
      send_X_CcMessage,
      send_Y_CcMessage,
      updateXPositionAbsolute,
      setXPositionAbsolute,
      updateYPositionAbsolute,
      setYPositionAbsolute,
    ]
  );

  const coverOpacity = useSharedValue(1);

  const fadeToStaticColor = useCallback(() => {
    coverOpacity.value = withTiming(1, { duration: 200 });
  }, [setIsInMotion, coverOpacity]);

  const fadeToInMotionColor = useCallback(
    (opacity: number) => {
      coverOpacity.value = withTiming(opacity, { duration: 10 });
    },
    [setIsInMotion, coverOpacity]
  );

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: coverOpacity.value,
  }));

  useEffect(() => {
    if (isInMotion) {
      const inMotionCoverOpacity = Math.max(
        0.15,
        currentControlChangeDirection === ControlChangeDirection.Horizontal
          ? 1 - xPositionAbsolute / elementWidth
          : yPositionAbsolute / elementHeight
      );
      fadeToInMotionColor(inMotionCoverOpacity);
    }
  }, [isInMotion, xPositionAbsolute, yPositionAbsolute, fadeToInMotionColor]);

  const playModeTouchStartHandler = useCallback(() => {
    setIsInMotion(true);
    fadeToInMotionColor(0.25);
  }, [fadeToInMotionColor]);

  const playModeTouchEndHandler = useCallback(() => {
    setIsInMotion(false);
    fadeToStaticColor();
  }, [fadeToStaticColor, setIsInMotion]);

  const BaseIcon = (
    <View
      style={{
        ...ccStyles.ccIcon,
        top: yPositionAbsolute,
        left: xPositionAbsolute,
        backgroundColor: colorState.pressedColor,
      }}
    >
      <GridThemedIcon index={index} invert name={safeIconName} type="ionicon" />
    </View>
  );

  return (
    <>
      <View
        style={{
          ...styles.gridElementBasePressedView,
          backgroundColor: colorState.pressedColor,
        }}
        onLayout={onLayout}
      >
        <Animated.View
          style={[
            animatedStyles,
            {
              ...styles.gridElementBasePressedView,
              backgroundColor: colorState.unpressedColor,
            },
          ]}
          onTouchMove={onSliderChange}
          onTouchStart={(e) => {
            onSliderChange(e);
            playModeTouchStartHandler();
          }}
          onTouchEnd={(e) => {
            onSliderChange(e);
            playModeTouchEndHandler();
          }}
          onTouchCancel={(e) => {
            onSliderChange(e);
            playModeTouchEndHandler();
          }}
        >
          <ControlChangeActiveIndicators
            show={isInMotion}
            index={index}
            controlChangeDirection={currentControlChangeDirection}
            xPositionAbsolute={xPositionAbsolute + halfIconSize}
            yPositionAbsolute={yPositionAbsolute + halfIconSize}
            elementWidth={elementWidth}
            safeIconName={safeIconName}
            color={colorState.pressedColor}
          />

          {BaseIcon}
        </Animated.View>
      </View>
    </>
  );
}

const iconSizeOffsetFromTouchPositionMultiplier = 1.5; // To keep the icon directly under the touch position

const styles = StyleSheet.create({
  gridElementBasePressedView: {
    flex: 1,
    borderWidth: 0.5,
  },
  gridElementUnpressedView: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  gridElementEditView: {
    flexDirection: "row",
    borderColor: theme.color.white,
  },
});

const getCcDirection = (
  xAxisControlIndex: number,
  yAxisControlIndex: number
) => {
  return xAxisControlIndex >= 0 && yAxisControlIndex >= 0
    ? ControlChangeDirection.XY
    : xAxisControlIndex >= 0
    ? ControlChangeDirection.Horizontal
    : ControlChangeDirection.Vertical;
};

const getSafeIconName = (
  iconName: string,
  xAxisControlIndex: number,
  yAxisControlIndex: number
) => {
  if (iconName) {
    return iconName;
  } else if (xAxisControlIndex > 0 && yAxisControlIndex > 0) {
    // XY default
    return "move";
  } else if (yAxisControlIndex > 0) {
    // Vertical default
    return "swap-vertical";
  } else if (xAxisControlIndex > 0) {
    // Horizontal default
    return "swap-horizontal";
  }
  return "move";
};

const getPositionalPercent = (
  touchPosition: number,
  elementDimensionMax: number
) => {
  return (touchPosition - halfIconSize) / (elementDimensionMax - ICON_SIZE);
};

const getInboundsTouchPosition = (
  touchPosition: number,
  elementDimensionMax: number
) => {
  return Math.min(
    Math.max(touchPosition, halfIconSize),
    elementDimensionMax - halfIconSize
  );
};

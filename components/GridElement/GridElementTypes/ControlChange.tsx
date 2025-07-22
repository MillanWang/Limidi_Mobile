import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, { runOnJS } from "react-native-reanimated";
import { createMidiControlChange } from "../../../constants/MIDI_Notes";
import { theme } from "../../../constants/theme";
import { useGridElementAtIndex } from "../../../hooks/useCurrentGridPreset";
import { useDesktopCommunication } from "../../../hooks/useDesktopCommunication";
import { useElementSize } from "../../../hooks/useElementSize";
import { debounce } from "../../../services/debounce";
import { TouchPoint } from "../../../types";
import { GridThemedIcon } from "../../GridThemedComponents/GridThemedIcon";
import { ControlChangeDirection } from "../GridElementEditDialog/GridElementEditDialogTabs/useControlChangeIndexController";
import {
  styles as ccStyles,
  ControlChangeActiveIndicators,
  ICON_SIZE,
  useCcLevelOpacity,
} from "./ControlChangeActiveIndicators";

const halfIconSize = ICON_SIZE / 2;
const CcDebounceDelay = 50;

type ControlChangeProps = { index: number };

export function ControlChange({ index }: ControlChangeProps) {
  const [touch, setTouch] = useState<TouchPoint | null>(null);
  const [isInMotion, setIsInMotion] = useState(false);

  const {
    currentControlChangeDirection,
    safeIconName,
    hasVerticalControl,
    hasHorizontalControl,
    colorState,
    xAxisControlIndex,
    yAxisControlIndex,
  } = useCcPersistedProperties({ index });

  const { send_X_CcMessage, send_Y_CcMessage } = useCcNetworkCommunication({
    index,
    xAxisControlIndex,
    yAxisControlIndex,
  });

  const { elementWidth, elementHeight, onLayout } = useElementSize({
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
    const x = elementWidth / 2;
    const y = elementHeight / 2;
    updateTouchPosition({ x, y });
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

const useCcPersistedProperties = ({ index }: ControlChangeProps) => {
  const {
    colorState,
    controlChangeState: { xAxisControlIndex, yAxisControlIndex, iconName },
  } = useGridElementAtIndex(index);

  const currentControlChangeDirection = useMemo(
    () => getCcDirection(xAxisControlIndex, yAxisControlIndex),
    [xAxisControlIndex, yAxisControlIndex]
  );

  const hasVerticalControl = useMemo(
    () => currentControlChangeDirection !== ControlChangeDirection.Horizontal,
    [currentControlChangeDirection]
  );

  const hasHorizontalControl = useMemo(
    () => currentControlChangeDirection !== ControlChangeDirection.Vertical,
    [currentControlChangeDirection]
  );

  const safeIconName = useMemo(
    () => getSafeIconName(iconName, xAxisControlIndex, yAxisControlIndex),
    [iconName, xAxisControlIndex, yAxisControlIndex]
  );

  return {
    currentControlChangeDirection,
    hasVerticalControl,
    hasHorizontalControl,
    safeIconName,
    colorState,
    xAxisControlIndex,
    yAxisControlIndex,
  };
};

const useCcNetworkCommunication = (props: {
  index: number;
  xAxisControlIndex: number;
  yAxisControlIndex: number;
}) => {
  const { index, xAxisControlIndex, yAxisControlIndex } = props;
  const { sendMidiControlChange } = useDesktopCommunication();

  /**
   * Separate debouncers are used here so that one won't interfere with the other. They should both have separate max waits
   */
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

  return { send_X_CcMessage, send_Y_CcMessage };
};

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

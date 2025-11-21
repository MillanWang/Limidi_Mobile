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
            backgroundColor: colorState.highlightColor,
          }}
        >
          <View
            style={[
              styles.gridElementBasePressedView,
              { backgroundColor: colorState.primaryColor },
            ]}
          />

          {touch && (
            <>
              <View
                style={{
                  ...ccStyles.ccIcon,
                  left: touch.x - ICON_SIZE / 2,
                  top: touch.y - ICON_SIZE / 2,
                  backgroundColor: colorState.highlightColor,
                  zIndex: 2,
                }}
              >
                <GridThemedIcon
                  index={index}
                  invert
                  name={safeIconName}
                  type="ionicon"
                />
              </View>
              <ControlChangeLevelHighlights
                touch={touch}
                elementWidth={elementWidth}
                elementHeight={elementHeight}
                isInMotion={isInMotion}
                hasVerticalControl={hasVerticalControl}
                hasHorizontalControl={hasHorizontalControl}
                highlightColor={colorState.highlightColor}
              />
              <ControlChangeActiveIndicators
                show={isInMotion}
                index={index}
                controlChangeDirection={currentControlChangeDirection}
                xPositionAbsolute={touch.x}
                yPositionAbsolute={touch.y}
                elementWidth={elementWidth}
                safeIconName={safeIconName}
                color={colorState.highlightColor}
              />
            </>
          )}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

type ControlChangeLevelHighlightsProps = {
  touch: TouchPoint;
  elementWidth: number;
  elementHeight: number;
  isInMotion: boolean;
  hasVerticalControl: boolean;
  hasHorizontalControl: boolean;
  highlightColor: string;
};

const ControlChangeLevelHighlights = (
  props: ControlChangeLevelHighlightsProps
) => {
  const {
    touch,
    elementWidth,
    elementHeight,
    isInMotion,
    hasVerticalControl,
    hasHorizontalControl,
    highlightColor,
  } = props;

  // Calculate opacity for each of the 4 grid sections positioned around the touch point
  const gridOpacities = useMemo(() => {
    const unchangedOpacity = 1;
    if (!isInMotion || !touch) {
      return {
        topLeft: unchangedOpacity,
        topRight: unchangedOpacity,
        bottomLeft: unchangedOpacity,
        bottomRight: unchangedOpacity,
      };
    }

    const xPercent = getPositionalPercent(touch.x, elementWidth);
    const yPercent = 1 - getPositionalPercent(touch.y, elementHeight);
    const opacityPercent = hasVerticalControl ? yPercent : xPercent;

    if (hasVerticalControl && hasHorizontalControl) {
      const xHighlightColor = Math.max(0.1, 1 - xPercent * 0.9);
      const yHighlightColor = Math.max(0.1, 1 - yPercent * 0.9);
      return {
        topLeft: xHighlightColor,
        topRight: unchangedOpacity,
        bottomLeft: Math.min(xHighlightColor, yHighlightColor),
        bottomRight: yHighlightColor,
      };
    }
    const highlightColorOpacity = Math.max(0.1, 1 - opacityPercent * 0.9);

    if (hasVerticalControl) {
      return {
        topLeft: unchangedOpacity,
        topRight: unchangedOpacity,
        bottomLeft: highlightColorOpacity,
        bottomRight: highlightColorOpacity,
      };
    } else if (hasHorizontalControl) {
      return {
        topLeft: highlightColorOpacity,
        bottomLeft: highlightColorOpacity,
        topRight: unchangedOpacity,
        bottomRight: unchangedOpacity,
      };
    }

    return {
      topLeft: unchangedOpacity,
      topRight: unchangedOpacity,
      bottomLeft: unchangedOpacity,
      bottomRight: unchangedOpacity,
    };
  }, [
    isInMotion,
    touch,
    hasVerticalControl,
    hasHorizontalControl,
    elementWidth,
    elementHeight,
  ]);

  return (
    <>
      {/* Top Left Section */}
      <Animated.View
        style={[
          styles.gridSection,
          {
            backgroundColor: highlightColor,
            opacity: 1 - gridOpacities.topLeft,
            left: 0,
            top: 0,
            width: touch.x,
            height: touch.y,
            zIndex: 1,
          },
        ]}
      />

      {/* Top Right Section */}
      <Animated.View
        style={[
          styles.gridSection,
          {
            backgroundColor: highlightColor,
            opacity: 1 - gridOpacities.topRight,
            left: touch.x,
            top: 0,
            width: elementWidth - touch.x,
            height: touch.y,
            zIndex: 1,
          },
        ]}
      />

      {/* Bottom Left Section */}
      <Animated.View
        style={[
          styles.gridSection,
          {
            backgroundColor: highlightColor,
            opacity: 1 - gridOpacities.bottomLeft,
            left: 0,
            top: touch.y,
            width: touch.x,
            height: elementHeight - touch.y,
            zIndex: 1,
          },
        ]}
      />

      {/* Bottom Right Section */}
      <Animated.View
        style={[
          styles.gridSection,
          {
            backgroundColor: highlightColor,
            opacity: 1 - gridOpacities.bottomRight,
            left: touch.x,
            top: touch.y,
            width: elementWidth - touch.x,
            height: elementHeight - touch.y,
            zIndex: 1,
          },
        ]}
      />
    </>
  );
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
  gridSection: {
    position: "absolute",
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

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { runOnJS } from "react-native-reanimated";
import { createMidiControlChange } from "../../../constants/MIDI_Notes";
import { theme } from "../../../constants/theme";
import { useGridElementAtIndex } from "../../../hooks/useCurrentGridPreset";
import { useDesktopCommunication } from "../../../hooks/useDesktopCommunication";
import { useElementSize } from "../../../hooks/useElementSize";
import { debounce } from "../../../services/debounce";
import { TouchPoint } from "../../../types";
import { ControlChangeIcon, useGridCcIconSize } from "../../GridThemedComponents/GridThemedIcon";
import { ControlChangeDirection } from "../GridElementEditDialog/GridElementEditDialogTabs/useControlChangeIndexController";
import { ControlChangeActiveIndicators } from "./ControlChangeActiveIndicators";

const CcDebounceDelay = 50;

type ControlChangeProps = { index: number };

export function ControlChange({ index }: ControlChangeProps) {
  const [touch, setTouch] = useState<TouchPoint | null>(null);
  const [isInMotion, setIsInMotion] = useState(false);

  const {
    currentControlChangeDirection,
    hasVerticalControl,
    hasHorizontalControl,
    colorState,
    xAxisControlIndex,
    yAxisControlIndex,
  } = useCcPersistedProperties({ index });

  const { send_X_CcMessage, send_Y_CcMessage } = useCcNetworkCommunication({
    xAxisControlIndex,
    yAxisControlIndex,
  });

  const { elementWidth, elementHeight } = useElementSize();

  const iconSize = useGridCcIconSize();
  const halfIconSize = iconSize / 2;

  const updateTouchPosition = useCallback(
    (touch: TouchPoint) => {
      // need to ensure that the touch is in bounds
      // Need to keep the touch on a line if not in XY mode
      const finalX = hasHorizontalControl
        ? getInboundsTouchPosition(touch.x, elementWidth, iconSize)
        : elementWidth / 2;
      const finalY = hasVerticalControl
        ? getInboundsTouchPosition(touch.y, elementHeight, iconSize)
        : elementHeight / 2;
      setTouch({ x: finalX, y: finalY });
      if (hasHorizontalControl) {
        send_X_CcMessage(getPositionalPercent(finalX, elementWidth, iconSize));
      }
      if (hasVerticalControl) {
        send_Y_CcMessage(1 - getPositionalPercent(finalY, elementHeight, iconSize));
      }
    },
    [setTouch, elementWidth, elementHeight, hasVerticalControl, hasHorizontalControl, iconSize],
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
    <GestureHandlerRootView style={{ flex: 1 }}>
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
              <ControlChangeIcon
                index={index}
                containerStyle={{
                  position: "absolute",
                  left: touch.x - halfIconSize,
                  top: touch.y - halfIconSize,
                  zIndex: 2,
                }}
              />

              <ControlChangeLevelHighlights
                touch={touch}
                elementWidth={elementWidth}
                elementHeight={elementHeight}
                isInMotion={isInMotion}
                hasVerticalControl={hasVerticalControl}
                hasHorizontalControl={hasHorizontalControl}
                highlightColor={colorState.highlightColor}
                iconSize={iconSize}
              />
              <ControlChangeActiveIndicators
                show={isInMotion}
                index={index}
                controlChangeDirection={currentControlChangeDirection}
                xPositionAbsolute={touch.x}
                yPositionAbsolute={touch.y}
                elementWidth={elementWidth}
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
  iconSize: number;
};

const ControlChangeLevelHighlights = (props: ControlChangeLevelHighlightsProps) => {
  const {
    touch,
    elementWidth,
    elementHeight,
    isInMotion,
    hasVerticalControl,
    hasHorizontalControl,
    highlightColor,
    iconSize,
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

    const xPercent = getPositionalPercent(touch.x, elementWidth, iconSize);
    const yPercent = 1 - getPositionalPercent(touch.y, elementHeight, iconSize);
    const opacityPercent = hasVerticalControl ? yPercent : xPercent;

    if (hasVerticalControl && hasHorizontalControl) {
      const xHighlightColor = getHighlightColorOpacity(xPercent);
      const yHighlightColor = getHighlightColorOpacity(yPercent);
      return {
        topLeft: xHighlightColor,
        topRight: unchangedOpacity,
        bottomLeft: Math.min(xHighlightColor, yHighlightColor),
        bottomRight: yHighlightColor,
      };
    }
    const highlightColorOpacity = getHighlightColorOpacity(opacityPercent);

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
    iconSize,
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

const getHighlightColorOpacity = (opacityPercent: number) => {
  return Math.max(0.2, Math.min(0.9, 1 - opacityPercent * 0.9));
};

export const useCcPersistedProperties = ({ index }: ControlChangeProps) => {
  const {
    colorState,
    controlChangeState: { xAxisControlIndex, yAxisControlIndex },
  } = useGridElementAtIndex(index);

  const currentControlChangeDirection = useMemo(
    () => getCcDirection(xAxisControlIndex, yAxisControlIndex),
    [xAxisControlIndex, yAxisControlIndex],
  );

  const hasVerticalControl = useMemo(
    () => currentControlChangeDirection !== ControlChangeDirection.Horizontal,
    [currentControlChangeDirection],
  );

  const hasHorizontalControl = useMemo(
    () => currentControlChangeDirection !== ControlChangeDirection.Vertical,
    [currentControlChangeDirection],
  );

  return {
    currentControlChangeDirection,
    hasVerticalControl,
    hasHorizontalControl,
    colorState,
    xAxisControlIndex,
    yAxisControlIndex,
  };
};

const useCcNetworkCommunication = (props: {
  xAxisControlIndex: number;
  yAxisControlIndex: number;
}) => {
  const { xAxisControlIndex, yAxisControlIndex } = props;
  const { sendMidiControlChange } = useDesktopCommunication();

  /**
   * Separate debouncers are used here so that one won't interfere with the other. They should both have separate max waits
   */
  const debouncedSendXCcMessage = useCallback(debounce(sendMidiControlChange, CcDebounceDelay), []);
  const debouncedSendYCcMessage = useCallback(debounce(sendMidiControlChange, CcDebounceDelay), []);

  const send_X_CcMessage = useCallback(
    (valuePercent: number) => {
      const ccInput = createMidiControlChange(xAxisControlIndex, Math.floor(127 * valuePercent));
      debouncedSendXCcMessage(ccInput);
    },
    [xAxisControlIndex, debouncedSendXCcMessage],
  );
  const send_Y_CcMessage = useCallback(
    (valuePercent: number) => {
      const ccInput = createMidiControlChange(yAxisControlIndex, Math.floor(127 * valuePercent));
      debouncedSendYCcMessage(ccInput);
    },
    [yAxisControlIndex, debouncedSendYCcMessage],
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

const getCcDirection = (xAxisControlIndex: number, yAxisControlIndex: number) => {
  return xAxisControlIndex >= 0 && yAxisControlIndex >= 0
    ? ControlChangeDirection.XY
    : xAxisControlIndex >= 0
      ? ControlChangeDirection.Horizontal
      : ControlChangeDirection.Vertical;
};

const getPositionalPercent = (
  touchPosition: number,
  elementDimensionMax: number,
  iconSize: number,
) => {
  const halfIconSize = iconSize / 2;
  return (touchPosition - halfIconSize) / (elementDimensionMax - iconSize);
};

const getInboundsTouchPosition = (
  touchPosition: number,
  elementDimensionMax: number,
  iconSize: number,
) => {
  const halfIconSize = iconSize / 2;
  return Math.min(Math.max(touchPosition, halfIconSize), elementDimensionMax - halfIconSize);
};

import ReAnimated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Animated,
  GestureResponderEvent,
  StyleSheet,
  View,
} from "react-native";
import {
  createMidiControlChange,
  MidiControlChangeProps,
} from "../../../constants/MIDI_Notes";
import { theme } from "../../../constants/theme";
import {
  useCurrentGridPreset,
  useGridElementAtIndex,
} from "../../../hooks/useCurrentGridPreset";
import { useDesktopCommunication } from "../../../hooks/useDesktopCommunication";
import { GridThemedIcon } from "../../GridThemedComponents/GridThemedIcon";
import { ControlChangeDirection } from "../GridElementEditDialog/GridElementEditDialogTabs/useControlChangeIndexController";
import { debounce } from "../../../services/debounce";

export function App() {
  return (
    <Animated.View
      style={{
        width: 100,
        height: 100,
        backgroundColor: "violet",
      }}
    />
  );
}
interface ControlChangeProps {
  index: number;
}

const CcDebounceDelay = 200;

const ICON_SIZE = 40;
const TOP_BAR_HEIGHT = 60;

const DEGREE_LIST_LIST = [
  [315, 0, 45],
  [270, 0, 90],
  [225, 180, 135],
];

export default function ControlChange({ index }: ControlChangeProps) {
  const { sendMidiControlChange } = useDesktopCommunication();
  const { rowCount, columnCount } = useCurrentGridPreset();
  const {
    colorState,
    controlChangeState: { xAxisControlIndex, yAxisControlIndex, iconName },
  } = useGridElementAtIndex(index);

  // Positional knowledge
  const [elementWidth, setElementWidth] = useState(1);
  const [elementHeight, setElementHeight] = useState(1);
  const [spaceFromLeft, setSpaceFromLeft] = useState(1);
  const [spaceFromTop, setSpaceFromTop] = useState(1);
  const [xPositionAbsolute, setXPositionAbsolute] = useState(elementWidth / 2);
  const [yPositionAbsolute, setYPositionAbsolute] = useState(elementHeight / 2);

  const [isInMotion, setIsInMotion] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const currentControlChangeDirection = useMemo(
    () => getCcDirection(xAxisControlIndex, yAxisControlIndex),
    [xAxisControlIndex, yAxisControlIndex]
  );

  const onLayout = useCallback(
    (event: any) => {
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

  const debouncedSendXCcMessage = useCallback(
    debounce((ccInput: MidiControlChangeProps) => {
      sendMidiControlChange(ccInput);
    }, CcDebounceDelay),
    []
  );
  const debouncedSendYCcMessage = useCallback(
    debounce((ccInput: MidiControlChangeProps) => {
      sendMidiControlChange(ccInput);
    }, CcDebounceDelay),
    []
  );

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
    (pageX: number) => {
      setXPositionAbsolute(
        Math.min(
          elementWidth - ICON_SIZE,
          Math.max(0, pageX - spaceFromLeft - ICON_SIZE * 0.75)
        )
      );
    },
    [xAxisControlIndex, spaceFromLeft, elementWidth, setXPositionAbsolute]
  );
  const updateYPositionAbsolute = useCallback(
    (pageY: number) => {
      setYPositionAbsolute(
        Math.min(
          elementHeight - ICON_SIZE,
          Math.max(0, pageY - spaceFromTop - ICON_SIZE * 2.5)
        )
      );
    },
    [yAxisControlIndex, spaceFromTop, elementHeight, setYPositionAbsolute]
  );

  const onSliderChange = useCallback(
    (event: GestureResponderEvent) => {
      if (hasHorizontalControl) {
        const pageX = event.nativeEvent.pageX;
        updateXPositionAbsolute(pageX);
        send_X_CcMessage(pageX);
      } else {
        // Locked horizontally. Vertical only control
        setXPositionAbsolute(elementWidth / 2 - ICON_SIZE / 2);
      }

      if (hasVerticalControl) {
        const pageY = event.nativeEvent.pageY;
        updateYPositionAbsolute(pageY);
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

  const inMotionCoverOpacity = Math.max(
    0.15,
    currentControlChangeDirection === ControlChangeDirection.Horizontal
      ? 1 - xPositionAbsolute / elementWidth
      : yPositionAbsolute / elementHeight
  );

  const coverOpacity = useSharedValue(0.1);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: coverOpacity.value,
  }));

  const fadeToStaticColor = useCallback(() => {
    coverOpacity.value = withTiming(1, { duration: 1750 });
  }, [fadeAnim, setIsInMotion, coverOpacity]);

  const fadeToInMotionColor = useCallback(
    (opacity: number) => {
      coverOpacity.value = withTiming(opacity, { duration: 1750 });
    },
    [fadeAnim, setIsInMotion, coverOpacity]
  );

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
        ...styles.ccIcon,
        top: yPositionAbsolute,
        left: xPositionAbsolute,
        backgroundColor: colorState.pressedColor,
      }}
    >
      <GridThemedIcon
        //Changes on move as one option. Hard set to a value as another option
        index={index}
        invert
        name={safeIconName}
        type="ionicon"
      />
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
        onTouchMove={onSliderChange}
        onTouchStart={onSliderChange}
      >
        <Animated.View
          style={{
            ...styles.gridElementBasePressedView,
            // opacity: isInMotion
            //   ? inMotionCoverOpacity
            //   : /*
            //     - Relying on fadeAnim seems to be the issue with why all of this is being strange.
            //       - Note that fading in makes the opacity 1 again and Returns this component to its original Unpressed state.
            //       - Having this hard coated to 1 Works, but it is a little bit jarring to have the colour instantly disappear when the drug does not do that.
            //       - Perhaps other animation libraries will be better suited for dealing with this.
            //     */
            //     // : 1,
            //     // fadeAnim
            //     1,
            backgroundColor: colorState.unpressedColor,
            ...animatedStyles,
          }}
          onTouchStart={playModeTouchStartHandler}
          onTouchEnd={playModeTouchEndHandler}
        >
          {currentControlChangeDirection === ControlChangeDirection.XY &&
            isInMotion && (
              <SpreadNeighboursIcons
                index={index}
                xPositionAbsolute={xPositionAbsolute}
                yPositionAbsolute={yPositionAbsolute}
                elementWidth={elementWidth}
                safeIconName={safeIconName}
              />
            )}
          {BaseIcon}
        </Animated.View>
      </View>
    </>
  );
}

const SpreadNeighboursIcons = (props: {
  index: number;
  xPositionAbsolute: number;
  elementWidth: number;

  yPositionAbsolute: number;
  safeIconName: string;
}) => {
  const {
    index,
    xPositionAbsolute,
    elementWidth,

    yPositionAbsolute,
    safeIconName,
  } = props;

  const getIconPosition = useCallback(
    (degree: number, position: number, index: number) => {
      const spreadFactor = Math.max(
        1,
        (1 - xPositionAbsolute / elementWidth) * 6
      );
      // 0.71 === 1/root(2) // which makes the corners circularly distanced instead of box distanced
      const radialMultiplier = degree % 90 === 0 ? 1 : 0.71;
      const spreadOffset = (ICON_SIZE * (index - 1)) / spreadFactor;
      return position + spreadOffset * radialMultiplier;
    },
    [xPositionAbsolute, elementWidth]
  );

  return (
    <>
      {DEGREE_LIST_LIST.map((degreeList, i) =>
        degreeList.map((degree, j) => (
          <View
            key={`CcSubIcon_${i}_${j}`}
            style={{
              ...styles.ccIcon,
              top: getIconPosition(degree, yPositionAbsolute, i),
              left: getIconPosition(degree, xPositionAbsolute, j),
            }}
          >
            <GridThemedIcon
              name={safeIconName}
              type="ionicon"
              index={index}
              style={{ transform: [{ rotate: `${degree}deg` }] }}
            />
          </View>
        ))
      )}
    </>
  );
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
  ccIcon: {
    position: "absolute",
    height: ICON_SIZE,
    width: ICON_SIZE,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});

const getCcDirection = (
  xAxisControlIndex: number,
  yAxisControlIndex: number
) => {
  return xAxisControlIndex > 0 && yAxisControlIndex > 0
    ? ControlChangeDirection.XY
    : xAxisControlIndex > 0
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

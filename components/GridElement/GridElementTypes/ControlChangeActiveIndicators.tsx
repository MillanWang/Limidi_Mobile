import { default as React, useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { GridThemedIcon } from "../../GridThemedComponents/GridThemedIcon";
import { ControlChangeDirection } from "../GridElementEditDialog/GridElementEditDialogTabs/useControlChangeIndexController";

export const useCcLevelOpacity = (props: {
  isInMotion: boolean;
  opacityPercent: number;
}) => {
  const { isInMotion, opacityPercent } = props;
  const opacity = useSharedValue(1);
  useEffect(() => {
    opacity.value = withTiming(isInMotion ? 1 - opacityPercent * 0.75 : 1, {
      duration: isInMotion ? 0 : 100,
    });
  }, [isInMotion, opacity, opacityPercent]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  return { animatedStyle };
};

export const ControlChangeActiveIndicators = (props: {
  show: boolean;
  index: number;
  elementWidth: number;
  controlChangeDirection: ControlChangeDirection;

  xPositionAbsolute: number;
  yPositionAbsolute: number;
  safeIconName: string;
  color: string;
}) => {
  const {
    show,
    index,
    elementWidth,
    controlChangeDirection,
    xPositionAbsolute,
    yPositionAbsolute,
    safeIconName,
    color,
  } = props;

  if (!show) {
    return null;
  }

  return (
    <>
      <>
        <CcLevelLines
          controlChangeDirection={controlChangeDirection}
          yPositionAbsolute={yPositionAbsolute}
          xPositionAbsolute={xPositionAbsolute}
          color={color}
        />

        <SpreadNeighboursIcons
          index={index}
          controlChangeDirection={controlChangeDirection}
          xPositionAbsolute={xPositionAbsolute}
          yPositionAbsolute={yPositionAbsolute}
          elementWidth={elementWidth}
          safeIconName={safeIconName}
        />
      </>
    </>
  );
};

const lineIndicatorThickness = 2;
const lineFadeInDuration = 100;
const lineFadeOutDuration = 250;

const CcLevelLines = (props: {
  controlChangeDirection: ControlChangeDirection;
  yPositionAbsolute: number;
  xPositionAbsolute: number;
  color: string;
}) => {
  const {
    controlChangeDirection,
    yPositionAbsolute,
    xPositionAbsolute,
    color,
  } = props;
  return (
    <>
      {controlChangeDirection !== ControlChangeDirection.Horizontal && (
        <VerticalLevelLineIndicator
          absolutePosition={yPositionAbsolute}
          color={color}
        />
      )}
      {controlChangeDirection !== ControlChangeDirection.Vertical && (
        <HorizontalLevelLineIndicator
          absolutePosition={xPositionAbsolute}
          color={color}
        />
      )}
    </>
  );
};

const VerticalLevelLineIndicator = (props: {
  absolutePosition: number;
  color: string;
}) => {
  return (
    <Animated.View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: props.absolutePosition,
        height: lineIndicatorThickness,
        backgroundColor: props.color,
      }}
      entering={FadeIn.duration(lineFadeInDuration)}
      exiting={FadeOut.duration(lineFadeOutDuration)}
    />
  );
};
const HorizontalLevelLineIndicator = (props: {
  absolutePosition: number;
  color: string;
}) => {
  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: props.absolutePosition,
        width: lineIndicatorThickness,
        backgroundColor: props.color,
      }}
      entering={FadeIn.duration(lineFadeInDuration)}
      exiting={FadeOut.duration(lineFadeOutDuration)}
    />
  );
};

const DEGREE_LIST_LIST = [
  [315, 0, 45],
  [270, 0, 90],
  [225, 180, 135],
];

const spreadDistanceMultiplier = 4;
const cornerSpreadDistanceMultiplier = 0.71; // 1/root(2) // which makes the corners circularly distanced instead of box distanced
const SpreadNeighboursIcons = (props: {
  index: number;
  elementWidth: number;
  controlChangeDirection: ControlChangeDirection;

  xPositionAbsolute: number;
  yPositionAbsolute: number;
  safeIconName: string;
}) => {
  const {
    index,
    controlChangeDirection,
    xPositionAbsolute,
    elementWidth,

    yPositionAbsolute,
    safeIconName,
  } = props;

  const getIconPosition = useCallback(
    (degree: number, position: number, index: number) => {
      const rawSpreadFactor =
        (1 - xPositionAbsolute / elementWidth) * spreadDistanceMultiplier;

      const radialMultiplier =
        degree % 90 === 0 ? 1 : cornerSpreadDistanceMultiplier;

      const spreadOffset = ((ICON_SIZE * (index - 1)) / rawSpreadFactor) * 0.5;
      return position + spreadOffset * radialMultiplier - ICON_SIZE / 2;
    },
    [xPositionAbsolute, elementWidth]
  );

  if (controlChangeDirection !== ControlChangeDirection.XY) {
    return null;
  }

  return (
    <>
      {DEGREE_LIST_LIST.map((degreeList, i) =>
        degreeList.map((degree, j) =>
          i === 1 && j === 1 ? null : (
            <Animated.View
              key={`CcSubIcon_${i}_${j}`}
              style={{
                ...styles.ccIcon,
                top: getIconPosition(degree, yPositionAbsolute, i),
                left: getIconPosition(degree, xPositionAbsolute, j),
              }}
              entering={FadeIn.duration(lineFadeInDuration)}
              exiting={FadeOut.duration(lineFadeOutDuration * 0.5)}
            >
              <GridThemedIcon
                name={safeIconName}
                type="ionicon"
                index={index}
                style={{ transform: [{ rotate: `${degree}deg` }] }}
              />
            </Animated.View>
          )
        )
      )}
    </>
  );
};

export const ICON_SIZE = 40;
export const styles = StyleSheet.create({
  ccIcon: {
    position: "absolute",
    height: ICON_SIZE,
    width: ICON_SIZE,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});

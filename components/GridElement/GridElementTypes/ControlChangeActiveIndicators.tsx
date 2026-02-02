import { LinearGradient } from "expo-linear-gradient";
import { default as React, useEffect } from "react";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ControlChangeDirection } from "../GridElementEditDialog/GridElementEditDialogTabs/useControlChangeIndexController";

export const useCcLevelOpacity = (props: { isInMotion: boolean; opacityPercent: number }) => {
  const { isInMotion, opacityPercent } = props;
  const opacity = useSharedValue(1);
  useEffect(() => {
    opacity.value = withTiming(isInMotion ? 1 - opacityPercent * 0.75 : 1, {
      duration: isInMotion ? 0 : 100,
    });
  }, [isInMotion, opacity, opacityPercent]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  return { animatedStyle };
};

export const ControlChangeActiveIndicators = (props: {
  show: boolean;
  index: number;
  elementWidth: number;
  controlChangeDirection: ControlChangeDirection;

  xPositionAbsolute: number;
  yPositionAbsolute: number;
  color: string;
}) => {
  const { show, controlChangeDirection, xPositionAbsolute, yPositionAbsolute, color } = props;

  if (!show) {
    return null;
  }

  return (
    <CcLevelLines
      controlChangeDirection={controlChangeDirection}
      yPositionAbsolute={yPositionAbsolute}
      xPositionAbsolute={xPositionAbsolute}
      color={color}
    />
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
  const { controlChangeDirection, yPositionAbsolute, xPositionAbsolute, color } = props;
  return (
    <>
      {controlChangeDirection !== ControlChangeDirection.Horizontal && (
        <VerticalLevelLineIndicator
          absolutePosition={yPositionAbsolute}
          color={color}
          enableGradient={controlChangeDirection === ControlChangeDirection.XY}
        />
      )}
      {controlChangeDirection !== ControlChangeDirection.Vertical && (
        <HorizontalLevelLineIndicator
          absolutePosition={xPositionAbsolute}
          color={color}
          enableGradient={controlChangeDirection === ControlChangeDirection.XY}
        />
      )}
    </>
  );
};

type LineIndicatorProps = {
  absolutePosition: number;
  color: string;
  enableGradient: boolean;
};
const VerticalLevelLineIndicator = (props: LineIndicatorProps) => {
  return (
    <Animated.View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: props.absolutePosition,
        height: lineIndicatorThickness,
        ...(props.enableGradient ? {} : { backgroundColor: props.color }),
      }}
      entering={FadeIn.duration(lineFadeInDuration)}
      exiting={FadeOut.duration(lineFadeOutDuration)}
    >
      {props.enableGradient && (
        <LinearGradient
          colors={[`${props.color}00`, props.color]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      )}
    </Animated.View>
  );
};
const HorizontalLevelLineIndicator = (props: LineIndicatorProps) => {
  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: props.absolutePosition,
        width: lineIndicatorThickness,
        ...(props.enableGradient ? {} : { backgroundColor: props.color }),
      }}
      entering={FadeIn.duration(lineFadeInDuration)}
      exiting={FadeOut.duration(lineFadeOutDuration)}
    >
      {props.enableGradient && (
        <LinearGradient
          colors={[`${props.color}00`, props.color]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      )}
    </Animated.View>
  );
};

import { useMemo } from "react";
import { ioniconValidIconNames } from "../../../../constants/IconNames";
import { createMidiControlChange } from "../../../../constants/MIDI_Notes";
import { useDesktopCommunication } from "../../../../hooks/useDesktopCommunication";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  setGridElementControlChangeXIndex,
  setGridElementControlChangeYIndex,
  setGridElementControlChangeIconString,
} from "../../../../redux/slices/GridPresetsSlice";
import { useGridElementAtIndex } from "../../../../hooks/useCurrentGridPreset";

export enum ControlChangeDirection {
  Horizontal = "Horizontal",
  Vertical = "Vertical",
  XY = "XY",
}

export function getControlChangeDirection(
  xAxisControlIndexState: number,
  yAxisControlIndexState: number
) {
  return xAxisControlIndexState >= 0 && yAxisControlIndexState >= 0
    ? ControlChangeDirection.XY
    : xAxisControlIndexState >= 0
    ? ControlChangeDirection.Horizontal
    : ControlChangeDirection.Vertical;
}

export const useControlChangeIndexController = (props: { index: number }) => {
  const { index } = props;
  const dispatch = useAppDispatch();

  const { sendMidiControlChange } = useDesktopCommunication();
  const currentGridElementState = useGridElementAtIndex(index);

  const iconNameState = currentGridElementState.controlChangeState.iconName;
  const xAxisControlIndexState =
    currentGridElementState.controlChangeState.xAxisControlIndex;
  const yAxisControlIndexState =
    currentGridElementState.controlChangeState.yAxisControlIndex;

  const setXAxisControlChangeIndex = (ccIndex: number) => {
    dispatch(
      setGridElementControlChangeXIndex({ index, xAxisControlIndex: ccIndex })
    );
  };

  const setYAxisControlChangeIndex = (ccIndex: number) => {
    dispatch(
      setGridElementControlChangeYIndex({ index, yAxisControlIndex: ccIndex })
    );
  };

  const setControlChangeIcon = (iconString: string) => {
    dispatch(setGridElementControlChangeIconString({ index, iconString }));
  };

  const iconIsDefault = useMemo(
    () => !ioniconValidIconNames.includes(iconNameState),
    [iconNameState]
  );

  const horizontalIndex = {
    value: xAxisControlIndexState,
    decrement: () => {
      const candidateNumber = Math.abs(xAxisControlIndexState) - 1;
      if (candidateNumber < 0) return;
      setXAxisControlChangeIndex(candidateNumber);
    },
    increment: () => {
      const candidateNumber = Math.abs(xAxisControlIndexState) + 1;
      if (candidateNumber > 127) return;
      setXAxisControlChangeIndex(candidateNumber);
    },
    set: setXAxisControlChangeIndex,
  };

  const verticalIndex = {
    value: yAxisControlIndexState,
    decrement: () => {
      const candidateNumber = Math.abs(yAxisControlIndexState) - 1;
      if (candidateNumber < 0) return;
      setYAxisControlChangeIndex(candidateNumber);
    },
    increment: () => {
      const candidateNumber = Math.abs(yAxisControlIndexState) + 1;
      if (candidateNumber > 127) return;
      setYAxisControlChangeIndex(candidateNumber);
    },
    set: setYAxisControlChangeIndex,
  };

  const currentMode = getControlChangeDirection(
    horizontalIndex.value,
    verticalIndex.value
  );
  const mode = {
    current: currentMode,
    setHorizontal: () => {
      if (currentMode === ControlChangeDirection.Horizontal) {
        return;
      }
      setXAxisControlChangeIndex(getEnabledIndexNumber(xAxisControlIndexState));
      setYAxisControlChangeIndex(
        getDisabledIndexNumber(yAxisControlIndexState)
      );
      if (iconIsDefault) setControlChangeIcon("swap-horizontal");
    },

    setVertical: () => {
      if (currentMode === ControlChangeDirection.Vertical) {
        return;
      }
      setYAxisControlChangeIndex(getEnabledIndexNumber(yAxisControlIndexState));
      setXAxisControlChangeIndex(
        getDisabledIndexNumber(xAxisControlIndexState)
      );
      if (iconIsDefault) setControlChangeIcon("swap-vertical");
    },
    setXY: () => {
      setXAxisControlChangeIndex(
        Math.abs(getEnabledIndexNumber(xAxisControlIndexState))
      );
      setYAxisControlChangeIndex(
        Math.abs(getEnabledIndexNumber(yAxisControlIndexState))
      );
      if (iconIsDefault) setControlChangeIcon("move");
    },
  };

  const icon = {
    set: setControlChangeIcon,
    name: iconNameState,
  };

  function sendTestInput(inputIndex: number) {
    return () => sendMidiControlChange(createMidiControlChange(inputIndex, 0));
  }

  return {
    mode,
    horizontalIndex,
    verticalIndex,
    icon,
    sendTestInput,
  };
};
const getEnabledIndexNumber = (currentIndexNumber: number) =>
  Math.abs(currentIndexNumber === -128 ? 0 : currentIndexNumber);

const getDisabledIndexNumber = (currentIndexNumber: number) =>
  currentIndexNumber === 0 ? -128 : -1 * currentIndexNumber;

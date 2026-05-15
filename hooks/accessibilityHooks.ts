import { useEffect, useMemo, useRef } from "react";
import { AccessibilityInfo } from "react-native";
import { getNoteKeyFromNoteNumber, NOTE } from "../constants/MIDI_Notes";
import {
  ControlChangeDirection,
  getControlChangeDirection,
} from "../components/GridElement/GridElementEditDialog/GridElementEditDialogTabs/useControlChangeIndexController";
import { useGridElementAtIndex } from "./useCurrentGridPreset";
import { useIsGridElementDirty } from "./useIsGridElementDirty";
import { useWebSocketContext, WebSocketStatus } from "./useWebSocketContext";

// ---------------------------------------------------------------------------
// Hooks: a11y targets whose state is fetched from context by an ID/handle.
// Use these when the caller has only an identifier (e.g. a grid element index)
// and the label depends on several derived values from that identifier.
// ---------------------------------------------------------------------------

export const useGridElementEditButtonAccessibilityProps = (index: number) => {
  const {
    name,
    isLocked,
    isMidiNote,
    midiNoteState: { noteNumber },
    controlChangeState: { xAxisControlIndex, yAxisControlIndex },
  } = useGridElementAtIndex(index);
  const isDirty = useIsGridElementDirty(index);

  const accessibilityLabel = useMemo(() => {
    const trimmedName = name.trim();
    const lockedSuffix = isLocked ? ", locked" : "";
    const dirtySuffix = isDirty ? ", unsaved changes" : "";

    if (isMidiNote) {
      const nameSuffix = trimmedName ? `, ${trimmedName}` : "";
      return `Edit MIDI note pad ${index}, note ${getNoteKeyFromNoteNumber(
        noteNumber,
      )}${nameSuffix}${lockedSuffix}${dirtySuffix}`;
    }

    const xSuffix = xAxisControlIndex >= 0 ? `, CC X ${xAxisControlIndex}` : "";
    const ySuffix = yAxisControlIndex >= 0 ? `, CC Y ${yAxisControlIndex}` : "";
    return `Edit control change pad ${index}${xSuffix}${ySuffix}${lockedSuffix}${dirtySuffix}`;
  }, [
    index,
    isMidiNote,
    noteNumber,
    name,
    xAxisControlIndex,
    yAxisControlIndex,
    isLocked,
    isDirty,
  ]);

  return {
    accessible: true,
    accessibilityRole: "button" as const,
    accessibilityLabel,
    accessibilityHint: "Opens the editor for this grid pad.",
  };
};

export const useDrumPadAccessibilityProps = (index: number) => {
  const {
    name,
    midiNoteState: { noteNumber },
  } = useGridElementAtIndex(index);

  const accessibilityLabel = useMemo(() => {
    const trimmedName = name.trim();
    return `Drum pad ${index}${
      trimmedName ? `, ${trimmedName}` : ""
    }, MIDI note ${noteNumber}`;
  }, [index, name, noteNumber]);

  return {
    accessible: true,
    accessibilityRole: "button" as const,
    accessibilityLabel,
    accessibilityHint:
      "Touch and hold to play the note. Touch position controls velocity.",
  };
};

export const useControlChangeAccessibilityProps = (index: number) => {
  const {
    controlChangeState: { xAxisControlIndex, yAxisControlIndex },
  } = useGridElementAtIndex(index);

  const accessibilityLabel = useMemo(() => {
    if (xAxisControlIndex < 0 && yAxisControlIndex < 0) {
      return `Unconfigured control change pad ${index}`;
    }
    const direction = getControlChangeDirection(
      xAxisControlIndex,
      yAxisControlIndex,
    );
    if (direction === ControlChangeDirection.XY) {
      return `Control change pad ${index}, X axis CC ${xAxisControlIndex}, Y axis CC ${yAxisControlIndex}`;
    }
    if (direction === ControlChangeDirection.Horizontal) {
      return `Horizontal control change slider ${index}, CC ${xAxisControlIndex}`;
    }
    return `Vertical control change slider ${index}, CC ${yAxisControlIndex}`;
  }, [index, xAxisControlIndex, yAxisControlIndex]);

  return {
    accessible: true,
    accessibilityRole: "adjustable" as const,
    accessibilityLabel,
    accessibilityHint: "Drag to change the control value.",
  };
};

/**
 * Mount once at the screen root. Announces WebSocket status transitions to
 * screen readers; stays silent on initial mount so VoiceOver doesn't speak
 * the connection state on every app launch.
 */
export const useAnnounceWebSocketStatusChanges = () => {
  const { status } = useWebSocketContext();
  const previousStatus = useRef<WebSocketStatus>(status);

  useEffect(() => {
    if (previousStatus.current === status) {
      return;
    }
    previousStatus.current = status;
    const message =
      status === WebSocketStatus.Connected
        ? "Connected to desktop"
        : status === WebSocketStatus.Connecting
          ? "Connecting to desktop"
          : status === WebSocketStatus.Disconnected
            ? "Disconnected from desktop"
            : "Connection error";
    AccessibilityInfo.announceForAccessibility(message);
  }, [status]);
};

export const useNetworkErrorIndicatorAccessibilityProps = () => {
  const { status } = useWebSocketContext();

  const accessibilityLabel = useMemo(() => {
    if (status === WebSocketStatus.Connected) {
      return "Connected to desktop. Tap to reconnect.";
    }
    if (status === WebSocketStatus.Connecting) {
      return "Connecting to desktop.";
    }
    return "Disconnected from desktop. Tap to retry.";
  }, [status]);

  return {
    accessibilityRole: "button" as const,
    accessibilityLabel,
  };
};

// ---------------------------------------------------------------------------
// Helpers: pure label generators for a11y targets whose state already lives at
// the call site. Use these when the caller has the relevant booleans/strings
// in scope — no extra context reads, no wrapper subcomponents needed.
// ---------------------------------------------------------------------------

export const getPlayButtonA11y = (isPlayMode: boolean) => ({
  accessibilityRole: "button" as const,
  accessibilityLabel: isPlayMode
    ? "Switch to edit mode"
    : "Switch to play mode",
});

export const getSettingsButtonA11y = (isInSettings: boolean) => ({
  accessibilityRole: "button" as const,
  accessibilityLabel: isInSettings ? "Close settings" : "Open grid settings",
});

export const getPresetButtonA11y = (
  presetIndex: number,
  isSelected: boolean,
) => ({
  accessibilityRole: "button" as const,
  accessibilityLabel: `Select preset ${presetIndex + 1}`,
  accessibilityState: { selected: isSelected },
});

export const getSettingsMenuTabA11y = (
  tabName: string,
  isSelected: boolean,
) => ({
  accessibilityRole: "tab" as const,
  accessibilityLabel: `${tabName} settings tab`,
  accessibilityState: { selected: isSelected },
});

export const getGridSettingsSubTabA11y = (
  tabName: string,
  isActive: boolean,
) => ({
  accessibilityRole: "tab" as const,
  accessibilityLabel: `${tabName} sub-tab`,
  accessibilityState: { selected: isActive },
});

export const getElementDialogModeTabA11y = (
  isMidiTab: boolean,
  isActive: boolean,
) => ({
  accessibilityRole: "tab" as const,
  accessibilityLabel: isMidiTab ? "MIDI settings tab" : "Color settings tab",
  accessibilityState: { selected: isActive },
});

export const getLockButtonA11y = (isLocked: boolean) => ({
  accessibilityRole: "button" as const,
  accessibilityLabel: isLocked ? "Unlock this pad" : "Lock this pad",
  accessibilityState: { selected: isLocked },
});

export const getMidiModeButtonA11y = (
  isMidiButton: boolean,
  isSelected: boolean,
) => ({
  accessibilityRole: "button" as const,
  accessibilityLabel: isMidiButton
    ? "Set pad to MIDI note mode"
    : "Set pad to control change mode",
  accessibilityState: { selected: isSelected },
});

export const getVelocityDirectionA11y = (
  buttonIsVertical: boolean,
  isSelected: boolean,
) => ({
  accessibilityRole: "button" as const,
  accessibilityLabel: buttonIsVertical
    ? "Vertical velocity direction"
    : "Horizontal velocity direction",
  accessibilityState: { selected: isSelected },
});

export const getCcDirectionA11y = (
  buttonDirection: ControlChangeDirection,
  isSelected: boolean,
) => {
  const label =
    buttonDirection === ControlChangeDirection.Horizontal
      ? "Horizontal control change orientation"
      : buttonDirection === ControlChangeDirection.Vertical
        ? "Vertical control change orientation"
        : "XY control change orientation";
  return {
    accessibilityRole: "button" as const,
    accessibilityLabel: label,
    accessibilityState: { selected: isSelected },
  };
};

export const getNetworkConfigTabA11y = (
  tabName: string,
  isActive: boolean,
) => ({
  accessibilityRole: "tab" as const,
  accessibilityLabel:
    tabName === "Scan"
      ? "Scan QR code to connect"
      : "Enter connection address manually",
  accessibilityState: { selected: isActive },
});

export const getPianoKeyA11y = (
  currentNoteNumber: number,
  selectedNoteNumber: number,
) => ({
  accessibilityRole: "button" as const,
  accessibilityLabel: `Select note ${Object.values(NOTE)[currentNoteNumber % 12]}`,
  accessibilityState: { selected: currentNoteNumber === selectedNoteNumber },
});

export const getIncrementorA11y = (
  target: string,
  isPlus: boolean,
  disabled: boolean,
) => ({
  accessibilityRole: "button" as const,
  accessibilityLabel: `${isPlus ? "Increase" : "Decrease"} ${target}`,
  accessibilityState: { disabled },
});

// ---------------------------------------------------------------------------
// Constants: a11y prop bundles for buttons with fixed labels. Spread at the
// call site so the JSX stays free of inline string literals.
// ---------------------------------------------------------------------------

export const DISCARD_CHANGES_A11Y = {
  accessibilityRole: "button" as const,
  accessibilityLabel: "Discard unsaved changes",
};

export const SAVE_AND_CLOSE_PAD_EDITOR_A11Y = {
  accessibilityRole: "button" as const,
  accessibilityLabel: "Save and close pad editor",
};

export const APPLY_COLOR_TO_PAD_A11Y = {
  accessibilityRole: "button" as const,
  accessibilityLabel: "Apply selected color to this pad",
};

export const RESET_PAD_COLOR_A11Y = {
  accessibilityRole: "button" as const,
  accessibilityLabel: "Reset pad color to grid default",
};

export const RESET_PAD_NAME_A11Y = {
  accessibilityRole: "button" as const,
  accessibilityLabel: "Reset name to default note label",
};

export const SAVE_CC_ICON_A11Y = {
  accessibilityRole: "button" as const,
  accessibilityLabel: "Save selected icon",
};

export const APPLY_COLOR_GLOBALLY_A11Y = {
  accessibilityRole: "button" as const,
  accessibilityLabel: "Apply selected color to all pads",
};

export const UNLOCK_ALL_PADS_A11Y = {
  accessibilityRole: "button" as const,
  accessibilityLabel: "Unlock all pads",
};

export const RESET_PRESET_TO_DEFAULTS_A11Y = {
  accessibilityRole: "button" as const,
  accessibilityLabel: "Reset current preset to defaults",
};

export const REQUEST_CAMERA_PERMISSION_A11Y = {
  accessibilityRole: "button" as const,
  accessibilityLabel: "Request camera permission to scan QR code",
};

export const GET_FULL_VERSION_A11Y = {
  accessibilityRole: "link" as const,
  accessibilityLabel: "Get full version on the App Store",
};

export const DISMISS_WELCOME_A11Y = {
  accessibilityRole: "button" as const,
  accessibilityLabel: "Dismiss welcome instructions and start using LiMIDI",
};

export const RECHECK_CONNECTION_A11Y = {
  accessibilityRole: "button" as const,
  accessibilityLabel: "Recheck desktop connection",
};

/** Hide an element from the accessibility tree (e.g., empty layout slots). */
export const A11Y_HIDDEN = {
  accessibilityElementsHidden: true,
  importantForAccessibility: "no" as const,
};

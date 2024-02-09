import { Icon, Switch, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  setGridElementIsLocked,
  setGridElementIsMidiNote,
} from "../../../../redux/slices/GridPresetsSlice";
import { ControlChangeSettingsPanel } from "./ControlChangeSettingsPanel";
import { NoteSettingsPanel } from "./NoteSettingsPanel";

export interface GridElementEditMidiProps {
  index: number;
}

export function GridElementEditMidiSettingsTab({
  index,
}: GridElementEditMidiProps) {
  const currentGridElementState = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset.gridElements[index]
  );
  const nameState = currentGridElementState.name;
  const lockedState = currentGridElementState.isLocked;
  const isMidiNoteModeState = currentGridElementState.isMidiNote;
  const noteNumberState = currentGridElementState.midiNoteState.noteNumber;
  const velocityState = currentGridElementState.midiNoteState.velocity;
  const dispatch = useAppDispatch();

  function toggleElementMidiLock() {
    dispatch(setGridElementIsLocked({ index, isLocked: !lockedState }));
  }
  function toggleElementMidiNoteMode() {
    dispatch(
      setGridElementIsMidiNote({ index, isMidiNote: !isMidiNoteModeState })
    );
  }

  return (
    <View>
      {/* MIDI settings Lock */}
      <View style={styles.lockSwitchView}>
        <Text>Lock Grid Element: </Text>
        <Switch value={lockedState} onChange={toggleElementMidiLock} />
        <Icon type="ionicon" name={lockedState ? "lock-closed" : "lock-open"} />
      </View>
      <View style={styles.lockSwitchView}>
        <Text style={{ fontWeight: isMidiNoteModeState ? "bold" : "300" }}>
          MIDI Note Mode
        </Text>
        <Switch
          value={!isMidiNoteModeState}
          onChange={toggleElementMidiNoteMode}
        />
        <Text style={{ fontWeight: !isMidiNoteModeState ? "bold" : "300" }}>
          Control Change Mode
        </Text>
      </View>

      {isMidiNoteModeState ? (
        <NoteSettingsPanel index={index} />
      ) : (
        <ControlChangeSettingsPanel index={index} />
      )}
    </View>
  );
} // end GridElementEditMidiOptionsTab

const styles = StyleSheet.create({
  lockSwitchView: {
    flexDirection: "row",
    alignItems: "center",
  },
});

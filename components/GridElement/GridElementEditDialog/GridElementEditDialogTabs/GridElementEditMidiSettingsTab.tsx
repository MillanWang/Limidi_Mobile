import { Switch, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setGridElementIsMidiNote } from "../../../../redux/slices/GridPresetsSlice";
import { ControlChangeSettingsPanel } from "./ControlChangeSettingsPanel";
import { NoteSettingsPanel } from "./NoteSettingsPanel";

export interface GridElementEditMidiProps {
  index: number;
}

export function GridElementEditMidiSettingsTab({
  index,
}: GridElementEditMidiProps) {
  const dispatch = useAppDispatch();
  const currentGridElementState = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset.gridElements[index]
  );

  const { isMidiNote } = currentGridElementState;

  const toggleElementMidiNoteMode = () => {
    dispatch(setGridElementIsMidiNote({ index, isMidiNote: !isMidiNote }));
  };
  return (
    <View>
      <View style={styles.switchView}>
        <Text style={{ fontWeight: isMidiNote ? "bold" : "300" }}>
          MIDI Note Mode
        </Text>
        <Switch value={!isMidiNote} onChange={toggleElementMidiNoteMode} />
        <Text style={{ fontWeight: !isMidiNote ? "bold" : "300" }}>
          Control Change Mode
        </Text>
      </View>

      {isMidiNote ? (
        <NoteSettingsPanel index={index} />
      ) : (
        <ControlChangeSettingsPanel index={index} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  switchView: {
    flexDirection: "row",
    alignItems: "center",
  },
});

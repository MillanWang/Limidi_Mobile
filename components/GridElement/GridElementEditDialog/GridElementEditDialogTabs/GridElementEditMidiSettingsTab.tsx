import { Input, Switch, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  setGridElementIsMidiNote,
  setGridElementName,
} from "../../../../redux/slices/GridPresetsSlice";
import { ControlChangeSettingsPanel } from "./ControlChangeSettingsPanel";
import { NoteSettingsPanel } from "./NoteSettingsPanel";

export interface GridElementEditMidiProps {
  index: number;
}

export function GridElementEditMidiSettingsTab({
  index,
}: GridElementEditMidiProps) {
  const dispatch = useAppDispatch();
  const { isMidiNote, name } = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset.gridElements[index]
  );

  const toggleElementMidiNoteMode = () => {
    dispatch(setGridElementIsMidiNote({ index, isMidiNote: !isMidiNote }));
  };
  return (
    <View>
      <View>
        <Text>Name:</Text>
        <Input
          value={name}
          onChangeText={(value) =>
            dispatch(setGridElementName({ index, name: value }))
          }
        />
      </View>

      <View style={styles.switchView}>
        <Text style={{ fontWeight: isMidiNote ? "bold" : "300" }}>
          MIDI Note
        </Text>
        <Switch value={!isMidiNote} onChange={toggleElementMidiNoteMode} />
        <Text style={{ fontWeight: !isMidiNote ? "bold" : "300" }}>
          Control Change
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

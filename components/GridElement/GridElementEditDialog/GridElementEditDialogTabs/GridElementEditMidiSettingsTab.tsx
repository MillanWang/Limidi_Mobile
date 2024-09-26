import React from "react";
import { View } from "react-native";
import { useAppSelector } from "../../../../redux/hooks";
import { ControlChangeSettingsPanel } from "./ccSettings/ControlChangeSettingsPanel";
import { MidiNoteControlChangeSelector } from "./MidiNoteControlChangeSelector";
import { NoteSettingsPanel } from "./NoteSettingsPanel";

export interface GridElementEditMidiProps {
  index: number;
}

export function GridElementEditMidiSettingsTab({ index }: { index: number }) {
  const { isMidiNote } = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset.gridElements[index]
  );

  return (
    <View style={{ flex: 1 }}>
      <MidiNoteControlChangeSelector index={index} />

      {isMidiNote ? (
        <NoteSettingsPanel index={index} />
      ) : (
        <ControlChangeSettingsPanel index={index} />
      )}
    </View>
  );
}

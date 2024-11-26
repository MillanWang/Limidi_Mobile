import React from "react";
import { ScrollView, View } from "react-native";
import { useGridElementAtIndex } from "../../../../hooks/useCurrentGridPreset";
import { ControlChangeSettingsPanel } from "./ccSettings/ControlChangeSettingsPanel";
import { MidiNoteControlChangeSelector } from "./MidiNoteControlChangeSelector";
import { NoteSettingsPanel } from "./NoteSettingsPanel";

export interface GridElementEditMidiProps {
  index: number;
}

export function GridElementEditMidiSettingsTab({ index }: { index: number }) {
  const { isMidiNote } = useGridElementAtIndex(index);

  return (
    <ScrollView>
      <MidiNoteControlChangeSelector index={index} />

      {isMidiNote ? (
        <NoteSettingsPanel index={index} />
      ) : (
        <ControlChangeSettingsPanel index={index} />
      )}
    </ScrollView>
  );
}

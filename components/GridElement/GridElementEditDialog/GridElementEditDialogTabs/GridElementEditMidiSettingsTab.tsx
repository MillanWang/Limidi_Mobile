import { Input, Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setGridElementName } from "../../../../redux/slices/GridPresetsSlice";
import { ControlChangeSettingsPanel } from "./ControlChangeSettingsPanel";
import { MidiNoteControlChangeSelector } from "./MidiNoteControlChangeSelector";
import { NoteSettingsPanel } from "./NoteSettingsPanel";

export interface GridElementEditMidiProps {
  index: number;
}

export function GridElementEditMidiSettingsTab({ index }: { index: number }) {
  const dispatch = useAppDispatch();
  const { isMidiNote, name } = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset.gridElements[index]
  );

  return (
    <View>
      <View style={{ flexDirection: "row", flex: 1 }}>
        <Input
          containerStyle={{ flex: 1 }}
          label={<Text style={{}}>Name:</Text>}
          maxLength={10}
          value={name}
          onChangeText={(value) =>
            dispatch(setGridElementName({ index, name: value }))
          }
        />

        <MidiNoteControlChangeSelector index={index} />
      </View>

      {isMidiNote ? (
        <NoteSettingsPanel index={index} />
      ) : (
        <ControlChangeSettingsPanel index={index} />
      )}
    </View>
  );
}

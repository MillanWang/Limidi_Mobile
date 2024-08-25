import { Input, Text } from "@rneui/themed";
import React from "react";
import { ScrollView, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setGridElementName } from "../../../../redux/slices/GridPresetsSlice";
import { ControlChangeSettingsPanel } from "./ccSettings/ControlChangeSettingsPanel";
import { MidiNoteControlChangeSelector } from "./MidiNoteControlChangeSelector";
import { NoteSettingsPanel } from "./NoteSettingsPanel";
import { theme } from "../../../../constants/theme";
import {
  getNoteKeyFromNoteNumber,
  isNoteLabelStandard,
} from "../../../../constants/MIDI_Notes";
import { Icon } from "@rneui/base";

export interface GridElementEditMidiProps {
  index: number;
}

export function GridElementEditMidiSettingsTab({ index }: { index: number }) {
  const dispatch = useAppDispatch();
  const {
    isMidiNote,
    name,
    midiNoteState: { noteNumber },
  } = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset.gridElements[index]
  );

  const resetElementName = () =>
    dispatch(
      setGridElementName({ index, name: getNoteKeyFromNoteNumber(noteNumber) })
    );

  // TODO - Add tis button when with a standard name so that there can be a blank no clutter element
  const clearElementName = () =>
    dispatch(setGridElementName({ index, name: "" }));

  const rightIcon = isNoteLabelStandard(noteNumber, name) ? (
    false
  ) : (
    <Icon
      onPress={resetElementName}
      name="refresh-outline"
      type="ionicon"
      color={theme.color.white}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", marginTop: 12 }}>
        <Input
          containerStyle={{ flex: 1 }}
          label={<Text style={{ color: theme.color.white }}>Name</Text>}
          inputStyle={{ color: theme.color.white }}
          maxLength={10}
          rightIconContainerStyle={{ height: 24 }}
          rightIcon={rightIcon}
          value={name}
          onChangeText={(value) =>
            dispatch(setGridElementName({ index, name: value }))
          }
        />

        <MidiNoteControlChangeSelector index={index} />
      </View>
      <ScrollView>
        {isMidiNote ? (
          <NoteSettingsPanel index={index} />
        ) : (
          <ControlChangeSettingsPanel index={index} />
        )}
      </ScrollView>
    </View>
  );
}

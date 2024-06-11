import { Input, Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setGridElementName } from "../../../../redux/slices/GridPresetsSlice";
import { ControlChangeSettingsPanel } from "./ControlChangeSettingsPanel";
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

  return (
    <View>
      <View style={{ flexDirection: "row", flex: 1 }}>
        <Input
          containerStyle={{ flex: 1 }}
          label={<Text style={{ color: theme.color.white }}>Name</Text>}
          inputStyle={{ color: theme.color.white }}
          maxLength={10}
          rightIconContainerStyle={{ height: 24 }}
          rightIcon={
            isNoteLabelStandard(noteNumber, name) ? (
              false
            ) : (
              <Icon
                onPress={() =>
                  dispatch(
                    setGridElementName({
                      index,
                      name: getNoteKeyFromNoteNumber(noteNumber),
                    })
                  )
                }
                name="refresh-outline"
                type="ionicon"
                color={theme.color.white}
              />
            )
          }
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

import { Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { getNoteKeyFromNoteNumber } from "../../../../constants/MIDI_Notes";
import { theme } from "../../../../constants/theme";
import { useGridElementAtIndex } from "../../../../hooks/useCurrentGridPreset";
import { useAppDispatch } from "../../../../redux/hooks";
import {
  setGridElementNote,
  setGridElementOctave,
} from "../../../../redux/slices/GridPresetsSlice";
import { NoteSelector } from "../../../GridEditDialog/GridEditDialogTabs/NoteSelector";
import { GridElementNameInput } from "./GridElementNameInput";
import { VelocityAdjustSlider } from "./velocitySettings/VelocityAdjustSlider";
import { VelocityDirectionSelector } from "./velocitySettings/VelocityDirectionSelector";

export interface NoteSettingsPanelProps {
  index: number;
}

export function NoteSettingsPanel({ index }: NoteSettingsPanelProps) {
  const {
    midiNoteState: { noteNumber },
  } = useGridElementAtIndex(index);

  const dispatch = useAppDispatch();

  const currentOctave = Math.floor(noteNumber / 12);
  const noteKey = `Note: ${getNoteKeyFromNoteNumber(noteNumber)}`;

  const updateOctave = (isIncreasing: boolean) => () => {
    const desiredOctave = currentOctave + (isIncreasing ? 1 : -1);
    if (desiredOctave < 0 || desiredOctave > 10) return;
    dispatch(setGridElementOctave({ index, newNoteOctave: desiredOctave }));
  };

  const setNoteNumber = (noteNumber: number) =>
    dispatch(setGridElementNote({ index, newNoteNumber: noteNumber }));

  return (
    <View>
      <GridElementNameInput index={index} />

      <NoteSelector
        index={index}
        increaseOctave={updateOctave(true)}
        decreaseOctave={updateOctave(false)}
        noteNumber={noteNumber}
        setNoteNumber={setNoteNumber}
        header={
          <View>
            <Text style={{ color: theme.color.white }}>{noteKey}</Text>
          </View>
        }
      />

      <View>
        <Text style={{ color: theme.color.white }}>Velocity Direction:</Text>
        <VelocityDirectionSelector index={index} />

        <Text style={{ color: theme.color.white }}>{"Velocity range: "}</Text>
        <VelocityAdjustSlider index={index} />
      </View>
    </View>
  );
}

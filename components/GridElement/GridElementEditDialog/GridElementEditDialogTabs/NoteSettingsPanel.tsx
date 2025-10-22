import React from "react";
import { View } from "react-native";
import { getNoteKeyFromNoteNumber } from "../../../../constants/MIDI_Notes";
import { useGridElementAtIndex } from "../../../../hooks/useCurrentGridPreset";
import { useAppDispatch } from "../../../../redux/hooks";
import {
  setGridElementNote,
  setGridElementOctave,
} from "../../../../redux/slices/GridPresetsSlice";
import { NoteSelector } from "../../../GridEditDialog/GridEditDialogTabs/NoteSelector";
import { Label, TextAudition } from "../../../Typography";
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

      <TextAudition />
      <NoteSelector
        index={index}
        increaseOctave={updateOctave(true)}
        decreaseOctave={updateOctave(false)}
        noteNumber={noteNumber}
        setNoteNumber={setNoteNumber}
        header={
          <View>
            <Label>{noteKey}</Label>
          </View>
        }
      />

      <View>
        <Label>Velocity Direction:</Label>
        <VelocityDirectionSelector index={index} />

        <Label>Velocity range:</Label>
        <VelocityAdjustSlider index={index} />
      </View>
    </View>
  );
}

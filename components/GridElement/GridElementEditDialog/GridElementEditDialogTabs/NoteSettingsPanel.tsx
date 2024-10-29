import { Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { getNoteKeyFromNoteNumber } from "../../../../constants/MIDI_Notes";
import { theme } from "../../../../constants/theme";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  setGridElementNote,
  setGridElementOctave,
  setGridElementVelocityCeiling,
  setGridElementVelocityFloor,
} from "../../../../redux/slices/GridPresetsSlice";
import { NoteSelector } from "../../../GridEditDialog/GridEditDialogTabs/NoteSelector";
import { GridElementNameInput } from "./GridElementNameInput";
import { VelocityAdjustSlider } from "./velocitySettings/VelocityAdjustSlider";
import { VelocityDirectionSelector } from "./velocitySettings/VelocityDirectionSelector";
import { useGridElementAtIndex } from "../../../../hooks/useCurrentGridPreset";

export interface NoteSettingsPanelProps {
  index: number;
}

export function NoteSettingsPanel({ index }: NoteSettingsPanelProps) {
  const {
    midiNoteState: { noteNumber, velocity },
    colorState: { unpressedColor, pressedColor },
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

  const setVelocityFloor = (velocity: number) =>
    dispatch(setGridElementVelocityFloor({ index: index, floor: velocity }));
  const setVelocityCeiling = (velocity: number) =>
    dispatch(
      setGridElementVelocityCeiling({ index: index, ceiling: velocity })
    );

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

        <Text style={{ color: theme.color.white }}>
          Velocity Floor: {velocity.floor}
        </Text>
        <VelocityAdjustSlider
          backgroundColor={unpressedColor}
          textColor={pressedColor}
          velocity={velocity.floor}
          setVelocity={setVelocityFloor}
        />

        <Text style={{ color: theme.color.white }}>
          Velocity Ceiling: {velocity.ceiling}
        </Text>
        <VelocityAdjustSlider
          backgroundColor={unpressedColor}
          textColor={pressedColor}
          velocity={velocity.ceiling}
          setVelocity={setVelocityCeiling}
        />
      </View>
    </View>
  );
}

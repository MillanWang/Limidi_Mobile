import { Slider, Switch, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { getNoteKeyFromNoteNumber } from "../../../../constants/MIDI_Notes";
import { theme } from "../../../../constants/theme";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  setGridElementNote,
  setGridElementOctave,
  setGridElementVelocityCeiling,
  setGridElementVelocityFloor,
  setGridElementVelocityIsVertical,
} from "../../../../redux/slices/GridPresetsSlice";
import { NoteSelector } from "../../../GridEditDialog/GridEditDialogTabs/NoteSelector";

export interface NoteSettingsPanelProps {
  index: number;
}

export function NoteSettingsPanel({ index }: NoteSettingsPanelProps) {
  const { noteNumber, velocity } = useAppSelector(
    (state) =>
      state.gridPresetsReducer.currentGridPreset.gridElements[index]
        .midiNoteState
  );

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

  const toggleVelocityDirection = () => {
    dispatch(
      setGridElementVelocityIsVertical({
        index,
        isVertical: !velocity.isVertical,
      })
    );
  };
  const setVelocityFloor = (velocity: number) =>
    dispatch(setGridElementVelocityFloor({ index: index, floor: velocity }));
  const setVelocityCeiling = (velocity: number) =>
    dispatch(
      setGridElementVelocityCeiling({ index: index, ceiling: velocity })
    );

  return (
    <View>
      <NoteSelector
        increaseOctave={updateOctave(true)}
        decreaseOctave={updateOctave(false)}
        noteNumber={noteNumber}
        setNoteNumber={setNoteNumber}
        header={
          <View>
            <Text style={{ color: theme.color.black }}>{noteKey}</Text>
          </View>
        }
      />

      <View>
        <Text>
          Velocity Direction: {velocity.isVertical ? "Vertical" : "Horizontal"}
        </Text>
        <Switch
          value={velocity.isVertical}
          onChange={toggleVelocityDirection}
        />

        <Text>Velocity Floor: {velocity.floor}</Text>
        <VelocityAdjustSlider
          velocity={velocity.floor}
          setVelocity={setVelocityFloor}
        />

        <Text>Velocity Ceiling: {velocity.ceiling}</Text>
        <VelocityAdjustSlider
          velocity={velocity.ceiling}
          setVelocity={setVelocityCeiling}
        />
      </View>
    </View>
  );
}

const VelocityAdjustSlider = (props: {
  velocity: number;
  setVelocity: (velocity: number) => void;
}) => {
  const { velocity, setVelocity } = props;
  return (
    <Slider
      maximumValue={127}
      minimumValue={0}
      step={1}
      value={velocity}
      onValueChange={setVelocity}
    />
  );
};

const styles = StyleSheet.create({
  lockSwitchView: {
    flexDirection: "row",
    alignItems: "center",
  },
});

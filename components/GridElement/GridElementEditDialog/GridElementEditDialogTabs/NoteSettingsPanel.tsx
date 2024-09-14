import { Slider, Switch, Text } from "@rneui/themed";
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
  setGridElementVelocityIsVertical,
} from "../../../../redux/slices/GridPresetsSlice";
import { NoteSelector } from "../../../GridEditDialog/GridEditDialogTabs/NoteSelector";

export interface NoteSettingsPanelProps {
  index: number;
}

export function NoteSettingsPanel({ index }: NoteSettingsPanelProps) {
  const {
    midiNoteState: { noteNumber, velocity },
    colorState: { unpressedColor, pressedColor },
  } = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset.gridElements[index]
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
            <Text style={{ color: theme.color.white }}>{noteKey}</Text>
          </View>
        }
      />

      <View>
        <Text style={{ color: theme.color.white }}>
          Velocity Direction: {velocity.isVertical ? "Vertical" : "Horizontal"}
        </Text>
        <Switch
          value={velocity.isVertical}
          onChange={toggleVelocityDirection}
        />

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

const VelocityAdjustSlider = (props: {
  velocity: number;
  setVelocity: (velocity: number) => void;
  backgroundColor?: string;
  textColor?: string;
}) => {
  const { velocity, setVelocity, backgroundColor, textColor } = props;
  return (
    <Slider
      maximumValue={127}
      minimumValue={0}
      step={1}
      value={velocity}
      onValueChange={setVelocity}
      maximumTrackTintColor={backgroundColor}
      minimumTrackTintColor={textColor}
      thumbStyle={{ backgroundColor, borderWidth: 1, borderColor: textColor }}
      thumbProps={{
        children: (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Text style={{ color: textColor }}>{velocity}</Text>
          </View>
        ),
      }}
    />
  );
};

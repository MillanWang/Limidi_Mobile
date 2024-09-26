import { Icon } from "@rneui/base";
import { Input, Text } from "@rneui/themed";
import React from "react";
import {
  getNoteKeyFromNoteNumber,
  isNoteLabelStandard,
} from "../../../../constants/MIDI_Notes";
import { theme } from "../../../../constants/theme";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setGridElementName } from "../../../../redux/slices/GridPresetsSlice";

export const GridElementNameInput = ({ index }: { index: number }) => {
  const dispatch = useAppDispatch();
  const {
    name,
    midiNoteState: { noteNumber },
  } = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset.gridElements[index]
  );

  const resetElementName = () =>
    dispatch(
      setGridElementName({ index, name: getNoteKeyFromNoteNumber(noteNumber) })
    );

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
    <>
      <Input
        containerStyle={{ paddingLeft: -10, paddingRight: -10 }}
        inputStyle={{ color: theme.color.white }}
        rightIconContainerStyle={{ height: 24 }}
        label={<Text style={{ color: theme.color.white }}>Name</Text>}
        maxLength={10}
        rightIcon={rightIcon}
        value={name}
        onChangeText={(value) =>
          dispatch(setGridElementName({ index, name: value }))
        }
      />
    </>
  );
};
